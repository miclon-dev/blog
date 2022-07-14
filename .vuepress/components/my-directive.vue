<script setup>
import { ref } from 'vue'
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
  <button @click="flag=!flag">flag: {{flag}}</button>
  <button v-my-show="flag">我是按钮，我不可见</button>
</template>
