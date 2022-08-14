---
# 这是文章的标题
title: DRF源码学习-Throttling
# 这是页面的图标
icon: django
# 这是侧边栏的顺序
order: 3
# 设置写作时间
date: 2021-08-29
# 一个页面可以有多个分类
category:
- django
- python
# 一个页面可以有多个标签
tag:
- drf
- 源码学习
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

### 何为节流
节流，字面意思就是限制访问者的频率。一旦访问者超出设定频率，就会出现访问频繁限制。

### 如何节流
节流应该是针对发送请求的对象来准备的，不可能因为网站总的次数超限而去限制所有用户。所以要分为登录用户和未登录用户。

- 未登录：拿不到用户名，其标识就是访问者的IP地址
- 已登录：拿得到用户名，其标志就是其登录的用户名

接下来就是使用django内置的节流组件，来进行不同用户等级的节流

### 核心实现逻辑
![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220608222234.png)

### 自己实现节流组件
得益于drf内置的SimpleRateThrottle，可以很快做一个属于自己的节流
```python
from rest_framework.throttling import BaseThrottle, SimpleRateThrottle


# 针对匿名访客
class VisitThrottle(SimpleRateThrottle):
    scope = "anonymous"

    def get_cache_key(self, request, view):
        return self.get_ident(request)


# 针对用户
class UserThrottle(SimpleRateThrottle):
    scope = "user"

    def get_cache_key(self, request, view):
        return request.user.username

```
settings文件，对每个规则，指定不同的频率。匿名一分钟5次，登录一分钟10次
```python
REST_FRAMEWORK = {
    "DEFAULT_THROTTLE_CLASSES": ["utils.throttle.UserThrottle"],
    "DEFAULT_THROTTLE_RATES": {
        "anonymous": '5/m',
        "user": '10/m',
    }
}
```

- 当未登录情况去访问，第六次的时候就提示超限。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220608222255.png)

- 当已登录情况去访问，第十一次的时候就提示超限。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220608222309.png)
