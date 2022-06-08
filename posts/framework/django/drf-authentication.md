---
# 这是文章的标题
title: DRF源码学习-Authentication
# 这是页面的图标
icon: python
# 这是侧边栏的顺序
order: 2
# 设置写作时间
date: 2022-01-31
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
---
### 认证组件Authentication

> All authentication classes should extend BaseAuthentication.
所有认证类都应该继承于BaseAuthentication
—— 来自BaseAuthentication类注释

<!--more-->
#### 1.BaseAuthentication
![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220607222145.png)

BaseAuthentication为认证类的基类，其中有两个方法：
- authenticate
  - 这个方法必须被子类实现，用于检测认证是否通过，且必须返回元祖(user, token)，值得注意的一点，当方法返回None的时候会跳过此验证，继续下一个验证，如果想认证不通过，则需要抛出AuthenticationFailed异常。
- authenticate_header
  - 这个方法子类也可以不去覆盖，默认情况下，当授权未通过，展示返回headers中key为**WWW-Authenticate**的value

#### 2.编写自己的认证组件

在这里我直接最简易的判断header来检测认证
```python
class MyAuthentication(BaseAuthentication):
    # 实现父类中的authenticate方法
    def authenticate(self, request):
        if request.META.get("HTTP_AUTHORIZATION") == 'miclon':
            return (None, None)
        raise AuthenticationFailed('认证不通过')
        
    def authenticate_header(self, request):
        return "get out"
```

当启用header的时候：
![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220607222244.png)
当关闭此header的时候：
![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220607222301.png)
同时可以在返回header中观察到：
![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220607222314.png)

#### 3.认证组件原理

在APIView类中，认证组件读取Django设置项中`DEFAULT_AUTHENTICATION_CLASSES`的列表作为默认认证类
```python
class APIView(View):
	……
	authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    ……
```
所以，当继承APIView的子类，使用覆盖`authentication_classes`的方式，即可自定义该子类的认证类

```python
class TestView(APIView):
    authentication_classes = [MyAuthentication]

    def get(self, request):
        return JsonResponse({"result": "success"})
```
又由于APIView是继承自Django的View，Django的View是由`dispatch`方法来调度的，APIView重写了此方法，在初始化获取request实例的时候，将子类中所有的认证类传递给Request类

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220607222331.png)

来看看Request类干了什么事。
![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220607222353.png)
不难看出，它for循环遍历了所有认证组件，分别去执行其中的`authenticate`方法，当出现APIException异常的时候抛出错误。
再回过头看看，当我们认证不允许通过的时候，抛出**AuthenticationFailed**的异常，而它实际上是继承自APIException，且覆盖了出错的状态码为401
![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220607222408.png)

以上就是针对DjangoRestFramework中认证组件的简要解读。
