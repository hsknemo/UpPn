<script setup>
const prop = defineProps({
  tit: {
    type: String
  },

  notBorder: {
    type: Boolean
  }
})
</script>

<template>
  <main class="content" :class="{notBorder: notBorder}" :tit="prop.tit">
    <div class="c-top"></div>
    <slot name="content"></slot>
  </main>
</template>

<style scoped lang="scss">
// pdf 导出时候的问题
body.pdf {
  .content {
    &:before {
      line-height: 15px;
    }
  }
}
.content {
  position: relative;
  padding: 28px;
  box-sizing: border-box;
  &.notBorder {
    &:before,
    &:after {
      display: none;
    }
  }
  &:before {
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 30px;
    content: attr(tit);
    font-size: 14px;
    line-height: 26px;
    color: #fff;
    width: 100%;
    height: 26px;
    background-color: #000;
    border-radius: 0 10px 10px 0;
    box-sizing: border-box;
  }

  &:after {
    position: absolute;
    left: 0;
    top: 0;
    content: '';
    height: 100%;
    width: 20px;
    min-height: 100px;
    background-color: #000;
    border-radius: 0 0 10px 10px;
  }

}
</style>
