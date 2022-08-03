<script setup>
import { ref, computed } from 'vue'
const input = ref('.*?')
const url = ref(`https://jex.im/regulex/#!embed=true&flags=&re=${input.value}`)
const show = ref(true)
function test() {
  show.value= false
  setTimeout(() => {
    show.value= true
  }, 50);
  url.value = `https://jex.im/regulex/#!embed=true&flags=&re=${input.value}`
}

</script>
<template>
  <div class="reg-body">
    <div class="reg-search reg-bar">
      <div class="reg-form">
        <input class="reg-input" placeholder="输入正则表达式" v-model="input" name="cname" type="text">
        <button class="reg-btn" v-on:click="test" ></button>
      </div>
    </div>
  
    <div v-if="show">
      <iframe 
        frameborder="0" 
        width="100%" 
        height="400px" 
        :src="url"
      />
    </div>
  </div>
</template>
<style scope>
* {

    box-sizing:border-box;

}

.reg-search {

    padding:10px 0;

}

.reg-form {

    position:relative;

    width:400px;

    margin:0 auto;

}

.reg-input,.reg-btn {

    border:none;

    outline:none;

}

.reg-input {

    width:100%;

    height:42px;

    padding-left:13px;

}

.reg-btn {

    height:42px;

    width:42px;

    cursor:pointer;

    position:absolute;

}     

.reg-bar .reg-input {

    border:2px solid #60ad80;

    border-radius:5px;

    background:transparent;

    top:0;

    right:0;

}

.reg-bar .reg-btn {

    background:#60ad80;

    border-radius:0 5px 5px 0;

    width:60px;

    top:0;

    right:0;

}

.reg-bar .reg-btn:before {

    content:"测试";

    font-size:13px;

    color:#F9F0DA;

}
</style>
