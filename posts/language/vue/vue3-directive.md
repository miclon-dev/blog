---
# 这是文章的标题
title: 一文了解directive
# 这是页面的图标
icon: vue
# 这是侧边栏的顺序
order: 2
# 设置写作时间
date: 2022-07-12
# 一个页面可以有多个分类
category:
- vue
# 一个页面可以有多个标签
tag:
- directive
isOriginal: true
---

## directive

Vue中提供了很多核心内置指令，如 v-model、v-show、v-html等等指令，当然本文不是来谈这些指令在特定场景的使用，而目的是对指令有新的认识并自己开发一个指令。

## 它是什么

顾名思义，指令。我个人理解是：获得绑定元素的DOM并对它的DOM元素进行操作的过程。

正如v-show="flag"一样，被绑定的元素需要在flag值为`true`的情况下才会被展示。

那就等于说，我检测flag值，如果是false,那我就把元素DOM的`style="display: none;"`不就是隐藏这个元素了，反之为true的时候移除这个style。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220712140920.png)

果不其然！说白了指令它就是对DOM进行操控。

## 实现自己的v-show

在开始实现之前，我们还需要了解一个必要前提知识。指令它也是有生命周期的。也就是它这一生（从创建到销毁）都是有可以让开发者操控的空间的，官方词说法叫hook钩子函数。
[directive hooks](https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks)。
我们可以在定义自己指令的钩子函数，vue会给你自定义的钩子函数携带一些参数，以便开发者在操控中获取[必要参数](https://vuejs.org/guide/reusability/custom-directives.html#hook-arguments)。

我们可以打印看看这些参数，因为我们等会肯定需要用到它们。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220712142032.png)

可以观察到，在`mounted`hook中，`el`得到了button的DOM结构。`binding`得到了我们传入的flag值。

那事情就变得简单了，我们只需要检测binding中value的值，如果是false，那我们就给`el`加上`style`。反之移除`style`。

### 查看效果：

<my-directive/>

### 源代码：
```vue
<script setup>

const vMyShow = {
    mounted(el, binding) {
        el.style.display = binding.value ? null : 'none'
    },
    updated(el, binding) {
        el.style.display = binding.value ? null : 'none'
    }
}
const flag = ref(false)
</script>
<template>
    <div>
        <page-header title="123" />
        <page-main>
            <el-button @click="flag=!flag">flag: {{ flag }}</el-button>
            <el-button v-my-show="flag">我是按钮，我不可见</el-button>
        </page-main>
    </div>
</template>
```
