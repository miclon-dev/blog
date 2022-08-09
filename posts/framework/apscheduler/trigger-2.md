---
title: Apscheduler源码剖析(二)-Trigger之指定/周期触发器
shortTitle: Apscheduler触发器(2)
icon: python
order: 1
date: 2022-08-05
category:
- apscheduler
tag:
- trigger
- cron
sticky: true
star: true
isOriginal: true
---

## DateTrigger

把`DateTrigger`放本篇最前面将是因为它相对来说最为简单。一句话就是指定时间的一次触发。

```python
def __init__(self, run_date=None, timezone=None):
    timezone = astimezone(timezone) or get_localzone()  # 时区
    if run_date is not None:
        # 将字符串时间或datetime时间转为时区时间
        self.run_date = convert_to_datetime(run_date, timezone, 'run_date')
    else:
        # 如果未设置run_date，则使用当前时间
        self.run_date = datetime.now(timezone)

def get_next_fire_time(self, previous_fire_time, now):
    # 重写get_next_fire_time方法，返回预设的运行时间，也就是下一次运行时间。
    # 如果上一次已经运行了，就直接返回None结束Job
    return self.run_date if previous_fire_time is None else None
```

如果触发器实例化时什么都不传，那就是默认当前时间去执行。

## IntervalTrigger

在指定的时间间隔上触发，如果指定，则从 ``start_date`` 开始，否则从 ``datetime.now()`` + 时间间隔开始。

同样地，`IntervalTrigger`继承自`BaseTrigger`。在它初始化的时候就约定了时间间隔，以及触发时间的起始时间和结束时间。


```python
def __init__(self, weeks=0, days=0, hours=0, minutes=0, seconds=0, start_date=None,
                end_date=None, timezone=None, jitter=None):
    # 创建时间间隔
    self.interval = timedelta(weeks=weeks, days=days, hours=hours, minutes=minutes,
                                seconds=seconds)
    # 将时间间隔转化为秒
    self.interval_length = timedelta_seconds(self.interval)
    if self.interval_length == 0:
        # 如果时间间隔为0，则默认为1秒
        self.interval = timedelta(seconds=1)
        self.interval_length = 1
    # 取得时区
    if timezone:
        self.timezone = astimezone(timezone)
    elif isinstance(start_date, datetime) and start_date.tzinfo:
        self.timezone = start_date.tzinfo
    elif isinstance(end_date, datetime) and end_date.tzinfo:
        self.timezone = end_date.tzinfo
    else:
        self.timezone = get_localzone()
    # 开始时间 如果没有指定，则默认为当前时间加上时间间隔(当没有时间间隔时，默认为1秒)
    start_date = start_date or (datetime.now(self.timezone) + self.interval)
    # 将开始时间转化为时区时间
    self.start_date = convert_to_datetime(start_date, self.timezone, 'start_date')
    self.end_date = convert_to_datetime(end_date, self.timezone, 'end_date')

    self.jitter = jitter
```

其中`timedelta_seconds`是一个辅助函数，用于将时间间隔转化为秒。(偷走:yum:)

```python
def timedelta_seconds(delta):
    return delta.days * 24 * 60 * 60 + delta.seconds + \
        delta.microseconds / 1000000.0
```

当然最核心的，还是需要实现`get_next_fire_time`方法：

```python
def get_next_fire_time(self, previous_fire_time, now):
    # 如果已知上次执行时间，则直接计算下次执行时间
    if previous_fire_time:
        # 即：上次执行时间 + 时间间隔
        next_fire_time = previous_fire_time + self.interval
    # 如果开始时间大于当前时间，则直接返回开始时间
    elif self.start_date > now:
        next_fire_time = self.start_date
    else:
        # 能运行到这里，说明预设了起始时间是当前时间或之前的
        timediff_seconds = timedelta_seconds(now - self.start_date)
        # 计算开始时间除以时间间隔，向上取整，求出一共差了多少次轮询
        next_interval_num = int(ceil(timediff_seconds / self.interval_length))
        # 计算下次执行时间，即：起始时间 + 时间间隔 * 次数
        next_fire_time = self.start_date + self.interval * next_interval_num

    if self.jitter is not None:
        next_fire_time = self._apply_jitter(next_fire_time, self.jitter, now)

    if not self.end_date or next_fire_time <= self.end_date:
        return normalize(next_fire_time)
    # 超出结束时间，隐式返回None
```

其中，前面两个判断比较好理解：
- `if previous_fire_time:`，说明已经有上次执行时间，则直接计算下次执行时间；
- `elif self.start_date > now:`，说明开始时间大于当前时间，则直接返回开始时间；

最后一个else如果被执行，说明用户设置了start_date，并且这个时间早于当前时间的。
那么我们需要三步计算下次执行时间：
1. 计算当前时间和设置的start_date直接差了多少秒。
2. 把相差的秒数除以时间间隔，向上取整，求出一共差了多少次轮询。
3. 最后计算下次执行时间，即：起始时间 + 时间间隔 * 次数

举个例子吧：

```python
# 今天是2022年08月05日，设置的起始时间是2022年08月01日，运行时间间隔是1天。
trigger = IntervalTrigger(days=1, start_date='2022-08-01')

# 那么它必然会来到最后一个else去执行。
# 1. 计算当前的时间2022年08月05日14:17:23和设置的起始时间2022年08月01日直接差了多少秒。
# 2. 把相差的秒数除以时间间隔，1天就是86400秒，向上取整，求出一共差了多少次轮询。结果是5次。
# 3. 最后计算下次执行时间，即：2022年08月01日 + 1天 * 5次。 = 2022年08月06日
```

接下来就是往常的如果有浮动时间就计算下。

最后一步就是检查是否超出`end_date`，如果超出，则隐式返回None。也就意味着不再继续运行了。
这一步必须在计算完下次执行时间之后再运行。因为它判断的是：下次运行时间和`end_date`的关系。

## 总结

本篇主要讲解了`DateTrigger`和`IntervalTrigger`的源码。相对来说，`DateTrigger`的实现十分简单，因为它属于一次性任务，达到预定时间运行后就结束了。而`IntervalTrigger`因为它属于周期性任务，每次运行都会计算下次运行时间。

下一篇将会对最后一个触发器`CronTrigger`进行讲解。这也是相对最复杂的一个触发器。有必要的话最好提前了解下Cron表达式。
