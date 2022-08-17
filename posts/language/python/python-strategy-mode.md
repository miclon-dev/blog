---
title: python策略模式场景
shortTitle: python策略模式
icon: python
order: 3
date: 2022-08-17
category:
- python
tag:
- strategy
- design mode
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

## 什么是策略模式？

在Python中，除了上次介绍的工厂模式，还有一种应用广泛的设计模式，即策略模式。策略模式就是一个策略类，它可以用相同的接口来调用不同的策略类，从而实现不同策略下的算法。

策略模式一般由三个部分组成：
- `Context`：上下文类，持有具体策略类的实例，并负责调用相关的算法
- `Strategy`：策略抽象类，用来约束一系列的策略算法（Context 使用这个接口来调用具体的策略实现算法）
- `ConcreateStrategy`：具体的策略类（继承抽象策略类）

## 何时选择策略模式？

如果一件事的行为可以在不同的环境下有不同的表现，那么就可以使用策略模式。

举个例子：

比如APP的分享，它可以是微信分享，QQ分享，微博分享，各种分享所要输出的内容不一样，所以可以使用策略模式来实现不同的分享。

再比如出门旅游，可以自驾、坐高铁、坐飞机，这种属于出行策略。

## 策略模式的应用
今天分享的策略模式应用场景是线上网购折扣场景。

日常网购各种折扣，礼金，满减等等折扣场景十分广泛，这些折扣可以用策略模式来实现。


我们遵循策略模式的三个部分来展开这次需求：

### Context
> 上下文类，持有具体策略类的实例，并负责调用相关的算法

```python
class Customer:
    """顾客类"""

    def __init__(self, name, integral, is_vip):
        self.name = name
        self.integral = integral
        self.is_vip = is_vip

    def __repr__(self):
        return self.name


class Goods:
    """商品类"""

    def __init__(self, name, price, num):
        self.name = name
        self.price = price
        self.num = num

    def total(self):
        return self.price * self.num


class Order:
    """
    订单类
    关联上用户、对应的商品、折扣策略
    通过折扣策略来计算订单的实际价格
    """

    def __init__(self, customer, promotion=None):
        """
        :param customer: 顾客对象
        :param promotion: 折扣策略对象
        """
        self.cart = []  # 购物车
        self.customer = customer  # 客户信息
        self.promotion = promotion  # 具体的折扣策略

    def add_cart(self, *good):
        """商品加入购物车"""
        self.cart += good

    def total(self):
        """计算购物车商品总价"""
        return sum(map(lambda x: x.total(), self.cart))

    def due(self):
        """计算商品具体折扣后价格"""
        if self.promotion is None:
            return self.total()
        return self.total() - self.promotion.discount(self)

    def __repr__(self):
        return f"<{self.customer} Order total:{self.total()} due:{self.due()}>"
```

### Strategy
> 策略抽象类，用来约束一系列的策略算法。

```python
class Promotion(ABC):
    """折扣策略基类"""

    def discount(self, order):
        """计算折扣后的价格"""
        raise NotImplementedError
```

未来我们具体实现的折扣策略必须是继承自Promotion的子类，并实现discount方法。

### ConcreateStrategy
> 具体的折扣策略

```python
class NoPromotion(Promotion):
    """不打折"""

    def discount(self, order):
        return 0  

class RatePromotion(Promotion):
    """按比例打折"""

    def __init__(self, rate):
        self.rate = rate

    def discount(self, order):
        return order.total() * (1 - self.rate)
```

可以观察到，我们使用`Promotion`作为子类的约束，而`RatePromotion`是具体的折扣策略。

通过`Order`类来协同消费者、商品、折扣策略，实现订单的折扣计算。

```python
# 创建三个商品
good1 = Goods('apple', 10, 1)
good2 = Goods('banana', 20, 2)
good3 = Goods('orange', 30, 3)

# 创建一个消费者
customer = Customer('米乐', 100, False)

# 将消费者和折扣绑定到订单上
order = Order(
  customer=customer, 
  promotion=RatePromotion(0.8)
)
# 将商品添加到订单中
order.add_cart(good1, good2, good3)

print(order)
# <米乐 Order total:140 due:112.0>
```

有一天领导又准备搞一个满100减10的活动，我们可以这样来实现：

```python
class FullReductionPromotion(Promotion):
    """满减"""

    def __init__(self, full, reduction):
        self.full = full
        self.reduction = reduction

    def discount(self, order):
        return order.total() // self.full * self.reduction
```

```python
order = Order(
        customer=customer,
        promotion=FullReductionPromotion(100, 10)
)
print(order)
# <米乐 Order total:140 due:130>
```

以上就是笔者对策略模式的理解及应用场景的实现。
