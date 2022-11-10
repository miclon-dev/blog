---
# 这是文章的标题
title: 多环境配置文件管理(2)
# 这是页面的图标
icon: python
# 这是侧边栏的顺序
order: 1
# 设置写作时间
date: 2022-11-10
# 一个页面可以有多个分类
category:
- python
tag:
- settings
isOriginal: true
---

在[上一篇文章](/posts/language/python/python-settings1.html)中，我们介绍了如何通过读取系统环境变量来区分不同环境的配置文件。这种方式虽然能够解决问题，但是还是有一些不足之处。

- 不同的环境配置文件，需要手动导入
- 只能支持py文件配置项，不能支持json、yaml、toml等主流配置文件格式
- 无法通过环境变量来更改内部配置项
- 一些隐私信息，如数据库密码，会暴露在代码中
- ……

为此，为了解决上述问题，我们可以使用python的第三方库[dynaconf](https://www.dynaconf.com/)来实现配置文件的管理。

## 安装

```bash
pip install dynaconf
```

## 使用

### 命令行创建配置文件

```bash
# 创建配置文件，笔者使用的是yaml格式
dynaconf init -f yaml
```

### 引入dynaconf并配置属性

```python
# config.py
from dynaconf import Dynaconf

settings = Dynaconf(
    # 环境变量前缀
    envvar_prefix="MYPROGRAM",
    # 配置文件名称/路径
    settings_files=["settings.yaml", ".secrets.yaml"],
    # 是否启用环境变量
    environments=True,
    # 是否加载.env文件
    load_dotenv=True,
    # 识别环境变量的标识name
    env_switcher="MYPROGRAM_ENV",
    **more_options
)
```

### 编写配置文件

```yaml
# settings.yaml
# 默认配置
default:
    project_name: my_project

# 开发环境配置
development:
    database:
        host: localhost

# 生产环境配置
production:
    database:
        host: 12.13.14.15
```


### 使用配置

```python
# main.py
# 当前环境：development
from config import settings

assert settings.project_name == "my_project"
assert settings.database.host == "localhost"

```

从上面三段代码可以看出，我们只需要引入`dynaconf`，并配置好属性，就可以使用配置文件中的配置项了。

并且，它还十分友好的支持连续点操作符，如`settings.database.host`。支持对象的解构。


## 一些注意事项

在一开始使用`dynaconf`的过程中，难免遇到一些问题，这里记录一下。

### 无法识别环境变量

我司所有生产机器上识别生产环境都是通过`env=production`这种方式来识别的。（这显然不是我的锅）。
所以自然而然地，我在创建dynaconf配置时，也是这样配置的。

```python
# config.py
from dynaconf import Dynaconf

settings = Dynaconf(
    env_switcher="env",
    ……
)
```

通过`env_switcher`来指定识别环境变量的标识name。但是，当我在生产机器上运行时，却发现它无法识别环境变量。

其原因在于，`dynaconf`默认会将环境变量key值转换为大写，而生产机器上的环境变量是小写的。

所以，我们需要在创建配置时，指定`env_switcher="ENV"`，并且在生产机器上的环境变量也要改为大写。

### 无法读取配置文件

```python
# config.py
from dynaconf import Dynaconf

settings = Dynaconf(
    settings_files=['settings.yaml', '.secrets.yaml'],
    ……
)
```

我在项目中编写好配置文件名称是：`settings.yaml`，但是在部署服务器上运行时，却发现它无法读取配置文件。

其原因在于，当我本地运行时候，我的运行目录是在项目根目录下，而在服务器上运行时，运行目录是在`/app`下。这会直接影响到`dynaconf`的配置文件读取。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221110110853.png)

所以，我通过指定配置文件读取的`root_path`来解决这个问题。

```python
# config.py
from dynaconf import Dynaconf

settings = Dynaconf(
    settings_files=['settings.yaml', '.secrets.yaml'],
    # 固定配置文件读取的根目录，即当前文件所在目录
    root_path=os.path.dirname(os.path.abspath(__file__))
    ……
)
```

## Dynamic Variables

不仅如此，`dynaconf`还支持动态变量，即在配置文件中，可以使用一种动态语法来生成配置项。
```bash
export PROGRAM_NAME=calculator
```

```yaml
# settings.yaml
default
    DB_NAM: "mydb.db"

development:
    DB_PATH: "@format {env[HOME]}/{this.current_env}/{env[PROGRAM_NAME]}/{this.DB_NAME}"
```
- `@format`，相当于python中的`f-string`，可以使用`{}`来引用变量，而事实上源码中也是这么做的
- `{env[HOME]}` 等同于在py中的 `os.environ["HOME"]` or shell中的`$HOME`
- `{this.current_env}` 等同于`settings.current_env`, 也就是当前环境
- 同理，`{env[PROGRAM_NAME]}` 等同于在py中的 `os.environ["PROGRAM_NAME"]` or shell中的`$PROGRAM_NAME`
- {this.DB_NAME} 相当于在default中的`DB_NAME`，即`mydb.db`

所以，最终生成的配置项为：

```python
assert settings.DB_PATH == "/home/miclon/DEVELOPMENT/calculator/mydb.db"
```

### 自定义动态变量命令符

除了上面的动态变量`@format`外，`dynaconf`还支持[自定义动态变量](https://www.dynaconf.com/envvars/#adding-a-custom-casting-token)。

```python
# app.py 官方例子
from pathlib import Path
from dynaconf.utils import parse_conf

parse_conf.converters["@path"] = (
    lambda value: value.set_casting(Path)
    if isinstance(value, parse_conf.Lazy)
    else Path(value)
)
```

```yaml
# settings.yaml
my_path: "@path /home/foo/example.txt"
parent: "@path @format {env[HOME]}/parent"
child: "@path @format {this.parent}/child"
```

我感觉作者的意思是，如果你想要自定义一个动态变量，那么你可以通过`parse_conf.converters`来实现，但是这个过于底层了，我觉得作者应该提供一个更加简单的方法。比如像装饰器，或者暴露接口之类的方式。

```python
def register_converter(tag):
    def decorator(fn):
        @functools.wraps(fn)
        def inner(*args, **kwargs):
            return fn(*args, **kwargs)

        parse_conf.converters[f"@{tag}"] = inner
        return inner

    return decorator


@register_converter("now")
def now(value):
    return datetime.now().strftime(value or '%Y-%m-%d %H:%M:%S')
```

```yaml
# settings.yaml
now: "@now %Y-%m-%d %H:%M:%S"
```

```python
settings.now # 2022-11-10 11:08:53
```


## 总结

目前，`dynaconf`已经用于我项目生产环境中，未来会在后续功能使用中，继续完善这篇文章。

ps: 发现`dynaconf`文档一处错误，PR提交后两小时就被merge了。


![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221110141829.png)
