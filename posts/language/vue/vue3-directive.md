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

## 应用场景：按钮级权限控制

在实际开发中，我们可能会有一些按钮需要根据用户的权限控制，比如：
只有管理员角色才能拥有删除按钮的控制。

> PS：当然，真正的权限控制应当是前后端一起做的，而不是前端来显示与否。前端只能防君子和优化体验。

```vue
<script setup>
// mock 我的权限是 edit
const myPermissions = ['edit']

// 判断是否有权限
const hasPermission = permission => {
    return myPermissions.some(item => item === permission)
}
const auth = value => {
    if (typeof value === 'string') {
        return hasPermission(value)
    } else {
        return value.some(item => {
            return hasPermission(item)
        })
    }
}
const vAuth = {
    mounted: (el, binding) => {
        if (!auth(binding.value)) {
            // 如果没权限直接删除节点
            el.remove()
        }
    }
}

</script>
<template>
    <div>
        <page-header title="123" />
        <page-main>
            <!-- 删除按钮需要admin才有权限 -->
            <el-button v-auth="'admin'">删除</el-button>
        </page-main>
    </div>
</template>
```

以上，由于我们的权限是edit，我们只有admin才能看到删除按钮。所以当前用户状态是无法操作删除的。
