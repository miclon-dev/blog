---
title: 最轻量级的 Python 单元测试框架
shortTitle: doctest单元测试
icon: python
order: 1
date: 2022-11-10
category:
- python
tag:
- knowledge
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

相较于`pytest`、`unittest`等框架，`doctest`是最轻量级的单元测试框架，它的特点是：

- 无需编写测试代码，只需在文档中添加测试用例
- python内置，无需安装
- 使用学习成本超低

在编写代码时，我们可以在文档中添加测试用例，然后使用`doctest`来执行测试用例，从而验证代码的正确性。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221113220824.png)

比如我想测试`get_right`函数，它的作用是在给定一段字符串中，找出指定字符串右边的剩余字符串。

也就是上图中的`>>> get_right('abc123def', 'abc')`，它的返回值应该是`'123def'`。

```python
# string.py
if __name__ == '__main__':
    import doctest
    doctest.testmod(verbose=True)
```

你可以在文件末尾添加上述代码，然后在终端中执行`python string.py`来执行测试用例。

```text
Trying:
    get_right('abc123def', 'abc')
Expecting:
    '123def'
ok
```

由于加了verbose参数，所以会打印出测试用例的执行结果。

同样地，由于`doctest`是python内置模块，可以使用`python -m doctest`来执行测试用例。

> python -m doctest -v string_.py # -v参数表示打印测试用例的执行结果


## 运行原理

`doctest`的运行原理十分简单，首先它将会使用魔术方法`__doc__`来获取文档字符串，然后将文档字符串中的测试用例通过正则提取出来，最后执行测试用例。

![提取测试用例和预期值](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221114082622.png)


![执行测试用例](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221114082820.png)
