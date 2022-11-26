---
title: python中__str__和__repr__区别
shortTitle: str和repr区别与应用
icon: python
order: 3
date: 2022-11-25
category:
- python
tag:
- str
- repr
sticky: true
star: true
isOriginal: true
---

## 简介

在python中，`__str__`和`__repr__`均为类的魔术方法，也就意味着，它会在指定的场景下才会被自动调用。但是这两者经常会傻傻分不清楚，接下来结合测试和场景来更深入的理解这两个魔术方法。

## 何时触发

### \_\_str\_\_

[官方](https://docs.python.org/3/reference/datamodel.html#object.__str__)说法解析：

- `__str__`是在str(object)、format()、print()object.__str__等场景下被调用。
- 返回值必须是字符串，它不应当是一个Python表达式，而是应该是一个可读且简洁的字符串。

==核心：`__str__`返回的是一个简洁可读的字符串。==

### \_\_repr\_\_

[官方](https://docs.python.org/3/reference/datamodel.html#object.__repr__)说法解析：

- `__repr__`是在repr(object)和控制台输出等场景下被调用。
- 它看起来是一个有效的`python`表达式。(下文讨论)
- 如果不能是表达式，那应当返回`<类的可读描述>`形式的字符串
- 如果定义了`__repr__`但是没定义`__str__`，则会去调用`__repr__`。
- 通常用于调试。

==核心：`__repr__`返回的是一个python表达式或者`<类的可读描述>`==

演示代码：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221125102612.png)

## 应用场景

其实大部分应用场景应当结合实际情况。

为了直观表述，不妨看看官方模块是如何来编写的。

### datetime

```python
import datetime

print(str(datetime.datetime.now()))  # 2022-11-25 10:42:22.833073
print(repr(datetime.datetime.now()))  # datetime.datetime(2022, 11, 25, 10, 42, 22, 833112)
```

从`datetime`模块中，领悟`__str__`和`__repr__`的区别。

`__str__`获得了良好且可读的输出：`2022-11-25 10:42:22.833073`

`__repr__`获得了python表达式，你可以将此表达式复制后运行。
```python
datetime.datetime(2022, 11, 25, 10, 42, 22, 833112).year  # 2022
```


### threading

```python
from threading import Thread

print(str(Thread()))    # <Thread(Thread-1, initial)>
print(repr(Thread()))   # <Thread(Thread-2, initial)>
```

这和`datetime`有所不同，Thread类中并未实现`__str__`，所以当`str()`调用后，会默认调用`__repr__`。

而Thread无法提供一个有效的`python`表达式，所以使用两个尖括号用于表述：这是线程类(Thread)，当前线程的数量(1/2)和当前线程的状态(initial)
