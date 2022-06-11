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
