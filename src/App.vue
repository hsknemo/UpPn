<script setup>
</script>

<template>

  <router-view></router-view>

</template>

<style lang="scss">

  * {
    margin: 0;
    padding: 0;
    &::-webkit-scrollbar {
      width: 5px;
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      width: 5px;
      background-color: var(--scorll-bar-color);
    }
  }
  html,
  body,
  #app {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    height: 100%;
    overflow: auto;
    background-color: var(--bg-color);
  }
  #nprogress .bar {
    height: var(--ngprogress-bar-height) !important;
    background: var(--ngprogress-bar-color) !important;
  }

</style>
