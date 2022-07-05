---
title: python技巧 - 函数、方法的动态调用
shortTitle: 函数、方法的动态调用
# 这是页面的图标
icon: python
# 这是侧边栏的顺序
order: 1
# 设置写作时间
date: 2022-07-05
# 一个页面可以有多个分类
category:
- python
tag:
- dispatch
- 技巧
isOriginal: true
---

今天逛github的时候看到这样一个[项目][jsonrpc]，其中在RPC远程调用接口中实现一个功能，并用`add_method`进行装饰，于是我把它从项目中摘出来。
并在此基础上，我额外增加了`add_missing_method`方法，用于包装一个自定义方法，处理拦截未找到方法的情况。

以下代码演示了如何动态调用函数、方法。

```python
# -*- coding: utf-8 -*-
import functools

try:
    from collections.abc import MutableMapping
except ImportError:
    from collections import MutableMapping


class Dispatcher(MutableMapping):
    """ Dictionary like object which maps method_name to method."""

    def __init__(self, prototype=None):
        """ Build method dispatcher.
        Parameters
        ----------
        prototype : object or dict, optional
            Initial method mapping.
        Examples
        --------
        Init object with method dictionary.
        >>> Dispatcher({"sum": lambda a, b: a + b})
        None
        """
        self.missing_method_name = '__missing__'
        self.method_map = dict()

        if prototype is not None:
            self.build_method_map(prototype)

    def __getitem__(self, key):
        if key in self.method_map:
            return self.method_map[key]
        if self.missing_method_name in self.method_map:
            return self.method_map[self.missing_method_name]
        raise Exception('missing method <' + key + '> if you want to close the Exception, you can use '
                                                   'add_missing_method.')

    def __setitem__(self, key, value):
        self.method_map[key] = value

    def __delitem__(self, key):
        del self.method_map[key]

    def __len__(self):
        return len(self.method_map)

    def __iter__(self):
        return iter(self.method_map)

    def __repr__(self):
        return repr(self.method_map)

    def add_class(self, cls):
        prefix = cls.__name__.lower() + '.'
        self.build_method_map(cls(), prefix)

    def add_object(self, obj):
        prefix = obj.__class__.__name__.lower() + '.'
        self.build_method_map(obj, prefix)

    def add_dict(self, dict, prefix=''):
        if prefix:
            prefix += '.'
        self.build_method_map(dict, prefix)

    def add_method(self, f=None, name=None):
        """ Add a method to the dispatcher.
        Parameters
        ----------
        f : callable
            Callable to be added.
        name : str, optional
            Name to register (the default is function **f** name)
        Notes
        -----
        When used as a decorator keeps callable object unmodified.
        Examples
        --------
        Use as method
        >>> d = Dispatcher()
        >>> d.add_method(lambda a, b: a + b, name="sum")
        <function __main__.<lambda>>
        Or use as decorator
        >>> d = Dispatcher()
        >>> @d.add_method
            def mymethod(*args, **kwargs):
                print(args, kwargs)
        Or use as a decorator with a different function name
        >>> d = Dispatcher()
        >>> @d.add_method(name="my.method")
            def mymethod(*args, **kwargs):
                print(args, kwargs)
        """
        if name and not f:
            return functools.partial(self.add_method, name=name)

        self.method_map[name or f.__name__] = f
        return f

    def add_missing_method(self, f=None, name=None):
        """ Add missing method to the dispatcher"""
        self.missing_method_name = name
        return self.add_method(f, name)

    def build_method_map(self, prototype, prefix=''):
        """ Add prototype methods to the dispatcher.
        Parameters
        ----------
        prototype : object or dict
            Initial method mapping.
            If given prototype is a dictionary then all callable objects will
            be added to dispatcher.
            If given prototype is an object then all public methods will
            be used.
        prefix: string, optional
            Prefix of methods
        """
        if not isinstance(prototype, dict):
            prototype = dict((method, getattr(prototype, method))
                             for method in dir(prototype)
                             if not method.startswith('_'))

        for attr, method in prototype.items():
            if callable(method):
                self[prefix + attr] = method


if __name__ == '__main__':
    d = Dispatcher()

    d.add_method(lambda a, b: a + b, name="sum")
    d.add_method(lambda a, b: a - b, name="sub")
    d.add_method(lambda a, b: a * b, name="mul")

    @d.add_method(name="miclon")
    def method(*args, **kwargs):
        print(args, kwargs)
        return "miclon"

    @d.add_class
    class MyClass:
        def __init__(self):
            self.a = 1

        def method(self, b):
            return self.a + b
    
    @d.add_missing_method(name='__miss__')
    def missing_method(*args, **kwargs):
        print("未找到接收调用的方法", args, kwargs)


    print(d['sum'](1, 2))
    # 3
    print(d['miclon']('a', {'b': 'c'}, 'd'))
    # ('a', {'b': 'c'}, 'd') {}
    print(d['myclass.method'](2))
    # 3
    print(d['qqqqq'](2))
    # 未找到接收调用的方法
    
```

---
---

`Dispatcher`是一个类似字典的对象，它负责存储方法，并且提供一个字典存储方法的名称和方法的映射。

实际调用端可以通过方法名称来动态的调用方法，也可以通过方法名称来获取方法。

它没有任何限制，你要做的就是暴露公共的实例化Dispatcher类。

然后通过：`add_method`方法添加方法，`add_class`方法添加类，`add_object`方法添加对象，`add_dict`方法添加字典(字典中也是方法的名称和方法的映射)，`add_missing_method`方法添加当引用一个不存在方法的时候的默认方法。


[jsonrpc]: https://github.com/pavlov99/json-rpc/blob/master/jsonrpc/dispatcher.py
