---
title: python装饰器进阶指南
shortTitle: python装饰器进阶指南
icon: python
order: 1
date: 2022-09-30
category:
- python
tag:
- decorator
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

## 前言

最近一有时间就在整理自己常用的代码片段，并做成了私人pip包，正好整理到了装饰器的部分，所以就想着写篇文章来总结一下。写这篇文章的目的是为了让大家对装饰器有一个更深入的了解，而不是简单的使用。同时也是自己对装饰器掌握的一个总结，希望能够帮助到大家。


## 需求

我打算带着实际的需求来看待装饰器，这样也会更加容易理解。这道题目也是stackoverflow上的一个问题，我觉得很有意思，所以就拿来做例子。

```python {1,2}
@make_bold
@make_italic
def say():
   return "Hello"
```

运行`say()`将返回：
```text
<b><i>Hello</i></b>
```

## 简单实现

```python
# -*- coding: utf-8 -*-
import functools


def make_bold(fn):
    @functools.wraps(fn)
    def wrapper():
        return "<b>" + fn() + "</b>"

    return wrapper


def make_italic(fn):
    @functools.wraps(fn)
    def wrapper():
        return "<i>" + fn() + "</i>"

    return wrapper


@make_bold
@make_italic
def say():
    return "Hello"


if __name__ == '__main__':
    print(say())
```

看上去挺花哨，其实装饰器是一个python的语法糖，它的本质就是一个函数，它接受一个函数作为参数，并返回一个函数。我们可以把它理解为一个函数的包装器，它可以在不改变原函数的基础上，对函数进行增强。

我们尝试换种方式表达装饰器：

```python
def say2():
    return "Hello"


if __name__ == '__main__':
    print(make_bold(make_italic(say2))())
    # <b><i>Hello</i></b>
```

可以发现，装饰器的作用就是把函数`say2`包装成了`make_bold(make_italic(say2))`，然后再调用它。


## 类方式装饰器

除了用函数的方式来实现装饰器，我们还可以用类的方式来实现装饰器。只需要实现`__call__`魔术方法即可。使得类的实例可以像函数一样被调用。


```python

class MakeTag:
    def __init__(self, tag):
        self.tag = tag

    def __call__(self, fn):
        @functools.wraps(fn)
        def wrapper():
            return f"<{self.tag}>" + fn() + f"</{self.tag}>"

        return wrapper


make_bold = MakeTag('b')
make_italic = MakeTag('i')


@make_bold
@make_italic
def say3():
    return "Hello"
```

## 什么是functools.wraps

`functools.wraps`它也是一个装饰器，它能把原函数的一些属性复制到包装函数中，比如函数名、文档字符串、参数列表等。这样就不会出现一些奇怪的问题，比如我们在`say`函数上调用`help(say)`，会发现它的文档字符串是`wrapper`函数的文档字符串，而不是`say`函数的文档字符串。

我们可以测试一下：

```python {3}
# 不带functools.wraps
def make_bold(fn):
    # @functools.wraps(fn)
    def wrapper():
        """wrapper help doc"""
        return "<b>" + fn() + "</b>"

    return wrapper


@make_bold
def say():
    """say something"""
    return "Hello"


print(say.__name__) # wrapper
print(say.__doc__)  # wrapper help doc
```

可以发现，在不被wraps装饰器装饰的情况下，`say`函数的`__name__`和`__doc__`属性都被改变了。

随后我们再测试一下带有`functools.wraps`的情况：

```python {3}
# 带functools.wraps
make_bold(fn):
    @functools.wraps(fn)
    def wrapper():
        """wrapper help doc"""
        return "<b>" + fn() + "</b>"

    return wrapper


@make_bold
def say():
    """say something"""
    return "Hello"


print(say.__name__) # say
print(say.__doc__)  # say something
```

因此，我们在编写装饰器的时候，最好都加上`functools.wraps`。

## 装饰器的参数

我将对上述的函数装饰器进行改造，使其可以接受参数。

也就是`make_tag('b')`将会生成`make_bold()`这样的形式。

```python
def make_tag(tag):
    def decorator(fn):
        @functools.wraps(fn)
        def wrapper():
            return f"<{tag}>{fn()}</{tag}>"

        return wrapper

    return decorator


@make_tag('b')
@make_tag('i')
def say():
    return "Hello"

print(say())
# <b><i>Hello</i></b>
```

再有一种场景，现在我们`say`函数所返回的内容是固定的`Hello`，我们希望它可以接受参数，比如`say('miclon')`，这样就可以返回`<b><i>miclon</i></b>`。

```python
@make_tag('b')
@make_tag('i')
def say(content):
    return content


print(say('miclon'))
```

如果我直接修改`say`函数，那么就会出现问题，因为`say`函数的参数列表已经发生了变化，而装饰器的参数列表压根没有参数列表，所以这样的修改是不行的。
> TypeError: wrapper() takes 0 positional arguments but 1 was given

为此我需要改进下装饰器的参数列表，使其可以接受参数。


```python {4,5}
def make_tag(tag):
    def decorator(fn):
        @functools.wraps(fn)
        def wrapper(content):
            return f"<{tag}>{fn(content)}</{tag}>"

        return wrapper

    return decorator
```

然而大部分情况下，我们不会这么"死板"地将装饰器的参数列表和被装饰函数的参数列表一一对应，这样不够灵活，也不便于代码维护。

因此，正确的做法是，我们将装饰器的参数列表设置为`*args`, `**kwargs`，这样就可以接受任意数量的参数了。换句话说，无论被装饰的函数有什么样的参数，我作为装饰器，==被装饰函数的参数统统接受，并全部打回被装饰的函数。==

```python {4,5}
def make_tag(tag):
    def decorator(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            return f"<{tag}>{fn(*args, **kwargs)}</{tag}>"

        return wrapper

    return decorator
```

## 另类的装饰器

在众所周知的Django框架中，有一个这样的装饰器：

```python
class classproperty:
    def __init__(self, method=None):
        self.fget = method

    def __get__(self, instance, cls=None):
        return self.fget(cls)
```

它的作用是，可以将一个类方法变成一个类属性，并且不再需要实例化对象后才可以调用。比如：

```python
class Demo:

    @property
    def abc(self):
        return 123


print(Demo.abc)  # <property object at 0x1045708b0>
print(Demo().abc)  # 123
```
经过`property`的装饰，我们需要实例化对象后才可以调用`abc`属性。

那能不能不实例化也能调用呢？也就是换个思路，我得把`abc`变成一个"类属性"，而不是实例属性。


我们回到上面`classproperty`装饰器上。


乍一看发现它并没有我上述所说的类装饰器的特性，它并没有实现`__call__`方法，那么它是如何实现装饰器的呢？

其实它这个`classproperty`类中的`__get__`方法是python中的描述符，用于代理另外一个类的属性，被装饰类方法首先会经过`__init__`，将类方法保存起来，然后再经过`__get__`，将类方法代理到类属性上。一旦属性被获取，就会触发`__get__`方法，通过`self.fget(cls)`调用类方法。

```python {11}
class classproperty:
    def __init__(self, method=None):
        self.fget = method

    def __get__(self, instance, cls=None):
        return self.fget(cls)


class Demo:

    @classproperty
    def abc(self):
        return 123


print(Demo.abc)  # 123
```

它将等同于：
```python
class Demo:

  def _abc(self):
      return 123

  abc = classproperty(_abc)


print(Demo.abc)  # 123
```
