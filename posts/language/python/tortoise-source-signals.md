---
# 这是文章的标题
title: Tortoise源码阅读 - 信号
# 这是页面的图标
icon: python
# 这是侧边栏的顺序
order: 1
# 设置写作时间
date: 2022-06-14
# 一个页面可以有多个分类
category:
- python
tag:
- tortoise
- 源码学习
---

### 场景

在使用Tortoise操作数据库的时候发现，通过对操作数据库模型加以装饰器，如`@pre_save(Model)`，可以实现对这个模型在`savue`时，自动调用被装饰的方法，从而实现对模型的一些操作。

在此先从官方文档入手，看一下官方的对于模型信号的Example

```python
# -*- coding: utf-8 -*-
"""
This example demonstrates model signals usage
"""
from typing import List, Optional, Type

from tortoise import BaseDBAsyncClient, Tortoise, fields, run_async
from tortoise.models import Model
from tortoise.signals import post_delete, post_save, pre_delete, pre_save


class Signal(Model):
    id = fields.IntField(pk=True)
    name = fields.TextField()

    class Meta:
        table = "signal"

    def __str__(self):
        return self.name


@pre_save(Signal)
async def signal_pre_save(
    sender: "Type[Signal]", instance: Signal, using_db, update_fields
) -> None:
    print('signal_pre_save', sender, instance, using_db, update_fields)


@post_save(Signal)
async def signal_post_save(
    sender: "Type[Signal]",
    instance: Signal,
    created: bool,
    using_db: "Optional[BaseDBAsyncClient]",
    update_fields: List[str],
) -> None:
    print('post_save', sender, instance, using_db, created, update_fields)


@pre_delete(Signal)
async def signal_pre_delete(
    sender: "Type[Signal]", instance: Signal, using_db: "Optional[BaseDBAsyncClient]"
) -> None:
    print('pre_delete', sender, instance, using_db)


@post_delete(Signal)
async def signal_post_delete(
    sender: "Type[Signal]", instance: Signal, using_db: "Optional[BaseDBAsyncClient]"
) -> None:
    print('post_delete', sender, instance, using_db)


async def run():
    await Tortoise.init(db_url="sqlite://:memory:", modules={"models": ["__main__"]})
    await Tortoise.generate_schemas()
    # pre_save,post_save will be send
    signal = await Signal.create(name="Signal")
    signal.name = "Signal_Save"

    # pre_save,post_save will be send
    await signal.save(update_fields=["name"])

    # pre_delete,post_delete will be send
    await signal.delete()


if __name__ == "__main__":
    run_async(run())
```

以上代码可直接复制后运行，运行后的结果：
```text
signal_pre_save <class '__main__.Signal'> Signal <tortoise.backends.sqlite.client.SqliteClient object at 0x7f8518319400> None
post_save <class '__main__.Signal'> Signal <tortoise.backends.sqlite.client.SqliteClient object at 0x7f8518319400> True None
signal_pre_save <class '__main__.Signal'> Signal_Save <tortoise.backends.sqlite.client.SqliteClient object at 0x7f8518319400> ['name']
post_save <class '__main__.Signal'> Signal_Save <tortoise.backends.sqlite.client.SqliteClient object at 0x7f8518319400> False ['name']
pre_delete <class '__main__.Signal'> Signal_Save <tortoise.backends.sqlite.client.SqliteClient object at 0x7f8518319400>
post_delete <class '__main__.Signal'> Signal_Save <tortoise.backends.sqlite.client.SqliteClient object at 0x7f8518319400>
```
可以发现，对模型进行保存和删除时候，都会调用对应的信号方法。

### 源码

从导包可以得知，tortoise的所有信号方法都在`tortoise.signals`中。

```python
from enum import Enum
from typing import Callable

Signals = Enum("Signals", ["pre_save", "post_save", "pre_delete", "post_delete"])


def post_save(*senders) -> Callable:
    """
    Register given models post_save signal.

    :param senders: Model class
    """

    def decorator(f):
        for sender in senders:
            sender.register_listener(Signals.post_save, f)
        return f

    return decorator
   
def pre_save(*senders) -> Callable:
    ...

def pre_delete(*senders) -> Callable:
    ...

def post_delete(*senders) -> Callable:
    ...
```


其内部实现的四个信号方法分别是模型的保存后，保存前，删除前，删除后。

其内部装饰器代码也十分简单，就是对装饰器中的参数（也就是模型），注册一个监听者，而这个监听者，其实就是被装饰的方法。

如上面的官方示例中
```python
# 给模型Signal注册一个监听者，它是方法signal_pre_save
@pre_save(Signal)
async def signal_pre_save(
    sender: "Type[Signal]", instance: Signal, using_db, update_fields
) -> None:
    print('signal_pre_save', sender, instance, using_db, update_fields)
```

而到了Model类中，自然就有一个register_listener方法，定睛一看，上面示例Signal中并没有register_listener方法，所以自然就想到了，这个方法必定在父类Model中。

```python
class Model:
    ...
    @classmethod
    def register_listener(cls, signal: Signals, listener: Callable):
        ...
        if not callable(listener):
            raise ConfigurationError("Signal listener must be callable!")
        # 检测是否已经注册过
        cls_listeners = cls._listeners.get(signal).setdefault(cls, [])  # type:ignore
        if listener not in cls_listeners:
            # 注册监听者
            cls_listeners.append(listener)
```

接下来注册后，这个listeners就会一直跟着这个Signal类。只需要在需要操作关键代码的地方，进行调用即可。

那就看看，在模型save的时候，都干了什么？

```python
    async def save(
        self,
        using_db: Optional[BaseDBAsyncClient] = None,
        update_fields: Optional[Iterable[str]] = None,
        force_create: bool = False,
        force_update: bool = False,
    ) -> None:
        ...
        # 执行保存前的信号
        await self._pre_save(db, update_fields)

        if force_create:
            await executor.execute_insert(self)
            created = True
        elif force_update:
            rows = await executor.execute_update(self, update_fields)
            if rows == 0:
                raise IntegrityError(f"Can't update object that doesn't exist. PK: {self.pk}")
            created = False
        else:
            if self._saved_in_db or update_fields:
                if self.pk is None:
                    await executor.execute_insert(self)
                    created = True
                else:
                    await executor.execute_update(self, update_fields)
                    created = False
            else:
                # TODO: Do a merge/upsert operation here instead. Let the executor determine an optimal strategy for each DB engine.
                await executor.execute_insert(self)
                created = True

        self._saved_in_db = True
        # 执行保存后的信号
        await self._post_save(db, created, update_fields)
```

抛开其他代码，可以看到，在模型save的时候，其实是先执行保存前的信号，然后执行保存后的信号。

### 自己实现一个信号

有了以上的经验，可以自己实现一个信号，比如我打算做个数据处理器的类，我想在这个处理器工作中，监听处理前/后的信号。

```python
# -*- coding: utf-8 -*-
from enum import Enum
from typing import Callable, Dict

# 声明枚举信号量
Signals = Enum("Signals", ["before_process", "after_process"])


# 处理前的装饰器
def before_process(*senders):
    def decorator(f):
        for sender in senders:
            sender.register_listener(Signals.before_process, f)
        return f

    return decorator


# 处理后的装饰器
def after_process(*senders):
    def decorator(f):
        for sender in senders:
            sender.register_listener(Signals.after_process, f)
        return f

    return decorator


class Model(object):
    _listeners: Dict = {
        Signals.before_process: {},
        Signals.after_process: {}
    }

    @classmethod
    def register_listener(cls, signal: Signals, listener: Callable):
        """注册监听者"""
        # 判断是否已经存在监听者
        cls_listeners = cls._listeners.get(signal).setdefault(cls, [])
        if listener not in cls_listeners:
            # 如果不存在，则添加监听者
            cls_listeners.append(listener)

    def _before_process(self):
        # 取出before_process监听者
        cls_listeners = self._listeners.get(Signals.before_process, {}).get(self.__class__, [])
        for listener in cls_listeners:
            # 调用监听者
            listener(self.__class__, self)

    def _after_process(self):
        # 取出after_process监听者
        cls_listeners = self._listeners.get(Signals.after_process, {}).get(self.__class__, [])
        for listener in cls_listeners:
            # 调用监听者
            listener(self.__class__, self)


class SignalModel(Model):

    def process(self):
        """真正的调用端"""
        self._before_process()
        print("Processing")
        self._after_process()


# 注册before_process信号
@before_process(SignalModel)
def before_process_listener(*args, **kwargs):
    print("before_process_listener1", args, kwargs)


# 注册before_process信号
@before_process(SignalModel)
def before_process_listener(*args, **kwargs):
    print("before_process_listener2", args, kwargs)


# 注册after_process信号
@after_process(SignalModel)
def before_process_listener(*args, **kwargs):
    print("after_process_listener", args, kwargs)


if __name__ == '__main__':
    sm = SignalModel()
    sm.process()
```

输出结果：
```text
before_process_listener1 (<class '__main__.SignalModel'>, <__main__.SignalModel object at 0x7ff700116e50>) {}
before_process_listener2 (<class '__main__.SignalModel'>, <__main__.SignalModel object at 0x7ff700116e50>) {}
Processing
after_process_listener (<class '__main__.SignalModel'>, <__main__.SignalModel object at 0x7ff700116e50>) {}
```
