<script>
import { defineComponent } from 'vue'
import HardMode from './Top/HardMode/index.vue'
import Botom from './Botom/index.vue'

export default defineComponent({
  name: 'udpn',
  components: {
    HardMode,
    Botom
  },
  setup() {
    console.log(1212121)
  }
})
</script>

<template>
  <div style="text-align: center;">
    <HardMode />
    <Botom />
  </div>
</template>


