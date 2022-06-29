---
# 这是文章的标题
title: DRF源码学习-Permission
# 这是页面的图标
icon: django
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
### 权限组件Permission
> A base class from which all permission classes should inherit..
所有权限类都应该继承的基类。
—— 来自BasePermission类注释
<!--more-->

与认证组件相同，自定义权限也需要继承自内置父类BasePermission

#### 1.BasePermission
![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220607221809.png)

BasePermission中有两个方法：

- has_permission
    - 顾名思义，是否有权限，返回True or False来判断是否有权限
- has_object_permission
    - has_permission是请求进来就检测权限了，而has_object_permission则是在取对象的时候判断是否该对象有操作权限

### 2.编写自己的权限认证

```python
class MyPermission(BasePermission):
    message = '你没有此权限~~~'

    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        return False


class TestView(APIView):
    permission_classes = [MyPermission]

    def get(self, request):
        return JsonResponse({"result": "success"})
```

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220607221836.png)

### 3.权限组件原理

上文认证组件中，由于子类APIView重写了父类View的`dispath`，所以，当认证组件通过后，将会来到权限的校验，在源码中得到印证。
![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220607221915.png)

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220607221931.png)

通过两篇认证和权限组件的源码实现，其实可以发现真正的逻辑十分清晰和简单，以后在自己做项目甚至框架的过程中值得学习与参考。
