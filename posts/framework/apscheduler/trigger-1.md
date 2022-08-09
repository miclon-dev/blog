---
title: Apscheduler源码剖析(一)-Trigger之组合触发器
shortTitle: Apscheduler触发器(1)
icon: python
order: 1
date: 2022-08-04
category:
- apscheduler
tag:
- trigger
- cron
sticky: true
star: true
isOriginal: true
---

## 触发器Trigger

> 触发器包含调度逻辑。每个Job都有自己的触发器，用于**确定下一次运行作业的时间**。除了初始配置之外，触发器是完全无状态的。

言简意赅，触发器的作用就是根据用户预设的时间，计算出下一次运行的时间。这个时间可能是固定的一个时间、也有可能是每隔一段时间、也有可能是cron表达式。

## 触发器的种类

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220804204113.png)

四大核心触发器：
- `BaseCombiningTrigger` 组合模式触发器
  - `AndTrigger` 给定所有触发器中**同时满足**最早的下一次触发时间，如果一直不满足会死循环。
  - `OrTrigger` 给定所有触发器中**任意一个**最早的下一次触发时间。
- `IntervalTrigger` 定时周期性触发器
- `CronTrigger` cron表达式触发器
- `DateTrigger` 指定日期触发器

这四大核心触发器的父类均是`BaseTrigger`。

## BaseTrigger

触发器基类是一个抽象类，它有一个抽象方法和一个内部方法。

### get_next_fire_time

该方法时抽象方法，所有基础自`BaseTrigger`触发器的都必须实现该方法。
该方法是整个触发器的核心方法，它根据触发器的配置，计算出下一次触发时间。

### _apply_jitter

所有继承`BaseTrigger`的子类都拥有此方法。
该方法用于浮动下一次运行时间，值得注意的是：这个模式在DateTrigger(日期触发器)下不被使用。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220804213637.png)


# BaseCombiningTrigger

这是组合模式触发器的基类，主要作用就是约束了触发器的序列化与反序列化的对象关系。

类的序列化与反序列化后期会专门开文章详细讲解，但为了大家有个初步概念，我写了一个demo。

```python
# -*- coding: utf-8 -*-
import pickle


class Demo:

    def __init__(self, name):
        self.name = name

    def __getstate__(self):
        print('getstate.开始序列化')
        return {'name': self.name}

    def __setstate__(self, state):
        print('getstate.开始反序列化')
        self.name = state['name']


if __name__ == '__main__':
    d = Demo('miclon')
    b_obj = pickle.dumps(d)
    new_d = pickle.loads(b_obj)
    print(id(d), id(new_d))  # 140432814944208 140432815293104
    print(new_d.name)  # miclon
```

可以在类中通过`__getstate__`约束类的序列化模型，通过`__setstate__`取出反序列化的属性。
这一切都归功于`pickle`模块。

有了初步的概念，我们再看`BaseCombiningTrigger`中的这两个魔术方法：

```python
def __getstate__(self):
    return {
        'version': 1,
        'triggers': [(obj_to_ref(trigger.__class__), trigger.__getstate__())
                      for trigger in self.triggers],
        'jitter': self.jitter
    }

def __setstate__(self, state):
    if state.get('version', 1) > 1:
        raise ValueError(
            'Got serialized data for version %s of %s, but only versions up to 1 can be '
            'handled' % (state['version'], self.__class__.__name__))

    self.jitter = state['jitter']
    self.triggers = []
    for clsref, state in state['triggers']:
        cls = ref_to_obj(clsref)
        trigger = cls.__new__(cls)
        trigger.__setstate__(state)
        self.triggers.append(trigger)
```

其实它就是为接下来的子类`OrTrigger`和`AndTrigger`提供了一个序列化模板。

上面代码中还有两个有意思的函数：`obj_to_ref`和`ref_to_obj`。我们依然使用最小单元测试来阐述这两个函数的作用。

```python
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.util import obj_to_ref, ref_to_obj

trigger = IntervalTrigger(seconds=3)

# 对象转换为引用
ref = obj_to_ref(trigger.__class__)
# 引用转换为对象
obj = ref_to_obj(ref)

print(ref, obj)
# apscheduler.triggers.interval:IntervalTrigger 
# <class 'apscheduler.triggers.interval.IntervalTrigger'>
```

原来这两个函数的作用就是对象与引用的互相转换。

## AndTrigger

给定所有触发器中**同时满足**最早的下一次触发时间，如果一直不满足会死循环。

有了基类`BaseCombiningTrigger`的加持，`AndTrigger`类的实现非常简单，仅需要实现抽象方法`get_next_fire_time`即可。

```python
def get_next_fire_time(self, previous_fire_time, now):
    while True:
        # 获取多个触发器的下一次触发时间
        fire_times = [trigger.get_next_fire_time(previous_fire_time, now)
                      for trigger in self.triggers]
        if None in fire_times:
            return None
        # 如果多个触发器中所有的下一次触发时间都相同，则返回其中一个(其实哪个都一样，因为都行相同了)
        elif min(fire_times) == max(fire_times):
            return self._apply_jitter(fire_times[0], self.jitter, now)
        else:
            # 否则，就将now设置为最迟的下一次触发时间，然后继续循环
            now = max(fire_times)
```

初看代码不觉得什么，当我写下注释时脑海中浮现一个疑问？如何保证我提供的多个触发器都能在相同的时间触发？因为不满足是个死循环呀！带着疑问去官网看看有没有解释。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220804222710.png)

看完官方例子我更糊涂了，原因在于它定义了两个触发器：
1. IntervalTrigger(hours=2)
2. CronTrigger(day_of_week='sat,sun')

问题就在这里，假如我在2022年08月04日20:32:12开始计时，那么`IntervalTrigger`下一次触发时间是什么？

答案是2022年08月04日22:32:12。也就是以后所有时间的xx:32:12。

那么`cronTrigger`呢？它定义的是只在 Saturdays and Sundays 触发。这显然是在这个时间的零点啊

直接验证下说法：

这是IntervalTrigger的下一次触发时间：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220804224244.png)

也就是每两个小时的41分09秒。

这是CronTrigger的下一次触发时间：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220804224527.png)

这是每个周的周六的零点。

这两个时间显然永远不会存在交集！BUG！！

所以解决方案最简单的就是，在设置`IntervalTrigger`的时候给它一个零点的时间。

## OrTrigger

给定所有触发器中**任意一个**最早的下一次触发时间。

```python
def get_next_fire_time(self, previous_fire_time, now):
    # 获取多个触发器的下一次触发时间
    fire_times = [trigger.get_next_fire_time(previous_fire_time, now)
                  for trigger in self.triggers]
    # 过滤掉None的时间
    fire_times = [fire_time for fire_time in fire_times if fire_time is not None]
    if fire_times:
        return self._apply_jitter(min(fire_times), self.jitter, now)
    else:
        return None
```

这个看起来是可以使用两个job指定不同的触发器达到相同效果的。

## 总结

接下来会继续对剩余的三个触发器做依次的剖析，最后笔者会结合阅读源码的经验积累做一个自己的触发器。
另外，在使用`AndTrigger`组合触发器下注意start_date需要指定。
