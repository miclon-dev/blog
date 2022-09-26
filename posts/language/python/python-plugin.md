---
title: Python程序插件的实现思路
icon: python
order: 1
date: 2022-09-26
category:
- python
tag:
- plugin
- daypy
- dayjs
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

## 前言

最近一段时间都沉浸在前端开发(CV):wink:的世界里，对Vue项目的开发有了比之前更深刻的理解，对官方指出的渐进式开发，组件化开发的思想有了实践真知。在项目中由于经常用到日期时间等格式的解析，因此接触了`dayjs`这个库，它的优点是轻量、可扩展、可配置、可定制、可本地化、可插件化，这些特性都是非常好的，因此我就想着能不能把它的插件化特性用到Python程序中，于是就有了这篇文章。

## 阅读源码

在本文中，我们不对整个dayjs做过多详细的源码解读，只是简单过一下。核心就是了解其插件机制。

`dayjs`源代码整体阅读难度不大，对于我这类js新手来说花个一两小时，配合官方文档的介绍，也可以比较轻松的阅读完。


### 下载源码

```bash
git clone https://github.com/iamkun/dayjs

cd dayjs
npm install
```


![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220926202708.png)



![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220926202933.png)

对照着官方的插件使用，这里选取了较为简单实现的`ToArray`插件来看。
```javascript
// 第一步，导入toArray插件
var toArray = require('dayjs/plugin/toArray')
// 第二步，将插件通过extend方法注册到dayjs中
dayjs.extend(toArray)
// 第三步，使用插件
dayjs('2019-01-25').toArray() // [ 2019, 0, 25, 0, 0, 0, 0 ]
```

不难发现，原本的`dayjs`对象上并没有`toArray`方法，但是通过`extend`方法注册了`toArray`插件后，`dayjs`对象上就有了`toArray`方法。

```javascript
// toArray插件的实现
export default (o, c) => {
  const proto = c.prototype
  proto.toArray = function () {
    return [
      this.$y,
      this.$M,
      this.$D,
      this.$H,
      this.$m,
      this.$s,
      this.$ms
    ]
  }
}
```
看到插件源码，可以看到其实现非常简单，就是在`dayjs`对象上挂载了一个`toArray`方法，这个方法返回了一个数组，数组中包含了`dayjs`对象的年月日时分秒毫秒等信息。

但还请容我翻译一下：

```javascript
/**
 * @param {*} o option，插件配置
 * @param {*} c dayjsClass，dayjs类
 * @returns 
 */
export default (o, c) => {
  const proto = c.prototype
  // 给dayjs类的原型添加一个toArray方法
  proto.toArray = function () {
    return [
      this.$y,
      this.$M,
      this.$D,
      this.$H,
      this.$m,
      this.$s,
      this.$ms
    ]
  }
}
```

dayjs就是利用了JavaScript的特性，将插件对象的`plugin`方法作为参数传递给`dayjs`的`extend`方法，这个`plugin`方法接收一个`dayjs`对象作为参数，然后在这个`dayjs`对象上挂载一些方法，这样就实现了插件化的功能。

## python下实现

笔者在python中最小实现以上插件化的功能。

```python
# -*- coding: utf-8 -*-
class Dayjs:
    pass


def dayjs():
    return Dayjs()


def extend(plugin, option=None):
    plugin(option, Dayjs, dayjs)


dayjs.extend = extend

if __name__ == '__main__':
    def plugin_to_array(o, c, d):
        def toArray(this):
            print('i am toArray')

        c.toArray = toArray


    dayjs.extend(plugin_to_array)
    dayjs().toArray()  # noqa
    # i am toArray
```

基于以上代码框架，可以很轻松的实现更多的插件，夸张的说，`dayjs`类中可以无任何代码，但可以通过插件实现很多功能。

比如我想获取当前时间`now`。显然，在`dayjs`中并没有`now`这个方法。但是，我们可以通过插件的方式实现。

```python
def plugin_now(o, c, d):
    def now(this):
        return datetime.now()

    c.now = now


dayjs.extend(plugin_now)
dayjs().now()
# 2022-09-26 21:08:47.145788
```


## python下的"dayjs"

为了更好地升华本次学习内容，笔者以`dayjs`的开发思想，开发了`daypy`模块，由于python下各种时间解析类模块种类繁多，为避免造成"重复造轮子"，此模块底层使用了`arrow`库来实现，外层API采用了同`dayjs`一致的设计。且`daypy`模块支持插件化，可以通过插件实现更多功能。

- 安装体验
```bash
pip install daypy
```

- 插件演示

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
插件支持纯字符串方式进行引入，省去了导入模块的麻烦。

:loudspeaker: 注意： 本模块仅供学习交流，暂时不建议在生产环境中使用。

## 开源

[github](https://github.com/mic1on/daypy)

[官方文档](https://52caiji.com/posts/other/opensource/daypy.html)
