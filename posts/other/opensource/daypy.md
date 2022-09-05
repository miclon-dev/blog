---
title: Daypy模块开发文档
icon: python
order: 1
date: 2022-09-01
category:
- python
- opensource
- docs
tag:
- pip
- package
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

# DayPy模块开发文档

`daypy`是使用`arrow`为基础，开发的一个插件式的时间解析模块。模块的命名及设计模式参考了`daypy`(JavaScript下的时间处理模块)。

## 安装

> pip install daypy -U

## 解析

### 当前时间

直接调用`daypy()`即可返回当前日期的DayPy对象，如下：

```python
daypy()
# <Daypy 2022-09-01 15:03:02.065222>
```

### 字符串

解析传入的 ISO 8601格式的字符串并返回一个 Daypy 对象实例。
```python
daypy('2018-04-04T16:00:00.000Z')
# <Daypy 2018-04-04T16:00:00+08:00>
```

### 字符串+格式
如果知道输入字符串的格式，您可以用它来解析日期。
```python
daypy("12-25-1995", "MM-DD-YYYY")
# <Daypy 1995-12-25T00:00:00+08:00>
```

### 中文日期字符串
::: warning
此功能需要启用`zh_support`插件
:::
如果传入值是中文字符串的格式，可以启用`zh_support`插件来解析。
```python
daypy.extend('zh_support')
daypy("2021年9月1日")
# <Daypy 2021-09-01T00:00:00+08:00>
```

### Unix 时间戳 (毫秒)

解析传入的一个 Unix 时间戳 (13 位数字，从1970年1月1日 UTC 午夜开始所经过的毫秒数) 创建一个 Daypy 对象。
```python
daypy(1318781876406)
# <Daypy 2011-10-17T00:17:56.406000+08:00>
```

::: tip
传递的参数必须是一个数字
:::

### Unix 时间戳 (秒)
解析传入的一个 Unix 时间戳 (10 位数字，从1970年1月1日 Utc 午夜开始所经过的秒数) 创建一个 Daypy 对象。
```python
daypy.unix(1318781876)
# <Daypy 2011-10-17T00:17:56+08:00>
```
时间戳里的小数点后面的秒也会被解析。
```python
daypy.unix(1318781876.721)
# <Daypy 2011-10-17T00:17:56.721000+08:00>
```

### datetime对象
使用原生 Python datetime 对象创建一个 Daypy 对象。
```python
d = datetime.datetime.now()
daypy(d)
# <Daypy 2022-09-05T16:56:12.783021+08:00>
```

### 字典
::: warning
此功能需要启用`dict_support`插件
:::

您可以传入包含单位和数值的一个对象来创建 Daypy 对象。
```python
daypy.extend('dict_support')
daypy({
        "year": 1999,
        "month": 11,
        "day": 10,
        "hour": 10,
        "minute": 24,
        "second": 59
    }).format()
# 1999-11-10 10:24:59+08:00
daypy({"y": 1999, "M": 11, "d": 10, "h": 10, "m": 24, "s": 59}).format()
# 1999-11-10 10:24:59+08:00
```
- 日期单位支持简写。
- `daypy({})`会返回当前时间。

### 数组
::: warning
此功能需要启用`array_support`插件
:::

您可以传入一个数组来创建一个 Daypy 对象，数组和结构和 datetime参数 十分类似。
```python
daypy.extend('array_support')
daypy([1999, 11, 10, 10, 24, 59]).format()
# 1999-11-10 10:24:59+08:00
```
- `daypy([])`会返回当前时间。

### 克隆Daypy

克隆一个 Daypy 对象。
```python
d = daypy()
d2 = d.clone()
id(d) # 4316446048
id(d2)  # 4316095296
```

## 取值/赋值

在设计上 Daypy 的 getter 和 setter 使用了相同的 API，也就是说，不传参数调用方法即为 getter，调用并传入参数为 setter。
```python
daypy().year() # 2022
daypy().year(2023) # <Daypy 2023-09-05T17:17:45.865194+08:00>
```

### 微秒

```python
daypy().microsecond() # 184859
daypy().microsecond(999999)
```

### 秒

```python
daypy().second() # 45
daypy().second(59)
```

### 分钟

```python
daypy().minute() # 17
daypy().minute(59)
```

### 小时

```python
daypy().hour() # 17
daypy().hour(23)
```

### 日期

```python
daypy().day() # 5
daypy().day(10)
```

### get

从 Daypy 对象中获取相应信息的 getter。

各个传入的单位对大小写不敏感，支持缩写和复数。 请注意，缩写是区分大小写的。
```python
daypy().get('year')
daypy().get('month')
daypy().get('date')
daypy().get('hour')
daypy().get('minute')
daypy().get('second')
daypy().get('microsecond')
```

### set

通用的 setter，两个参数分别是要更新的单位和数值，调用后会返回一个修改后的新实例。

```python
daypy().set('day', 1).set('month', 3).set('second', 30)
# <Daypy 2022-03-01T22:07:30.520246+08:00>
```

## 操作

### 增加
返回增加一定时间的复制的 Daypy 对象。

```python
daypy().add(7, 'day')
# <Daypy 2022-09-12T17:17:45.865194+08:00>
```

各个传入的单位对大小写不敏感，支持缩写和复数。 请注意，缩写是区分大小写的。

### 减去
返回减去一定时间的复制的 Daypy 对象。

```python
daypy().subtract(7, 'year')
# <Daypy 2015-09-05T22:11:02.994743+08:00>
```

### 从某时间开始

返回复制的 Daypy 对象，并设置到一个时间的开始。

```python
daypy().start_of('year')
# <Daypy 2022-01-01T00:00:00+08:00>
```

### 从某时间结束

返回复制的 Daypy 对象，并设置到一个时间的结束。

```python
daypy().end_of('month')
# <Daypy 2022-09-30T23:59:59.999999+08:00>
```

## 格式化

### 转数组
::: warning
此功能需要启用`to`插件
:::
```python
daypy.extend("to")
daypy().to_array()
# [2022, 9, 5, 17, 17, 45, 865194]
```

### 转字典
::: warning
此功能需要启用`to`插件
:::
```python
daypy.extend("to")
daypy().to_dict()
# {'year': 2022, 'month': 9, 'day': 5, 'hour': 17, 'minute': 17, 'second': 45, 'microsecond': 865194}
```

## 查询

### 之前

这表示 Daypy 对象是否在另一个提供的日期时间之前。

```python
daypy().is_before(daypy().add(1, 'day'))
# True
```
如果想使用除了微秒以外的单位进行比较，则将单位作为第二个参数传入。

```python
daypy().is_before("2011-10-10", 'year')
# False
```

### 相同

这表示 Daypy 对象是否与另一个提供的日期时间相同。

```python
daypy("2011-11-11").is_same("2011-11-11")
# True
```

### 之后

这表示 Daypy 对象是否在另一个提供的日期时间之后。

```python
daypy().is_after(daypy().subtract(1, 'day'))
# True
```

### 之间

这表示 Daypy 对象是否在另一个提供的日期时间之间。

```python
daypy().is_between(daypy().subtract(1, 'day'), daypy().add(1, 'day'))
# True
```

第四个参数是区间表达式：
- '()' 不包含开始和结束的日期 (默认)
- '[]' 包含开始和结束的日期
- '[)' 包含开始日期但不包含结束日期
