<script>
import Top from './Top/Top.vue'
import Bottom from './Bottom/index.vue'
import unoDirectionBall from './Background/unoDirectionBall.vue'
export default defineComponent({
  name: 'TopHead',

  components: {
    Top,
    Bottom,
    unoDirectionBall
  }
})
</script>

<template>
  <div class="layout-container">
    <Top />
    <router-view
      m-auto
      sm:w-full
      md:w-screen-md
      xl:w-screen-md
    ></router-view>
    <Bottom
      max-sm:px15
      m-auto
      md:w-screen-md
      sm:w-full
      xl:w-screen-md
    />
    <unoDirectionBall />
  </div>
</template>
