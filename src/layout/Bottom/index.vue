<script setup>
import {useRouter, useRoute} from 'vue-router'

const reactive_store = reactive({
  isFull: false,
})
const router = useRouter()
const route = useRoute()

if (route.query.maxFull) {
  reactive_store.isFull = true
}

const onExit = function () {
  router.go(-1)
}
</script>

<template>
  <div
      class="cd-container"
      v-if="!(['/', '/index'].includes(router.currentRoute.value.fullPath))">
    <span @click="onExit">
      cd ../
    </span>
  </div>
</template>


<style lang="scss" scoped>
.cd-container {
  margin-top: 14px;
  margin-bottom: 10px;

  span {
    display: inline-block;
    cursor: pointer;
    font-weight: 700;
    letter-spacing: 3px;
    color: var(--half-gray-128);
    font-family: var(--common-font-family);
    border-bottom: 2px solid transparent;
    transition: .3s all ease;

    &:hover {
      color: var(--intro-h1);
      border-bottom: 2px solid;
    }
  }


}
</style>
