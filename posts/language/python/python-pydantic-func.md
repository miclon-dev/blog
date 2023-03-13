---
title: pydantic的高阶玩法
shortTitle: pydantic的高阶玩法
icon: python
order: 1
date: 2023-03-13
category:
- python
tag:
- pydantic
sticky: true
star: true
isOriginal: true
---


`pydantic`是一个Python的数据验证和转换库，它的特点是轻量、快速、可扩展、可配置。笔者常用的用于数据接口schema定义与检查。

具体的基本用法本文不再做过多的介绍，可以参考[pydantic官方文档](https://docs.pydantic.dev/)。本文主要是结合实际项目开发中遇到的问题和解题思路，介绍一些`pydantic`的高阶玩法。


## 当前现状

在项目中，`pydantic`的定义是在数据的出口进行规范化，从而使得下游接受方能更快地去解析和清洗这些数据。

```python
from pydantic import BaseModel, Field

# 定义数据模型
class Project(BaseModel):
    url: str = Field(...)
    title: str = Field(...)
    content: str = Field(...)
    company: List[Dict] = Field(default=[])
    industry: str = Field(...)
```

以上是简单的一个数据模型定义，代码仅为示例，隐去了一些字段和配置。也就是我们必须传输给`Project`模型对应的数据才可以通过它的数据校验，否则就无法继续向下（可能是发往下游）

这么做一直以来没什么问题，直到本次项目中的接口返回出现了大更新，使得之前的所有代码层做的数据字段映射必须重新对应匹配。

比如之前`title`字段对应的是`title`，现在变成了`detail`-`article`-`title`。

这使得我们必须在代码层做诸如：
  
  ```python
  # project_data均为接口返回的数据，加数据演示

  # 之前的代码
  project_data = {
      "url": "https://www.baidu.com",
      "title": "百度一下，你就知道",
  }
  project = Project(
      **project_data
  )

  # 现在的代码
  project_data = {
    "detail": {
        "url": "xxx"
        "article": {
            "title": "项目标题",
        }
    }
  }
  project = Project(
      url=project_data["detail"]["url"],
      title=project_data["detail"]["article"]["title"],
  )

  ```

以上代码取值变得复杂，这还没考虑到数据可能存在出错的问题，比如`detail`字段不存在，这样就会导致`KeyError`异常。

而且这并不是夸张的举例（因为事实情况更复杂）。

我怎么能容忍这种情况呢？

## 解决方案

我当然不是想摒弃掉`pydantic`，而是想找到一种结合它更优雅的方式来解决这个问题。

于是我第一时间想到了`jmespath`模块，因为它是一个JSON查询语言，可以用来在JSON数据中查找和提取数据。

```python
from jmespath import search
project_data = {
    "detail": {
        "article": {
            "title": "项目标题",
        }
    }
}

title = search("detail.article.title", project_data)
assert title == "项目标题"  # True

# 即使是path不存在，也不会异常，而是返回None
assert search("detail.article.title1", project_data) is None  # True

```

所以我打算做一个结合`pydantic`和`jmespath`的方式来解决这个问题。

```python

class Project(BaseModel):
    url: str = Field(...)
    title: str = Field(...)
    content: str = Field(...)
    company: List[Dict] = Field(default=[])
    industry: str = Field(...)

    @root_validator(pre=True, skip_on_failure=True)
    def data_converter(cls, v):
        return {
            "url": search("detail.id", v),
            "title": search("detail.article.title", v),
            "content": search("detail.article.content", v),
            "company": search("company[*].name", v),
            "industry": search("industry", v)
        }
    
    @validator("url")
    def url_validator(cls, v):
        # 由于这里的v是拿到的ID，需要组合成url
        return f"https://xxxxx/{v}"
```

从代码中可以知道，我是在`root_validator`中提前做了数据的转换，将`jmespath`的查询结果赋值给对应的字段。

但是做完之后我越看越变扭，我为了做这个事情，先要申明所有字段，还要对这些字段一一映射。

于是，我想到了`pydantic`的`Config`类，它可以用来配置`pydantic`的一些行为。而且通过查看源码，我认为我可以通过`Field`类中输入一个path变量，告诉未来的处理器，这个path是用来做数据提取的。

```python
class Project(BaseModel):
    url: str = Field(..., path="temporaryLibrary.id")
    company_names: str = Field(..., path="company[0].enterprise.name")
    versions: List[str] = Field(..., path="versionList[*].id")
```

当然现在代码是没有任何意义的，因为`path`是我们自定义的，`pydantic`并不知道如何处理它。

所以下一步我们要做的是，如何更好的让`pydantic`知道如何处理`path`。

在多次翻阅它源代码，并结合官方文档中对[Model](https://docs.pydantic.dev/usage/models)类的介绍，我找到了一个可行的方案。


> Pydantic models can be created from arbitrary class instances to support models that map to ORM objects.

也就是说，我可以将原始数据通过`from_orm`传递给`pydantic`的模型，然后通过`Data binding`的方式，将数据绑定到模型中。`Data binding`允许我们自定义数据的取值来源。

```python
class ProjectGetter(GetterDict):

    def get(self, key: str, default: Any) -> Any:  # noqa
        # 由于getter_dict所能拿到的“数据权限”相对较低，也就是它的权限仅仅是处理数据，而不是处理模型，所以我们需要自己去拿到模型，然后再去拿到path
        model, data = self._obj['model'], self._obj['data']
        for name, field in model.__fields__.items():
            path = field.field_info.extra.get('path')
            if path and name == key:
                return search(path, data)
        return default


class Project(BaseModel):
    url: str = Field(..., path="detail.id")
    company_names: str = Field(..., path="company[0].enterprise.name")
    versions: List[str] = Field(..., path="versionList[*].id")

    @validator("url")
    def url_validator(cls, v):
        return f"https://www.baidu.com/{v}"

    class Config:
        # 通过orm_mode指定数据的来源
        orm_mode = True
        # 通过getter_dict指定数据的获取方式
        getter_dict = ProjectGetter

project_data = {
    "detail": {
        "id": 1,
        "article": {
            "title": "项目标题",
        }
    },
    "company": [
      {
        "enterprise": {
          "name": "企业名称1"
        }
      },
      {
        "enterprise": {
          "name": "企业名称2"
        }
      }
    ],
    "versionList": [{"id": "1.0"}, {"id": "2.0"}]
}
project = Project.from_orm({"model": Project, "data": project_data})
print(project)
# url='https://www.baidu.com/1' company_names='企业名称1' versions=['1.0', '2.0']
```

这样我们在业务端，只需要对Field指定其对应数据提取的`path`，而不需要再去写一堆的`validator`或者是在数据进入前做一堆的数据转换。


## 总结

通过这个小例子，我们可以看到，`pydantic`的灵活性是非常强的，它可以通过`Config`类来配置一些行为，而且它的`Field`类也可以通过`extra`参数来传递一些额外的信息。这大大的提高了我们的对数据的处理能力。笔者也会在后续的文章中，继续分享`pydantic`的一些使用技巧。
