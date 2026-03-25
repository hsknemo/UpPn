<template>
<div class="readme-container">
  <div class="readme-subItem">
    <section class="summary-title">⌨️ 快捷键:</section>
    <div class="summary-item" v-for="(item, index) of oHelpData.data.fastKey ">
      <div class="left">
        {{ index }}
      </div>
      -----
      <div class="right">
        {{ item }}
      </div>
    </div>
  </div>

  <div class="readme-subItem">
    <section class="summary-title">🔗绑定命令:</section>
    <div class="summary-item" v-for="(item, index) of oHelpData.data.command ">
        <div class="left">
          {{ index }}
        </div>
        -----
        <div class="right">
          {{ item }}
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ReadMe.vue",

  props: {
    oHelpData: {
      type: [Object],
    }
  }
}
</script>

<style scoped lang="scss">
.summary-item {
  display: flex;
  padding: 0 20px;

  .left {
    min-width: 130px;
    margin-right: 20px;
  }
  .right {
    margin-left: 20px;
  }
}
</style>