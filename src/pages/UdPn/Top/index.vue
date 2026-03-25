
<script>
import { defineComponent, reactive } from 'vue'
import UI from './UI/index.vue'  

export default defineComponent({
  name: 'Top',
  
  components: {
    UI,
  },

  setup() {
    let JuZhen = reactive([
      [1, 1, 1, 1],
    ])

    console.log(JuZhen)

    return {
      JuZhen
    }
  }
})
</script>

<template>
  <div class="top-container">
    <div class="item">
      <template v-for="it in JuZhen">
        <template v-for="item in it">
          <UI normalText="ddddd" v-if="item === 1"></UI>  
          <!-- 定义不显示的布局 -->
          <UI :un="false" v-if="item === 0">null</UI>
        </template>
      </template>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.top-container {
  width: 600px;
  margin: auto;
  background-color: #e0e0e0;
   .null {
    display: inline-block;
    width: 100px;
    height: 100px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    outline: 1px solid red;
  }
}
</style>