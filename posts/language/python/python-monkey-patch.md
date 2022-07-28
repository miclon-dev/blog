---
title: python猴子补丁的应用场景
icon: python
order: 1
date: 2022-07-28
category:
- python
tag:
- monkey-patch
sticky: true
star: true
isOriginal: true
---

# https://github.com/django/django/commit/a41b09266dcdd01036d59d76fe926fe0386aaade
### :thinking: 何为猴子补丁

笔者并不知道为何要叫猴子补丁，就像Django为什么叫Django而不叫Migo一样。但是猴子补丁是一种技术，它可以让你在不需要改变原有代码的情况下，添加、修改新的功能。其应用场景大都是为第三方or官方模块进行补丁。


### :yum: 案例

之前群里有位朋友问：
> 我想在运行状态下调整部分函数。

当时我给出的Demo是这样的：

```python
# -*- coding: utf-8 -*-
from types import MethodType


class Test:
    def __init__(self, name):
        self.name = name

    def work(self, job):
        print(f"{self.name} is working on {job}")


def work(self, job1, job2):
    print(f"{self.name} is working on {job1} and {job2}")


# 修改对象方法
t1 = Test("miclon")
Test.work = work
t1.work("job1", "job2")

# 修改实例方法
t2 = Test("miclon")
t2.work = MethodType(work, t2)
t2.work("job1", "job2")
```

运行结果：
> miclon is working on job1 and job2
> 
> miclon is working on job1 and job2

两种不同的方式来解决这个问题，第一种是修改对象方法，第二种是修改实例方法。

#### 修改对象方法
- 直接给这个类中的方法进行修改，它将会影响未来所有实例化这个类的对象。
- 什么意思？

根据上述代码的优先级，其实我如果不写
`t2.work = MethodType(work, t2)`一样是可以达到运行目的的。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220728064313.png =x300)

原因就在于，我在修改实例方法之前其实已经把原生对象中的方法替换了，后续所有实例化都会受影响。

不信我们试试调换顺序？

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220728064511.png =x300)

#### 修改实例方法
- 只是修改了创建实例后的方法，不会影响原生对象。


### :hugs: 实际应用

一般在极少数情况下，我们会使用猴子补丁来解决问题。当我在基于Django2.x版本开发时候，由于使用了`pymysql`包，官方对其支持度还不够导致产生了如下报错：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220728065314.png)

Google后的解决方案是：

[Django 2.2 + AttributeError: 'str' object has no attribute 'decode'](https://stackoverflow.com/questions/67024174/django-2-2-attributeerror-str-object-has-no-attribute-decode)

我们在Django的[提交记录](https://github.com/django/django/commit/a41b09266dcdd01036d59d76fe926fe0386aaade)中发现了这个问题的解决方案：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220728065904.png)

结合我们上文中对猴子补丁的理解，我们可以自己改写这个`last_executed_query`方法，然后将此方法以补丁的方式注入到Django中。

### :grinning: 实现

在项目入口处，编写补丁函数。

```python
def monkey_patch_mysql_db_operations():
    from django.db.backends.mysql.operations import DatabaseOperations
    from django.utils.encoding import force_str

    def last_executed_query(self, cursor, sql, params):
        return force_str(getattr(cursor, '_executed', None), errors='replace')

    DatabaseOperations.last_executed_query = last_executed_query


monkey_patch_mysql_db_operations()
```

保存后重启应用，发现报错消失，说明补丁生效了。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220728070410.png)

### :shushing_face: 注意

由于python语法过于灵活使得它可以有非常多的『骚操作』，但是我们应该清楚，代码一样也是以人为本，人类能读懂，其次是机器能识别。过多的依赖这类特性可能会引发自己无法预见的bug。
