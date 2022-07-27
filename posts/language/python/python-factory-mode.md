---
title: python多种创建工厂模式场景
shortTitle: python工厂模式
icon: python
order: 1
date: 2022-07-27
category:
- python
tag:
- factory
- design mode
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

### :point_right: 工厂模式使用场景
- 不清楚用户需要创建什么对象
- 使用方法来代替new实例化对象的过程

它可以是用户自定义输入，也可以是通过接口或配置文件传入。如输入"Message"，可以创建Message类的实例。

工厂模式指的是程序传入一个输入参数，自动创建所对应的对象。调用端并不需要关心类实例化的过程。基于工厂模式，可以实现可扩展、易维护的代码。

当你想扩展新增一个子类的时候，只需要关注于类本身。这样就可以遵守代码的"开闭原则"，对扩展开放，对修改封闭。

### :point_right: 场景举例

下面演示一个需求场景，我们需要开发一个消息通知功能，这个消息通知需要支持多种通知方式，比如邮件、短信、微信、钉钉等。

### :seedling: 传统的工厂模式

传统的工厂模式就是if-else多重判断，指定传参匹配指定类。

::: tabs

@tab main.py

```python
from factory import factory_sender
from config import message_config

def send_message(message: dict):
    
    for msg_cfg in message_config:
        for name, config in msg_cfg.items():
            sender = factory_sender(name, config)
            sender.send_message(**message)

if __name__ == '__main__':

    send_message(
        {
            "title": "警告消息",
            "body": "这是一条警告消息",
            "type": "warning"
        }
    )
```

@tab factory.py

```python
from channels import Ding, WeChat, Email

def factory_sender(name, config):
    if name == "ding":
        return Ding(config)
    elif name == "wechat":
        return WeChat(config)
    elif name == "email":
        return Email(config)
    else:
        raise Exception("Unknown message type")
```

@tab channels.py

```python
class Notification:

    def send_message(self, title, body, *args, **kwargs):
        raise NotImplementedError()

class Ding(Notification):

    def __init__(self, config):
        self.token = config['token']
    
    def send_message(self, title, body, *args, **kwargs):
        print(f"Ding send message: {title} {body}")

class WeChat(Notification):

    def __init__(self, config):
        self.key = config['key']
        self.secret = config['secret']

    def send_message(self, title, body, *args, **kwargs):
        print(f"WeChat send message: {title} {body}")


class Email(Notification):

    def __init__(self, config):
        self.username = config['username']
        self.password = config['password']
    
    def send_message(self, title, body, *args, **kwargs):
        print(f"Email send message: {title} {body}")
```

@tab config.py

```python
message_config = [
    {
        "ding": {
            "token": "Ding Token",
        },
        "wechat": {
            "key": "WeChat Key",
            "secret": "WeChat secret"
        },
        'email': {
            'username': 'Email username',
            'password': 'Email password'
        }
    }
]
```
:::

- `main.py`是程序的入口，在不更改需求的前提下我们是不会去修改这个入口文件的。

- `factory.py`中==factory_sender==负责实例化对象。

- `channels.py`就是我们开发的消息发送渠道，未来大部分工作应该专注于渠道的开发。

- `config.py`是消息发送的配置项，因为不同的消息渠道有各自不同的配置。

传统模式下的一点小弊端：

我们的工作不仅限于渠道的开发，新增渠道后我们需要在==factory_sender==中进行手动匹配。

比如新增短信渠道就需要：`elif name == "sms":`


### :shamrock: 自动导入工厂模式

在自动导入模式中，我们依然会保持上面的==channels.py==和==config.py==文件不变。

:::tabs

@tab main.py

```python
from util import import_object
from config import message_config

def send_message(message: dict):
    
    for cfg in message_config:
        for key, value in cfg.items():
            Obj = import_object(f'channels.{key}')
            Obj(value).send_message(**message)

if __name__ == '__main__':

    send_message(
        {
            "title": "警告消息",
            "body": "这是一条警告消息",
            "type": "warning"
        }
    )
```

@tab util.py

```python
def import_object(name: str):
    """字符串导入模块方法"""
    if name.count(".") == 0:
        return __import__(name)
    parts = name.split(".")
    obj = __import__(".".join(parts[:-1]), fromlist=[parts[-1]])
    try:
        return getattr(obj, parts[-1])
    except AttributeError:
        raise ImportError("No module named %s" % parts[-1])
```
:::

从`main.py`入口文件中可以发现，原来的==factory_sender==方法变成了==import_object==。
它的作用是根据传参字符串自动导入包：
> "channels.Ding"即导入channels包下面的Ding类

那么事情就变得相对简单，我们依然只需要把重心放在渠道扩展上，当新增了一个渠道`Sms`，自动就拥有了此类的功能。

```python
# channels.py
……

class Sms(Notification):

    def __init__(self, config):
        ...
    
    def send_message(self, title, body, *args, **kwargs):
        print(f"Sms send message: {title} {body}")
```

不需要改变`main.py`文件，直接运行`main.py`主程序。
```bash
Ding send message: 警告消息 这是一条警告消息
WeChat send message: 警告消息 这是一条警告消息
Email send message: 警告消息 这是一条警告消息
Sms send message: 警告消息 这是一条警告消息
```

### :four_leaf_clover: 注册中心工厂模式

上述方式是通过动态导入类来实现的工厂模式，接下来继续使用动态语言特性，通过字典映射关系来注册类。

同样的，我们无需更改`channels.py`和`config.py`中的代码。


:::tabs

@tab main.py

```python
from config import message_config
import channels
import factory


factory.register('Ding', channels.Ding)
factory.register('WeChat', channels.WeChat)
factory.register('Email', channels.Email)

def send_message(message: dict):
    
    for cfg in message_config:
        for key, value in cfg.items():
            Obj = factory.run(key)
            Obj(value).send_message(**message)

if __name__ == '__main__':
    send_message(
        {
            "title": "警告消息",
            "body": "这是一条警告消息",
            "type": "warning"
        }
    )
```
@tab factory.py

```python
services = {}

def register(name, service):
    services[name] = service

def unregister(name):
    services.pop(name, None)

def run(name):
    return services[name]
```
:::

不难发现，所谓注册中心，其实就是字典的关系映射，将所有渠道注册到字典中，通过字典key来调用类value。

聪明的同学会说：那我岂不是还是需要手动一个个注册这些渠道？

于是我们可以在注册中心中做个==自动注册==


:::tabs

@tab main.py

```python

from config import message_config
import factory

factory.auto_register()

def send_message(message: dict):
    
    for cfg in message_config:
        for key, value in cfg.items():
            Obj = factory.run(key)
            Obj(value).send_message(**message)

if __name__ == '__main__':
    send_message(
        {
            "title": "警告消息",
            "body": "这是一条警告消息",
            "type": "warning"
        }
    )
```

@tab factory.py

```python
services = {}

def register(name, service):
    services[name] = service

def unregister(name):
    services.pop(name, None)

def run(name):
    return services[name]

def auto_register():
  import channels
  for name in channels.__dict__:
    if name.startswith('__'):
      continue
    register(name, getattr(channels, name))
```
:::

### :muscle: 总结

利用python动态语言的特性，可以开发出不一样的工厂模式来解耦实际场景。本次就分享两种工程模式的设计实现。

以上案例笔者已在一项目中体现：[GitHub-simple-notify](https://github.com/mic1on/simple-notify)
