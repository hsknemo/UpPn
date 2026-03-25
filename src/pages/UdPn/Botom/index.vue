<script setup>
import PinYinKey from '../components/PinYinKey.vue'
const currentStatus = ref(true)
const onHideOrShowChange = function() {
  var listMap = {
    true: _ => {
      currentStatus.value = false
    },
    false: _ => {
      currentStatus.value = true
    }
  }
  listMap[currentStatus.value]()
}
</script>
<template>
  <PinYinKey 
    v-if='currentStatus'
  />
  <button @click="onHideOrShowChange">已熟练隐藏键盘</button>
</template>


<style scoped lang="scss">
  button {
    padding: 5px 10px;
    background-color: #353535;
    color: #fff;
    outline: none;
    border: none;
    box-shadow: 0 0 20px 0px #161513;
  }
</style>