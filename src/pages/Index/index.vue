<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    var form: number[] = reactive([23])
    function main(): void {
      form.push(3333)
      console.log(form)
      a()
    }

    function onBtnPushClick(num: number): void {
      form.push(num)
    }

    function a() {
      console.log('a run')
    }

    onMounted(main)

    return {
      form,

      onBtnPushClick
    }
  },
})
</script>

<template>
  <div class="hello">{{ form }}</div>
  <button 
    class="base-btn"
    @click="onBtnPushClick(Math.random())"
  >
    按钮
  </button>
</template>

<style scoped>
.hello {
  color: blue;
}

.base-btn {
  padding: 10px;
  border: none;
  color: rgba(255, 255, 255, 0.475);
  background-color: purple;
}
</style>