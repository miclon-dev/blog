---
# 这是文章的标题
title: Tortoise源码-数据库连接
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

在fastapi中使用tortoise，一般来说需要在app启动时候注册tornoise的连接，这样才能在app中使用tortoise，否则无法使用。

```python
register_tortoise(
    app,
    config=DB_ORM_CONFIG
)
```
而register_tortoise的背后，实际上就是监听了fastapi的启动，执行`Tortoise.init`方法。

```python
# connections is a singleton instance of the ConnectionHandler class and serves as the
# entrypoint to access all connection management APIs.
from tortoise import connections


# Assume that this is the Tortoise configuration used
await Tortoise.init(
    {
        "connections": {
            "default": {
                "engine": "tortoise.backends.sqlite",
                "credentials": {"file_path": "example.sqlite3"},
            }
        },
        "apps": {
            "events": {"models": ["__main__"], "default_connection": "default"}
        },
    }
)

conn: BaseDBAsyncClient = connections.get("default")
try:
    await conn.execute_query('SELECT * FROM "event"')
except OperationalError:
    print("Expected it to fail")
```
其第一个参数就是初始化的配置信息，我们这次主要学习的就是`connections`的源码实现。

它，是如何做到通过配置不同的`engine`来创建不同的`connection`的。
并且能够调用一样的代码兼容各种数据库的操作。

### 源码

有经验的同学可以知道，配置文件中`engine`的属性值其实是一个包路径。这个包所处的位置就是`tortoise/backends/sqlite`

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220614152933.png)

也就是说，如果我把这个`engine`改成`tortoise.backends.mysql`，那么就会创建一个`mysql`的连接。

通过观察文件目录结构，可以发现一个共同特征，每个backend包中，除了base基类外都通过__init__暴露出其自身的类，并把名字都取为：`client_class`。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220614153437.png)

这样做的一个好处就是，我们可以通过`某个方法`来获取到相应的`client_class`，然后就可以调用相应的方法了。

了解了大概的目录结构，我们还是回到最初 初始化的那个方法`Tortoise.init`。

进入该文件`tortoise/__init__.py`中看到：
```python
    @classmethod
    async def init(
        cls,
        config: Optional[dict] = None,
        config_file: Optional[str] = None,
        _create_db: bool = False,
        db_url: Optional[str] = None,
        modules: Optional[Dict[str, Iterable[Union[str, ModuleType]]]] = None,
        use_tz: bool = False,
        timezone: str = "UTC",
        routers: Optional[List[Union[str, Type]]] = None,
    ) -> None:
    
        if cls._inited:
            await connections.close_all(discard=True)
            await cls._reset_apps()
        if int(bool(config) + bool(config_file) + bool(db_url)) != 1:
            raise ConfigurationError(
                'You should init either from "config", "config_file" or "db_url"'
            )
        ……

        cls._init_timezone(use_tz, timezone)
        # 在这里初始化connections
        await connections._init(connections_config, _create_db)
        cls._init_apps(apps_config)
        cls._init_routers(routers)

        cls._inited = True
```

下个断点，可以发现，在`_init_connections`方法中，遍历配置项目中，所有connections，然后将其创建对象。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220614154541.png)

使用`self.get`，传入`name`，这个name就是配置中键名`default`，就可以获取到相应的`connection`对象。

```python
def get(self, conn_alias: str) -> "BaseDBAsyncClient":
    # 缓存
    storage: Dict[str, "BaseDBAsyncClient"] = self._get_storage()
    try:
        # 如果缓存中有，直接返回
        return storage[conn_alias]
    except KeyError:
        # 如果缓存中没有，则创建一个新的连接，并将其缓存起来
        connection: BaseDBAsyncClient = self._create_connection(conn_alias)
        storage[conn_alias] = connection
        return connection
```

使用`self._create_connection`来创建新的连接。

```python
def _create_connection(self, conn_alias: str) -> "BaseDBAsyncClient":
    db_info = self._get_db_info(conn_alias)
    if isinstance(db_info, str):
        db_info = expand_db_url(db_info)
    # 通过_discover_client_class来获取相应的client_class，client_class，有没有很熟悉？
    client_class = self._discover_client_class(db_info.get("engine", ""))
    # 认证信息放在credentials中
    db_params = db_info["credentials"].copy()
    db_params.update({"connection_name": conn_alias})
    # 一并传给数据库class
    connection: "BaseDBAsyncClient" = client_class(**db_params)
    return connection
```

```python
def _discover_client_class(self, engine: str) -> Type["BaseDBAsyncClient"]:
    # Let exception bubble up for transparency
    # 原来在这里，将`tortoise.backends.sqlite`这样的包路径import变成模块
    engine_module = importlib.import_module(engine)
    try:
        # 如果在这个包中，有`client_class`，那么就返回这个`client_class`
        client_class = engine_module.client_class
    except AttributeError:
        raise ConfigurationError(f'Backend for engine "{engine}" does not implement db client')
    return client_class
```

这样，也同时实现了多个数据库配置

```text
"connections": {
    "default": {
        "engine": "tortoise.backends.sqlite",
        "credentials": {"file_path": "example.sqlite3"},
    },
    "db2": {
        "engine": "tortoise.backends.mysql",
        "credentials": {},
    }
}
```
通过`connections.get('default')`或者`connections.get('db2')`，就可以获取到不同的数据库连接。

#### 实现抽象类BaseDBAsyncClient

所有的数据库都继承自`BaseDBAsyncClient`，这个类是一个抽象类，不能直接使用，而是需要子类来实现。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220614155638.png)

只需要按照它的约束，实现必要的方法，就可以开发自己的数据库连接。

### 自己实现一个动态导入的数据模型

TODO
