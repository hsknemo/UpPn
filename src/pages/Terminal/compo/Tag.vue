<template>
  <div class="tag" :class="{
    [status]: status
  }">
    {{ info }}
  </div>
</template>

<script>
export default {
  name: "Tag.vue",

  props: {
    status: {
      type: String
    },
    info: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
$success-color: #09e309;
$error-color: #ff7979;
$common-color: #5e0202;

.tagPadding {
  font-size: 18px;
}

.success {
  color: $common-color;
  @extend .tagPadding;
}

.error {
  color: $common-color;
  @extend .tagPadding;
}

</style>