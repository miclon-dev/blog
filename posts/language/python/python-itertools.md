---
# 这是文章的标题
title: 内置模块-itertools
# 这是页面的图标
icon: python
# 这是侧边栏的顺序
order: 1
# 设置写作时间
date: 2022-06-16
# 一个页面可以有多个分类
category:
- python
tag:
- itertools
isOriginal: true
---

### itertools.dropwhile

- 说明

> 提供两个参数，第一个是函数或lambda，第二个是序列。

> 当函数中返回False时，停止迭代。并抛弃之前的元素，返回剩余的元素。
    
    itertools.dropwhile(predicate, iterable)

- 案例

我有一段代码文本或者一批代码文件，我需要删除代码文本中头部的注释，但是要保留代码中的注释。

```python
import itertools

text: str = """# this is comments 
# this is comments 
# this is comments 
# this is comments
class Test:
    # this is code comments
    pass
"""

print("\n".join(itertools.dropwhile(lambda x: x.startswith("#"), text.split("\n"))))
```
输出：
```text
class Test:
    # this is code comments
    pass
```

### itertools.takewhile

- 说明
> 提供两个参数，第一个是函数或lambda，第二个是序列。

> 与`dropwhile`相反，当函数中返回False时，停止迭代。并保留之前的元素并返回。

还是相同的案例，以上代码改成takewhile后
```python
import itertools

text: str = """# this is comments 
# this is comments 
# this is comments 
# this is comments
class Test:
    # this is code comments
    pass
"""

print("\n".join(itertools.takewhile(lambda x: x.startswith("#"), text.split("\n"))))
```
输出：
```text
# this is comments 
# this is comments 
# this is comments 
# this is comments
```
也就是`dropwhile`取了个反。联合使用`takewhile`和`dropwhile`，输出全部文本。
```python
print("\n".join(itertools.takewhile(lambda x: x.startswith("#"), lines)))
print("*" * 50)
print("\n".join(itertools.dropwhile(lambda x: x.startswith("#"), text.split("\n"))))
```
输出：
```text
# this is comments 
# this is comments 
# this is comments 
# this is comments
**************************************************
class Test:
    # this is code comments
    pass
```

### itertools.groupby

- 说明

> 从迭代器中按照某个条件分组。
    
    itertools.groupby(iterable, key=lambda x: x[1])

- 案例

我有一串元祖类型的列表，我需要把列表中的元素按照元祖的第二个元素分组。

```python
lst = [("a", 5, 6), ("b", 2, 4), ("a", 2, 5), ("c", 2, 6)]
groups = itertools.groupby(lst, key=lambda x: x[1])
for key, group in groups:
    print(key, list(group))
```
输出：
```text
5 [('a', 5, 6)]
2 [('b', 2, 4), ('a', 2, 5), ('c', 2, 6)]
```
可以看出，它按列表中元祖第二个元素分组。
但是！小心陷阱，我尝试把列表中第三个元祖中的2改成3试试：
```python
lst = [("a", 5, 6), ("b", 2, 4), ("a", 3, 5), ("c", 2, 6)]
groups = itertools.groupby(lst, key=lambda x: x[1])
for key, group in groups:
    print(key, list(group))
```
输出：
```text
5 [('a', 5, 6)]
2 [('b', 2, 4)]
3 [('a', 3, 5)]
2 [('c', 2, 6)]
```
分组失效了~，也就是groupby只能对**连续的**元素进行分组。

### itertools.islice

- 说明

其作用等同于数组切片

```python
lst = list(range(0, 20))

print(lst[:3], list(itertools.islice(lst, 3)), sep="=")
print(lst[3:7], list(itertools.islice(lst, 3, 7)), sep="=")
print(lst[3:18:3], list(itertools.islice(lst, 3, 18, 3)), sep="=")
```
输出：
```text
[0, 1, 2]=[0, 1, 2]
[3, 4, 5, 6]=[3, 4, 5, 6]
[3, 6, 9, 12, 15]=[3, 6, 9, 12, 15]
```

### itertools.zip_longest

- 说明

与内置函数`zip`不同的是，`zip_longest`可以把指定的元素填充到最短的列表中。

    itertools.zip_longest(iterable1, iterable2, fillvalue=None)

- 案例

```python
a = [i for i in range(10)]
b = ["a", "b", "c", "d", "e", "f", "g"]
print(dict(zip(a, b)))
print(dict(itertools.zip_longest(a, b, fillvalue="值呢？")))
```
输出：
```text
{0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g'}
{0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: '值呢？', 8: '值呢？', 9: '值呢？'}
```

### tertools.product

- 说明

此函数允许您迭代可迭代列表的笛卡尔积。

- 案例

你是否有写过这样的代码？
```python
for x in range(10):
    for y in range(10):
        print(x, y)
```
如果还有一个z，那么这个代码就变成了：
```python
for x in range(10):
    for y in range(10):
        for z in range(10):
            print(x, y, z)
```
使用`itertools.product`可以很方便的实现这个功能。
```python
for x, y in itertools.product(range(10), range(10)):
    print(x, y)
```
当然它支持*解包
```python
its = [range(10)] * 3
for x, y, z in itertools.product(*its):
    print(x, y, z)
```

### itertools.count

- 说明

它可以生成无限的数字序列，似乎看起来有点像`range`。

```python
for number in itertools.count(start=10, step=4):
    print(number)
    if number > 20:
        break
```
输出：
```text
10
14
18
22
```

### itertools.repeat

    itertools.repeat(obj, times=None)

- 说明

    可以重复生成指定的对象。
```python
for i in itertools.repeat("hello", 3):
    print(i)
```
emmm...以上代码或许可以写成："hello" * 3


### itertools.accumulate

    itertools.accumulate(iterable, func=operator.add)

    可以将一个序列的元素累加。

- 说明

```python
lst = [1, 2, 3, 4, 5]
print(list(itertools.accumulate(lst)))
```
输出：
```text
[1, 3, 6, 10, 15]
```
你也可以指定func来累加其他类型的数据。
```python
lst = [1, 2, 3, 4, 5]
print(list(itertools.accumulate(lst, func=lambda x, y: x * y)))
# or
print(list(itertools.accumulate(lst, func=operator.mul)))
```
输出：
```text
[1, 2, 6, 24, 120]
[1, 2, 6, 24, 120]
```

### itertools.cycle

    itertools.cycle(iterable)

    生成无限循环的序列。

```python
for i in itertools.cycle("abc"):
    print(i)
>>> a b c a b c a……
```

### itertools.permutations

    itertools.permutations(iterable, r=None)

    生成一个序列的全排列，也就是所有可能的组合。

```python
a = [1, 2, 3]
list(itertools.permutations(a))
```
输出：
```text
[(1, 2, 3), (1, 3, 2), (2, 1, 3), (2, 3, 1), (3, 1, 2), (3, 2, 1)]
```
```python
a = [1, 2, 3]
list(itertools.permutations(a, 2))
```
输出：
```text
[(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]
```
如果当你的列表存在重复的项
```python
a = [1, 2, 1]
list(itertools.permutations(a))
```
输出：
```text
[(1, 2, 1), (1, 1, 2), (2, 1, 1), (2, 1, 1), (1, 1, 2), (1, 2, 1)]
```
可以使用set来去重
```python
a = [1, 2, 1]
set(itertools.permutations(a))
```
输出：
```text
{(1, 2, 1), (2, 1, 1), (1, 1, 2)}
```

### itertools.chain

        itertools.chain(*iterables)
    
        将多个序列合并成一个序列。

```python
a = [1, 2, 3]
b = [4, 5, 6]
c = [7, 8, 9]
list(itertools.chain(a, b, c))
```
输出：
```text
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```
