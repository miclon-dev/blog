---
# 这是文章的标题
title: Vue3使用本地svg渲染icon
# 这是页面的图标
icon: vue
# 这是侧边栏的顺序
order: 2
# 设置写作时间
date: 2022-03-01
# 一个页面可以有多个分类
category:
- vue
# 一个页面可以有多个标签
tag:
- svg
- icon
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
---
### 1.安装vite-plugin-svg-icons

```shell
pnpm i vite-plugin-svg-icons -D
```
<!--more-->

### 2.将本地svg文件放入/src/assets/icons/*.svg中

### 3. 编写svg-icon plugin

```javascript
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default function createSvgIcon(isBuild) {
    return createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: isBuild
    })
}

```

### 4.配置vite.config.js

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import createSvgIcon from "./src/plugins/svg-icon";

// https://vitejs.dev/config/
export default ({ mode, command }) => {
    return defineConfig({
        plugins: [
            vue(),
            createSvgIcon(command === 'build'),		 // add
            ……
        ]
    })
}

```

### 5.main.js中引入脚本

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register';		// add
createApp(App).mount('#app')

```

### 6.编写SvgIcon组件

```vue
<script setup name="SvgIcon">
import {computed} from "vue"

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    flip: {
        type: String,
        validator(value) {
            return ['', 'horizontal', 'vertical', 'both'].includes(value)
        },
        default: ''
    },
    rotate: {
        type: Number,
        validator(value) {
            return value >= 0 && value <= 360
        },
        default: 0
    }
})

const transformStyle = computed(() => {
    let style = []
    if (props.flip !== '') {
        switch (props.flip) {
            case 'horizontal':
                style.push('rotateY(180deg)')
                break
            case 'vertical':
                style.push('rotateX(180deg)')
                break
            case 'both':
                style.push('rotateX(180deg)')
                style.push('rotateY(180deg)')
                break
        }
    }
    if (props.rotate !== 0) {
        style.push(`rotate(${props.rotate}deg)`)
    }
    return `transform: ${style.join(' ')};`
})
</script>

<template>
    <svg class="svg-icon" :style="transformStyle" aria-hidden="true">
        <use :xlink:href="`#icon-${name}`" />
    </svg>
</template>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentcolor;
    overflow: hidden;
}
</style>

```

### 7.使用

```vue
<script setup>
import SvgIcon from './components/SvgIcon.vue'
</script>

<template>
  // 此处name即本地svg文件名
  <svg-icon name="search-down" />
</template>
```
