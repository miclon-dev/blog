---
# 这是文章的标题
title: vuepress2.x 使用vue组件
# 这是页面的图标
icon: vue
# 这是侧边栏的顺序
order: 3
# 设置写作时间
date: 2022-06-11
# 一个页面可以有多个分类
category:
- vue
# 一个页面可以有多个标签
tag:
- vuepress
---

记一次踩坑，由于[vuepress2.x官方文档](https://v2.vuepress.vuejs.org/zh/guide/markdown.html#%E5%9C%A8-markdown-%E4%B8%AD%E4%BD%BF%E7%94%A8-vue)的markdown中并未提及如何使用Vue组件。

因此，下意识的去看看v1.x的文档，可以发现，在v1.x中，可以使用自定义vue组件来实现markdown的功能。

而方法也十分简单，约束大于配置，只需要在.vuepress文件中新建`components`文件夹，然后把你的组件放在里面即可。

按着这种方式试了几个回合，未果。

于是又去翻看[v1迁移v2文档](https://v2.vuepress.vuejs.org/zh/guide/migration.html#vuepress-components)，在里面发现，在v1中自动注册component的方式已经被废弃了!

::: tip
在该目录下的文件不会被自动注册为 Vue 组件。

你需要使用 [@vuepress/plugin-register-components](https://v2.vuepress.vuejs.org/zh/reference/plugin/register-components.html)，或者在 .vuepress/client.{js,ts} 中手动注册你的组件。
:::

原来是需要安装插件对自定义组件进行选项配置了，而不是和v1一样，一股脑的全给register。既然是官方支持的插件，那就去官方插件文档中找到这个插件的使用方法。

插件安装教程：[官方文档](https://v2.vuepress.vuejs.org/zh/reference/plugin/register-components.html)

```
pnpm i -D @vuepress/plugin-register-components@next
```

```js
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const { path } = require('@vuepress/utils')

module.exports = {
  plugins: [
      registerComponentsPlugin({
          componentsDir: path.resolve(__dirname, './components'),
      })
  ],
}
```
完整的配置项可以参考以上文档。

接下来看看成果：

<my-demo/>

附上vue组件代码：
```vue
<template>
  <div style="border: #0a7bf4 1px solid">
    <h3>{{ msg }}</h3>
    <button @click="num++">点我点我：{{num}}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      msg: "我是markdown中的vue组件"
    };
  }
}
</script>
```
