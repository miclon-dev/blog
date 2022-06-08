---
# 这是文章的标题
title: 多环境配置文件管理(1)
# 这是页面的图标
icon: python
# 这是侧边栏的顺序
order: 1
# 设置写作时间
date: 2022-01-26
# 一个页面可以有多个分类
category:
- python
tag:
- settings
---

真正开发一个完整项目的时候，往往不同的环境存在不同的项目配置文件。当你在本地开发的时候，配置文件为`development.py`，生产环境时候的则是`production.py`。
<!--more-->
传统方式：
`settings.py`
```python
# 开发环境
HOST = 'localhost'
PORT = 3306
USER = 'root'
PASSWORD = 'root'
NAME = 'db'

# 线上环境
# HOST = '112.11.23.89'
# PORT = 3306
# USER = 'root'
# PASSWORD = 'DWDW@D@#$'
# NAME = 'db'
```

这样看似用注释的方式区分开各个环境的配置内容，但是每次部署还要手动切换，人为操作往往是失误最多的。

最为通俗的改写方式，应该是通过读取系统环境变量来区分当前的应该哪个环境下的配置文件。

比如在开发环境中，我们的APP_ENV为default，而在生产则为production，通过读取APP_ENV来读取不同的配置文件。
- config
    - `__init__.py`		# 读取环境引入不同的环境配置文件
    - `production.py`		# 生产环境
    - `development.py`   # 开发环境

```python
import os

if os.environ.get('env') == 'production':
    from config.production import *
else:
    from config.development import *
```


可以稍微改写一下，使其用起来更优雅。
`config.py`
```python
# -*- coding: utf-8 -*-
import os


class Config(object):

    def __getitem__(self, item):
        return self.__getattribute__(item)


class Production(Config):
    HOST = '112.11.23.89'
    PORT = 3306
    USER = 'root'
    PASSWORD = 'DWDW@D@#$'
    NAME = 'db'


class Development(Config):
    HOST = 'localhost'
    PORT = 3306
    USER = 'root'
    PASSWORD = 'root'
    NAME = 'db'


mapping = {
    'development': Development,
    'production': Production,
    'default': Development
}

APP_ENV = os.environ.get('APP_ENV', 'default').lower()
config = mapping[APP_ENV]()

```

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220608082931.png)
