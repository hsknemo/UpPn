<script lang="ts" setup>

  const prop = defineProps({
    normalText: String,
    un: {
      type: Boolean,
      default: true
    }
  })
  let bool = ref()
  let BindText = ref('')


  function onInputChange(e) {
    if (e !== prop.normalText) {
      bool.value = 2
      return
    }
    return bool.value = 1
  }

</script>

<template>
  <div class="ui-item">
    <template v-if="prop.un">
      <section>文字</section>
      <el-input @input="onInputChange" v-model="BindText"></el-input>
      <span v-if="bool === 2">输错了</span>
      <span v-else-if="bool === 1">Yep! you win</span>
    </template>
    
  </div>
</template>


<style scoped lang="scss">
.ui-item {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  outline: 1px solid #a2a2a259;
}
</style>