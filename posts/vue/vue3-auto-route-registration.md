---
# 这是文章的标题
title: Vue3自动路由注册
# 这是页面的图标
icon: vue
# 这是侧边栏的顺序
order: 1
# 设置写作时间
date: 2022-02-22
# 一个页面可以有多个分类
category:
- vue
# 一个页面可以有多个标签
tag:
- router
- 路由注册
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
---
### 现状

传统的路由注册，是固定定义好哪些路由映射哪些页面，如：
```ts
import {RouteRecordRaw} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home.vue')
    }
] as RouteRecordRaw[]

export default routes
```
<!--more-->
在示例代码中，路由`/`映射`views/home.vue`。

随着项目越来越大，目录层级会越来越多，路由相对的也会增多。如何利用文件目录层级结构自动构建出前端路由时必须考虑的问题。

### 思路

在动手之前，了解下Vue项目的基本结构，它是由：布局->页面->组件来构成一张网页的所有要素。
![](https://gitee.com/miclon/blog_pic/raw/master/hexo/20220222152904.png)
布局决定了大方向，网站是上下结构，还是左右，分几栏。
页面决定了内容页需要有哪些组件。
组件就是页面基础零件。

所以，在处理路由的时候，由App.vue通过router-view渲染布局layout，布局layout通过router-view渲染页面view，页面view摆放组件component

这就形成了父子路由的关系：

```ts
import {RouteRecordRaw} from "vue-router";

const routes = [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/layouts/admin.vue'),
        children: [
            {
                path: 'user',
                name: 'user',
                component: () => import('@/views/admin/user.vue')
            }
        ]
    }
] as RouteRecordRaw[]

export default routes
```
当访问 http://localhost:3000/admin/user 的时候就展示了admin布局下的user页面。

有了这样的了解，那思路就一目了然了。我们可以先遍历layouts目录，得到所有父级路由，再通过遍历views页面，找出父路由的子路由。

### 实现

```ts
import {RouteRecordRaw} from "vue-router";

// 枚举layouts中的页面，主路由
const layouts = import.meta.globEager('../layouts/*.vue')
// 枚举views中的页面，子路由
const views = import.meta.globEager('../views/**/*.vue')

// 遍历layouts，使它形成router
function getRoutes() {
    // 空数组，用于存放结果
    const layoutRoutes = [] as RouteRecordRaw[]
    Object.entries(layouts).forEach(([file, module]) => {
        // 通过文件路径+模块，形成路由
        const route = getRouteByModule(file, module)
        // 将子路由也加进来
        route.children = getChildrenRoutes(route)
        layoutRoutes.push(route)
    })
    return layoutRoutes
}
// 遍历子路由
function getChildrenRoutes(layoutRoute: RouteRecordRaw): RouteRecordRaw[] {
    // 空数组，用于存放结果
    const children = [] as RouteRecordRaw[]
    Object.entries(views).forEach(([file, module]) => {
        // 找到是views路径的，加入到子路由中
        if (file.includes(`../views/${layoutRoute.name as string}`)) {
            const route = getRouteByModule(file, module)
            route.path = route.path.replace(/\//, '')
            children.push(route)
        }
    })
    return children
}
// 文件名转路由
function getRouteByModule(file: string, module: { [key: string]: any }) {
    // ../layouts/xxx.vue 从路径中拿到xxx
    const name = file.split('/').pop()?.split('.')[0]
    // 构造route
    const route = {
        path: `/${name}`,
        name: name,
        component: module.default
    }
    // 在页面中自定义路由优先于自动路由
    return Object.assign(route, module.default?.route)
}


export default getRoutes()
```

已经十分详细的注释了上面的代码，随后在路由中引入此文件
```ts
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {App} from "vue";
import routes from "./routes";
import layoutRoutes from "./autoload";

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...layoutRoutes]
})

export function setupRouter(app: App) {
    app.use(router)
}
```

当我们在views/admin中添加order.vue时候，自动注册了路由
http://localhost:3000/admin/order
