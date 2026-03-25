<template>
  <div class="error-info">
    <div class="tag">
      <Tag status="error" info="🥺"/>
    </div>
    <div class="info">
      {{ info }}
    </div>
  </div>
</template>

<script>
import Tag from './Tag.vue'
export default {
  name: "Error.vue",
  components: {Tag},
  props: {
    info: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
.error-info {
  display: flex;
  align-items: center;
  padding: 10px 0;
  .tag {
    margin-right: 10px;
  }
}
</style>