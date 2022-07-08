---
# 这是文章的标题
title: django优雅的实现软删除，支持Admin和DRF的软删除
shortTitle: django软删除
# 这是页面的图标
icon: django
# 这是侧边栏的顺序
order: 2
# 设置写作时间
date: 2022-07-08
# 一个页面可以有多个分类
category:
- django
- python
# 一个页面可以有多个标签
tag:
- drf
- admin
- soft-delete
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

## 何为软删除
当你想对数据进行删除的时候，如果使用物理删除，那么数据真的消失了。使用软删除，可以让数据保留，但是不会被真的删除。只是在字段上设置了一个值，表示数据已经被删除。

## 需要解决的问题

- DRF
  - 暴露DELETE方法一旦被执行，就需要操作软删除，把`is_deleted`字段设置为True。
  - 同样的，DRF对外操作的其他接口，如查询，修改操作，就不允许找到已经软删除的数据。
- 自带的Admin
  - 既然是超级管理后台，那么就允许操作任何数据，包括已经软删除的，而不是列表找不到软删除的数据。
  - 后台执行删除操作的时候，实际上是对数据进行软删除。

简而言之：
1. drf找不到删除的数据，admin需要全部数据
2. drf和admin删除数据都是软删除

## 解决方案

### DRF

Django Manager 赋予了 Django的模型(Model)中操作数据库的能力。如果你还未能了解Manager，可以先去官方文档[^first]查阅。

::: tip
其实你在项目中无时不刻不在使用Manager，还记得objects吗？也就是如：`Book.objects.all()`中的objects。有没有想过它到底是什么？
:::

显然，默认的模型Manager并不能解决我们的问题，所以我们需要自定义模型的Manager。

```python
class ModelManager(models.Manager):
    # 重写get_queryset方法
    def get_queryset(self):
        # 查询出所有的数据，但是不包括软删除的数据
        return super().get_queryset().filter(is_deleted=False)
```
这样，最简单的自定义模型Manager就完成了。我们需要把它挂载到需要的模型上。

我们格局打开，将拥有`is_deleted`属性的模型抽离成`抽象模型基类`，凡是继承此类的都自带这个Manager。
```python
class BaseModel(models.Model):
    """
    模型基类
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        abstract = True
        ordering = ['-created_at', '-updated_at']
    # 替换默认的objects
    objects = ModelManager()
```
不仅如此，刚刚只是过滤了软删除数据，我们还需要将接口删除的操作，进行软删除，而不是真删除。

使用DRF操作删除实际上调用的是`mixins.DestroyModelMixin`的`destroy`方法，具体执行删除的方法是`perform_destroy`。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220708113625.png)

所以下一步我们需要重写这个`perform_destroy`方法。

回到视图层(views)，重写：

```python
# views.py
class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save(update_fields=['is_deleted'])
```

OK，在DRF层面上，我们解决了软删除的处理。即：
1. drf找不到删除的数据
2. drf执行删除是软删除

### Admin

首先再刚刚代码基础上，我们启用Admin，进入后台看看效果。

可以发现，由于模型Manager的加持，直接把`is_deleted`的数据一并过滤了。但是我们并不想如此。

所以第一反应，就是去注册模型的地方，重写模型的查询。
```python
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    pass
```
这是原来的模型注册，笔者进入`admin.ModelAdmin`中翻阅源码，发现`get_queryset`方法是执行获取查询的，那么把它重写了。

那……应该重写成什么？由于我们已经在模型层通过Manager直接改变了最初的数据过滤后的样子，这里怎么重写也是无事于补的。

于是我在想，那就在定义一个模型管理器，在Admin中使用这个管理器不就好了？

```python
class ModelAdminManager(models.Manager):
    pass

class BaseModel(models.Model):
    ...

    objects = ModelManager()
    objects_all = ModelAdminManager()
    # 如果仅仅是空的Manager， 可以直接写成objects_all = models.Manager()
```
回到Admin注册中，重写`get_queryset`：

```python
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):

    def get_queryset(self, request):
        return Book.objects_all.all()
```

剩下最后一个问题，在admin后台执行删除的时候，是软删除。当下如果执行删除是真正的物理删除数据。

此时问题就变得简单，Manager进阶用法中，可以自定义其`QuerySet`[^second]
```python
class DeleteQuerySet(models.QuerySet):
    def delete(self):
        self.update(is_deleted=True)

# 修改原来的objects_all
class BaseModel(models.Model):
    ...

    objects = ModelManager()
    # objects_all = ModelAdminManager.from_queryset(DeleteQuerySet)()
    # or
    objects_all = models.Manager.from_queryset(DeleteQuerySet)()
```

改完后在admin进行删除操作：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220708130734.png)

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220708130752.png)

OK，在Admin层面上，我们解决了软删除的处理。即：
1. admin能够展示被软删除的数据
2. admin执行删除是软删除

## 完整代码：

::: code-tabs#admin.py

@tab admin.py

```python
from apps.book.models import Book


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):

    list_display = ('title', 'is_deleted')

    def get_queryset(self, request):
        return Book.objects_all.all()
```

@tab models.py
```python
from django.db import models


# Create your models here.
class DeleteQuerySet(models.QuerySet):
    def delete(self):
        self.update(is_deleted=True)


class ModelManager(models.Manager):
    _queryset_class = DeleteQuerySet

    def get_queryset(self):
        return self._queryset_class(
            model=self.model, using=self._db, hints=self._hints
        ).filter(is_deleted=False)


class ModelAdminManager(models.Manager):
    pass
    # _queryset_class = DeleteQuerySet


class BaseModel(models.Model):
    """
    BaseModel
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False, verbose_name='软删除')

    class Meta:
        abstract = True
        ordering = ['-created_at', '-updated_at']

    objects = ModelManager()
    # objects_all = ModelAdminManager.from_queryset(DeleteQuerySet)()
    objects_all = models.Manager.from_queryset(DeleteQuerySet)()
```

@tab views.py
```python
from rest_framework.viewsets import ModelViewSet


class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save(update_fields=['is_deleted'])
```
:::
## 参考：

[^first]: [Manager](https://docs.djangoproject.com/zh-hans/4.0/topics/db/managers/)
[^second]: [Manager QuerySet](https://docs.djangoproject.com/zh-hans/4.0/topics/db/managers/#from-queryset)
