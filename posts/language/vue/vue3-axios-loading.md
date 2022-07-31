---
title: axios配合组件自动控制页面加载状态
shortTitle: axios暴露的loading状态
icon: vue
order: 1
date: 2022-07-31
category:
- vue
tag:
- axios
sticky: true
star: true
isOriginal: true
---

## 现状
在实际项目开发中，有一个十分常见的场景，表格从服务端获取数据后渲染，为了友好的用户体验，我们需要请求前加载loading动画，结束后关闭loading动画。

```vue
<script setup>
import { getUserList } from '@/api/system/user'

const tableItems = ref([])
const loading = ref(false)

function fetchData() {
  loading.value = true
  getUserList().then(res => {
    tableItems.value = res.data
    loading.value = false
  }).catch(err => {
    loading.value = false
  })
}
onMounted(() => fetchData())
</script>
<el-table v-loading="loading" :data="tableItems">
// ...
</el-table>
```

一个系统写的多了，大家都认为这是很自然很正常的操作，也符合基本的交互体验。但是从代码层面思考一个问题：在满足交互体验的前提下，能否更简单的去实现这个需求呢？

思考：
- 所有的loading操作都是基于axios的请求的，请求前加载，请求后/失败后关闭。
- 是否可以在axios层操作这些loading状态，让业务页面知道目前的loading状态呢？
- 由于loading状态是两种状态：`true` or `false`。能够更简单的去管理这些状态？

带着疑问，从下至上去尝试解决。

## 封装一个Boolean的状态控制器

```javascript
import { ref } from 'vue'

/**
 * @description: 创建一个逻辑状态
 * @param {*} defalutValue 默认值为false
 */
export default function useBoolen(defalutValue = false) {
    const bool = ref(defalutValue)
    const toggle = () => {
        bool.value = !bool.value
    }
    const reset = () => {
        bool.value = false
    }
    const set = value => {
        bool.value = value
    }
    const setTrue = () => {
        bool.value = true
    }
    const setFalse = () => {
        bool.value = false
    }
    return {
        bool,
        toggle,
        reset,
        set,
        setTrue,
        setFalse
    }
}
```

## 封装一个loading状态控制器
基于以上的Boolen状态控制器，我们可以再封装一个loading状态控制器：

```javascript
import useBoolen from './useBoolen'

/**
 * @description: 创建一个loading状态
 * @param {*} defaultValue 默认值为false
 */
export default function useLoading(defaultValue = false) {
    const {
        bool: loading,
        setTrue: startLoading,
        setFalse: endLoading
    } = useBoolen(defaultValue)

    return {
        loading,
        startLoading,
        endLoading
    }
}
```
`useLoading`暴露三个参数：

- loading：loading的当前状态
- startLoading：开始loading
- endLoading：结束loading


## 在axios层操作loading状态

接下来我们可以进入axios封装中，对请求的前后使用`useLoading`进行控制。

```javascript
import useLoading from '@/composables/useLoading'

const { loading, startLoading, endLoading } = useLoading(false)

api.interceptors.request.use(
  request => {
    startLoading()
    // ...
    return request
  },
  error => {
    endLoading()
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
    response => {
        endLoading()
        // ...
        return Promise.resolve(response.data)
    },
    error => {
        endLoading()
        // ...
        return Promise.reject(error)
    }
)

// 别忘了，暴露当前的loading状态
export {
    loading
}
```

## 改进后
经过以上封装，我们在业务页面中，拿到axios暴露的loading状态，将它绑定到组件的`v-loading`属性上，就可以实现loading的状态自动控制了。

我们可以将以上的代码改装为：
```javascript
<script setup>
import { loading }  from '@/api'
import { getUserList } from '@/api/system/user'

const tableItems = ref([])
const loading = ref(false)

async function fetchData() {
  const { items } = await getUserList()
  tableItems.value = items
}
onMounted(async() => await fetchData())
</script>
<el-table v-loading="loading" :data="tableItems">
// ...
</el-table>
```

省略了很多步骤：
- 不需要创建loading变量
- 不需要对loading变量进行true/false的设置
- 不需要对请求失败loading状态需要try/catch来关闭
