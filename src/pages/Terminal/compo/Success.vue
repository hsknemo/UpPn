<template>
  <div class="success-info">
    <div class="tag">
      <Tag status="success" info="🤓 Bingo!"/>
    </div>
    <div class="info">
      {{ info }}
    </div>
  </div>
</template>

<script>
import Tag from './Tag.vue'

export default {
  name: "Success.vue",

  components: {
    Tag
  },

  props: {
    info: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
.success-info {
  display: flex;
  align-items: center;
  padding: 10px 0;

  .tag {
    margin-right: 10px;
  }
}
</style>