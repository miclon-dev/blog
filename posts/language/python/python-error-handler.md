---
title: 优雅地处理python异常
shotTitle: 优雅地处理python异常
icon: python
order: 1
date: 2022-12-25
category:
- python
tag:
- exception
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

## 异常基础

在python代码中捕获异常，可以使用`try/except`语句。它的基本形式如下：

```python
try:
    # 需要检查的代码
except Exception as e:
    # 处理异常的代码
```

还可以使用finally子句，在异常发生时执行一些清理工作，以及不管是否发生异常都要执行的操作。

```python
try:
    # 需要检查的代码
except Exception as e:
    # 处理异常的代码
finally:
    # 不管是否发生异常都要执行的代码
```

此外，在`except`子句中，可以根据不同的异常类型使用不同的处理方式，以便更加精确地处理异常。

```python
try:
    # 需要检查的代码
except ValueError as e:
    # 处理ValueError异常的代码
except TypeError as e:
    # 处理TypeError异常的代码
except Exception as e:
    # 处理其他异常的代码
```

可以发现，为了给一个方法添加异常处理，需要在方法中添加大量的`try/except`语句，这样会使代码变得很冗长，不易阅读。因此，笔者尝试一种更加优雅的方式来处理异常。

## 异常处理装饰器

笔者的初步构思是我只需要给需要捕捉异常的函数添加一个装饰器，随后我们可以将该函数的各类异常分离出来，统一处理。这样就可以避免在函数中添加大量的`try/except`语句。

```python
# 伪代码

@tryme
def func():
    # 需要检查的代码
    print(1 / 0)

@func.exception(ZeroDivisionError)
def handle_zero_division_error(e):
    # 处理ZeroDivisionError异常的代码
    print(e)
```

这样，当`func`函数发生`ZeroDivisionError`异常时，就会调用`handle_zero_division_error`函数来处理异常。

观察以上伪代码，首先我们在`func`函数上添加了一个装饰器`@tryme`，这点不难理解，而后面我们添加异常装饰器是使用`@func.exception`，但是我们的`func`函数并没有`exception`属性，这是怎么回事呢？其实这也不难，我们只需要在`@tryme`的装饰器中，将`func`函数的`exception`属性**指向一个新的函数**，这个函数的作用就是添加异常处理函数。

### 代码实现

```python
from functools import wraps
from typing import Callable, Dict, Any


def tryme(func):
    exception_: Dict[Any, Callable] = {}

    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            ret = func(*args, **kwargs)
            if ret is not None:
                return ret
        except Exception as e:
            handler = None
            for c in exception_.keys():
                if isinstance(e, c):
                    handler = c

            if handler is None:
                raise e

            return exception_[handler](e)

    def except_(*exceptions):
        def decorator(f):
            for e in exceptions:
                exception_[e] = f
            return f

        return decorator
    # 将exception属性指向except_函数
    # 这样就可以使用@func.exception来添加异常处理函数
    wrapper.exception = except_
    return wrapper


@tryme
def my_function():
    print(1 / 0)


@my_function.exception(ZeroDivisionError)
def handle_zero_division_error(e):
    print('zero division error')


if __name__ == '__main__':
    my_function()
```

这一版本中有个不太合理的地方，假设我有10个函数需要捕捉某个指定异常，岂不是要写10次`@my_function.exception(ZeroDivisionError)`？这样的代码显然不够优雅，因此我们需要改进一下。使用类来封装异常装饰器，同一实例化的对象可以共享异常处理函数。

```python
from functools import wraps
from typing import Callable, Dict, Any


class TryMe:

    def __init__(self):
        self.exception_: Dict[Any, Callable] = {}

    def try_(self, func):

        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                handler = None
                for c in self.exception_.keys():
                    if isinstance(e, c):
                        handler = c

                if handler is None:
                    raise e
                # 将异常发生的函数和异常对象传入异常处理函数
                return self.exception_[handler](func, e)

        return wrapper

    def except_(self, *exceptions):
        def decorator(f):
            for e in exceptions:
                self.exception_[e] = f
            return f

        return decorator


tryme = TryMe()


@tryme.try_
def my_function():
    print(1 / 0)
    print('hello world')


@tryme.try_
def my_function2():
    print(1 / 0)
    print('hello world')


@tryme.except_(ZeroDivisionError)
def handle_zero_division_error(func, e):
    print(func.__name__, str(e))


if __name__ == '__main__':
    my_function()
    my_function2()
```

```text
输出：
my_function division by zero
my_function2 division by zero
```

这样，我们可以统一封装异常函数，由于调用异常函数时，会传入异常发生的函数和异常对象，因此我们可以在异常函数中获取异常发生的函数的信息，比如函数名、参数等。

## trytry

结合本次学习，笔者开发了`trytry`模块，可以实现以上全部功能，并且支持自定义函数异常处理和finally，全局异常处理。

```bash
pip install trytry
```

```python
from trytry import trytry


@trytry
def my_function():
    raise FileNotFoundError('file not found')


@trytry
def my_function2():
    print(1 / 0)


@trytry.exception(ZeroDivisionError)
def handle_zero_division_error(func, e):
    print(func.__name__, str(e))


@trytry.exception(FileNotFoundError)
def handle_file_not_found_error(func, e):
    print(func.__name__, str(e))


@my_function.finally_
def my_function_finally():
    print(my_function.__name__, "finally")


if __name__ == '__main__':
    my_function()
    my_function2()
```

```text
my_function file not found
my_function finally
my_function2 division by zero
```
## 总结

本文不仅介绍了Python中的异常处理机制，还实现了一个简单的异常装饰器。面对多个异常需要在函数后追加各种`except`语句，显得代码不够优雅，因此我们可以使用装饰器来实现异常处理，这样可以使代码更加简洁。
