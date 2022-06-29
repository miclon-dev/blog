---
title: Effective Python：编写高质量Python代码的90个有效方法（原书第2版）
icon: read
order: 2
author: MicLon
date: 2022-06-09
category:
- 阅读笔记
tag:
- python
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
---

# 编写高质量Python代码的90个有效方法（原书第2版）

### 方法1 使用Python3

不要再用Python 2做开发了，应该用Python 3开发项目。

### 方法2 遵循PEP 8

遵循PEP 8的编码风格
- 命名
  - 函数、变量、属性使用小写字母，单词直接下划线连接
  - 受保护的实例属性使用单下划线开头
  - 私有的实例属性使用两个下划线开头
  - 类名使用每个单词首字母大写
  - 常量使用大写字母
- 表达式
  - python会把空值视为False，所以判断的时候不要通过`if len(somelist)== 0`而是应该采用`if not somelist`
  - 不要把`if` `for` `while`等复合语句放在一行，如果一行太长，应使用括号，而不是`\`来分行
- 引入
  - import永远在文件开头
  - 引入模块应当为绝对名称，不可以使用相对名称
  - 引入A包的B模块，应当写：from A import B，而不是import A
  - 引入模块应当按顺序引入，标准库应当放在最前面，接下来是第三方库，自定义应当放在最后面

总结： 使用Pycharm `reformat code`，按照PEP 8的编码风格，编写Python代码。

### 方法3 bytes和str

- bytes和str不能在操作符上混用，如（> < + %）。
- 文件中读取/写入二进制应当使用`rb`/`wb`
- 如果需要读取/写入Unicode数据，必须`encoding`指定编码

### 方法4 f-string

- python中拒绝使用C风格的%操作符拼接字符串，缺点诸多且繁琐。
- str.format 一样不是最佳实践
- f-string 是最佳实践
```python
key = 'my_key'
value = 12.345
print(f'{key} = {value}') 
# my_key = 12.345
print(f'{key} = {value:.2f}')
# my_key = 12.35
```
使用f-string同其他方式相比：

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220609231550.png)

### 方法5 辅助函数

- 不要把复杂的逻辑硬凑一行显得高级(反人类)。
- 重复且复杂的表达式应当封装辅助函数
- 使用if/else表达式会比使用or and更容易读懂
- Don't Repeat Yourself（DRY）

### 方法6 拆分unpacking

当你有一个元祖，它长这个样子
```python
item = ('tom', 'jerry', 'bob')
first = item[0]
second = item[1]
print(first, second) # tom jerry
```
直接使用数组下标来访问元素，会比较麻烦，而且具有风险。

可以使用unpacking来访问元素，这样就不需要使用数组下标了。
```python
item = ('tom', 'jerry', 'bob')
first, second, third = item
print(first, second, third) # tom jerry bob
```
- 凡是可迭代的对象，都可以被unpacking
- 尽量通过unpacking来拆分元素，而不是使用数组下标

### 方法7 enumerate取代range

当你想要遍历一个列表，但是还需要知道它的index的时候，使用enumerate
enumerate可以把任何迭代器封装成懒生成器，通过内置next函数手动推进
```python
# enumerate(iterable, start=0)
# start参数可以指定起始index，默认0

for index, item in enumerate(['a', 'b', 'c'], 1):
    print(index, item)
```

### 方法8 zip函数

- zip函数可以把多个迭代器合并成一个迭代器
- 多个迭代器的长度不一致，那么只要其中任何一个迭代完毕，zip就会停止
- 按最长的那个迭代器来遍历，那就改用内置的itertools模块中的zip_longest函数

### 方法9 不在循环后面写else

- 只有在整个循环没有因为break提前跳出的情况下，else块才会执行。
- 很容易让人不理解代码的意思。

### 方法10 海象操作符:=

- 为了缩减代码
- 降低变量的权重
- 在表达式中使用需要加括号

### 方法11 序列切片

- 如果从头开始选取，就省略起始下标0；如果选到序列末尾，就省略终止下标。
- 切片可以下标越界

### 方法12 序列切片同时不要指定进步

切片除了`list[start:end]`之外，还可以使用`list[start:end:step]`
在python中常见的字符串反转`list[::-1]`，又或者每隔一个选一个`list[::2]`

笔者建议使用一行代码实现进步，一行代码实现切割。

### 方法13 使用带星的unpacking


```python
ages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
first = ages[0]
second = ages[1]
other = ages[2:]
```
以上代码明确指定了first和second，列表剩余的赋给other。

进行unpacking优化
```python
ages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
first, second, *other = ages
*other, last = ages
```
这种带星的可以在任意位置，python会根据给出的参数个数来决定unpacking的位置。

### 方法14 sort排序

- 内置的sort方法是根据自然顺序给内置的类型进行排序
- 通过key参数可以指定排序的规则
  - `list.sort(key=lambda x: x[1])`
- 当排序的指标有多个项，可以放元祖中，然后指定key参数
  - `list.sort(key=lambda x: (x[0], x[1]))`
- 当排序的指标有多个项，其中元素支持一元减操作，可以单独给其取反
  - `list.sort(key=lambda x: (-x[0], x[1]))`
- 如果不支持，可以分开多次调用sort，越优先的越往后调用

### 方法15 不依赖给字典添加键值对的顺序

- 3.7开始，dict的键值对排序是按照插入字典序排序的
- 在py中有很多近似Dict的数据类型，不能确保键值对的顺序和内置Dict一样

### 方法16 使用get处理字典的键值对

{{ 1+1 }}
