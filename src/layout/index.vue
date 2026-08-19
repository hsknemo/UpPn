<script>
import Top from './Top/Top.vue'
import Bottom from './Bottom/index.vue'
import unoDirectionBall from './Background/unoDirectionBall.vue'
import AllPoint from '@/layout/Background/allPoint.vue'
import {useRoute, useRouter} from "vue-router";
export default defineComponent({
  name: 'TopHead',

  components: {
    AllPoint,
    Top,
    Bottom,
    unoDirectionBall
  },
  setup() {
    let route = useRoute()
    console.log({route})
    const simplePage = ref(false)
    simplePage.value = route.meta.simplePage || false
    return {
      simplePage
    }
  }
})
</script>

<template>
  <template v-if="simplePage">
    <router-view></router-view>
  </template>
  <template v-else>
    <div class="layout-container">
      <Top />
      <router-view
          m-auto
          class="max-sm:w-full!"
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
      <!--    <unoDirectionBall />-->
      <all-point />
    </div>
  </template>
</template>
