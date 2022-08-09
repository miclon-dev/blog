---
title: Apscheduler源码剖析(三)-Trigger之cron触发器
shortTitle: Apscheduler触发器(3)
icon: python
order: 1
date: 2022-08-06
category:
- apscheduler
tag:
- trigger
- cron
sticky: true
star: true
isOriginal: true
---

## CronTrigger

把`CronTrigger`放本篇最后面想必也都知道，相对来说，它是触发器源码中比较难理解的。

```python
def __init__(self, year=None, month=None, day=None, week=None, day_of_week=None, hour=None,
            minute=None, second=None, start_date=None, end_date=None, timezone=None,
            jitter=None):
```

以上是`CronTrigger`实例化的参数：

- year：4位数字的年份。
- month：1-12月份。
- day：1-31日。
- week：1-53周。
- day_of_week：一个礼拜中的第几天（ 0-6或者 mon、 tue、 wed、 thu、 fri、 sat、 sun）。
- hour： 0-23小时。
- minute： 0-59分钟。
- second： 0-59秒。
- start_date： datetime类型或者字符串类型，起始时间。
- end_date： datetime类型或者字符串类型，结束时间。
- timezone：时区。
- jitter：任务触发的误差时间。

除此之外，还可以使用表达式的方式来定义。

![来源于网络](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220806181647.png)


在熟悉`CronTrigger`之前，还需要了解它另外两个文件：`expressions.py`和`fields.py`。

### expressions.py

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220806210942.png)

该文件用于存放解析前台传来的字符串规则，将解析后的结果用于计算下一次触发时间。

`AllExpression`类是所有解析类的父类。它内置属性`value_re`用于约束解析的源数据。

未来调用方将采用Expression.value_re.match(value)来判断是否符合规则。(这个在接下来field.py中会提到)


```python
class AllExpression(object):
    value_re = re.compile(r'\*(?:/(?P<step>\d+))?$')

    def __init__(self, step=None):
        # 步长，假如year="*/5"，则step=5
        self.step = asint(step)
        if self.step == 0:
            raise ValueError('Increment must be higher than 0')

    def validate_range(self, field_name):
        """检验步长是否在合法区间内"""
        from apscheduler.triggers.cron.fields import MIN_VALUES, MAX_VALUES

        # 验证范围是否合法
        # 假如field_name是year，则minval=1970，maxval=2022，
        # 那他们的区间是1970~2022之间，步长是不能它们之差的
        value_range = MAX_VALUES[field_name] - MIN_VALUES[field_name]
        if self.step and self.step > value_range:
            raise ValueError('the step value ({}) is higher than the total range of the '
                             'expression ({})'.format(self.step, value_range))

    def get_next_value(self, date, field):
        # 从field类中获取当前时间的值，当前field_name是year，则返回当前时间的年份
        start = field.get_value(date)
        # 获取这个Field的最小和最大范围
        minval = field.get_min(date)
        maxval = field.get_max(date)
        # 年份的最小值使1970，当前是2022，则返回2022
        start = max(start, minval)
        # 如果没有步长，next即当前field.value
        if not self.step:
            next = start
        else:
            # 计算下一个时间距离 (步长 - (当前值 - 最小值)) % 步长
            distance_to_next = (self.step - (start - minval)) % self.step
            # 加上当前时间的值，即下一个时间的值
            next = start + distance_to_next
        # 检查计算结果是否超出范围
        if next <= maxval:
            return next
```

### RangeExpression

它的源码和`AllExpression`类是几乎雷同，不同的是加入了`first`和`last`属性。

用一张图直接了解它的作用：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220806214615.png)

```python
# 我在当前时间：2022年08月06日21:46:46启动程序
trigger = CronTrigger(hour='0-23/2')
```

由于是0-23小时内每隔2的倍数，所以下一次运行时间应该是22点整。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220806214757.png)


### CronTrigger

终于来到了核心类中，首先看下类属性：

```python
# 约束哪些字段
FIELD_NAMES = ('year', 'month', 'day', 'week', 'day_of_week', 'hour', 'minute', 'second')
# 约束哪些字段使用哪个类来做验证
FIELDS_MAP = {
    'year': BaseField,
    'month': MonthField,
    'week': WeekField,
    'day': DayOfMonthField,
    'day_of_week': DayOfWeekField,
    'hour': BaseField,
    'minute': BaseField,
    'second': BaseField
}
```

再看看它的初始化方法：

```python
def __init__(self, year=None, month=None, day=None, week=None, day_of_week=None, hour=None, minute=None, second=None, start_date=None, end_date=None, timezone=None, jitter=None):
    if timezone:
        self.timezone = astimezone(timezone)
    elif isinstance(start_date, datetime) and start_date.tzinfo:
        self.timezone = start_date.tzinfo
    elif isinstance(end_date, datetime) and end_date.tzinfo:
        self.timezone = end_date.tzinfo
    else:
        self.timezone = get_localzone()

    self.start_date = convert_to_datetime(start_date, self.timezone, 'start_date')
    self.end_date = convert_to_datetime(end_date, self.timezone, 'end_date')

    self.jitter = jitter

    # 将传参变成字典：如 {"hour": "0-23/2"}
    values = dict((key, value) for (key, value) in six.iteritems(locals())
                    if key in self.FIELD_NAMES and value is not None)
    self.fields = []
    assign_defaults = False
    # 遍历所有的字段
    for field_name in self.FIELD_NAMES:
        # 检查字段是否在传参中
        if field_name in values:
            # 在的话就取出这个字段的值，值一般是表达式
            exprs = values.pop(field_name)
            is_default = False
            assign_defaults = not values
        elif assign_defaults:
            # 使用预设值
            exprs = DEFAULT_VALUES[field_name]
            is_default = True
        else:
            # 如果不指派默认，就预设表达式是"*"
            exprs = '*'
            is_default = True
        # 动态实例化field类，上述FIELDS_MAP已经把字段和类的对应关系建立好了
        field_class = self.FIELDS_MAP[field_name]
        # 注意这里类的传参：字段名称、表达式、是否是默认值
        field = field_class(field_name, exprs, is_default)
        # 这里是初始化方法的最终目的，将实例化后的field添加到self.fields中
        self.fields.append(field)
```

首先可以看到它也规定了start_date和end_date用于约束触发范围。

其次它将前台传来的参数变成字典，逐一遍历**FIELD_NAMES**来将字段转为实例化后的Field对象，并把它们都装到了**fields**数组中。

我们直接进入到核心方法`get_next_fire_time`中：

```python
def get_next_fire_time(self, previous_fire_time, now):
    # 是否存在上次运行时间
    if previous_fire_time:
        # 如果有，那么计算起始时间
        start_date = min(now, previous_fire_time + timedelta(microseconds=1))
        if start_date == previous_fire_time:
            start_date += timedelta(microseconds=1)
    else:
        start_date = max(now, self.start_date) if self.start_date else now

    fieldnum = 0
    # 下次运行时间是起始时间向上取整
    next_date = datetime_ceil(start_date).astimezone(self.timezone)
    # 核心代码：开始遍历初始化时append进来的Field类
    while 0 <= fieldnum < len(self.fields):
        field = self.fields[fieldnum]
        curr_value = field.get_value(next_date)
        next_value = field.get_next_value(next_date)

        if next_value is None:
            # No valid value was found
            next_date, fieldnum = self._increment_field_value(next_date, fieldnum - 1)
        elif next_value > curr_value:
            # 这里发现下一次的值超过当前的值了，说明get_next_value方法计算出来的是下一个有效的值
            if field.REAL:
                next_date = self._set_field_value(next_date, fieldnum, next_value)
                fieldnum += 1
            else:
                next_date, fieldnum = self._increment_field_value(next_date, fieldnum)
        else:
            # A valid value was found, no changes necessary
            fieldnum += 1

        # 每轮迭代都检查next_date是否超出end_date，如果超出，那么返回None
        if self.end_date and next_date > self.end_date:
            return None

    if fieldnum >= 0:
        # 一如往常，添加浮动时间
        next_date = self._apply_jitter(next_date, self.jitter, now)
        # 比对end_date，拿到最小时间
        return min(next_date, self.end_date) if self.end_date else next_date
```

这一步计算下一次触发时间，核心就是遍历整个**fields**数组，取出它的当前合法值和下一轮的值。

`_set_field_value`方法的作用是将年月日时分秒变成字典后又转为日期格式。

```python
def _set_field_value(self, dateval, fieldnum, new_value):
    values = {}
    for i, field in enumerate(self.fields):
        if field.REAL:
            # fieldnum 大于 i 说明：下面的字段都是经过上一步get_value的
            if i < fieldnum:
                values[field.name] = field.get_value(dateval)
            # 一旦fieldnum小于i，说明下面的字段只需要取值即可
            elif i > fieldnum:
                values[field.name] = field.get_min(dateval)
            else:
                # 等于i的话直接赋值就好了
                values[field.name] = new_value
    # 从字典的年月日时分秒转为日期
    return localize(datetime(**values), self.timezone)
```

## 总结

apscheduler作者在编写`field.py`和`expressions.py`两个功能的时候主要目的是为了实现校验用户输入端的时间表达式是否合法。并为了简单化cron表达式语法层面上的学习，采用了通过配置year,month,day,week,day_of_week,hour,minute,second这些字段来表示时间表达式。比如我可以通过hour='0-23/2'来表示每两小时运行一次。而不是通过`* * 0/2 * * ? `这种相对晦涩的cron表达式来面向用户。并且它一样也可以支持直接cron表达式的传入（通过`from_crontab`方法）。

如果这个需求换做我，我可能会怎么写？我想我会把传入的参数转为cron表达式，通过表达式来计算后面的运行时间。当然这依赖于cron相关工具库。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220807163223.png)
