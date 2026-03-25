<script setup lang="ts">
defineProps({
  children: Array
})
</script>

<template>
  <div class="item"
       :key="index"
       v-for="(item, index) in children">
    <div class="item-title">
      <a :href="'#' + item.text">{{item.text}}</a>
    </div>
    <div v-if="item.children">
      <side-item :children="item.children"></side-item>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-title {
  padding-left: 5px;
  color: var(--half-gray-128);
  margin-bottom: 5px;
  font-size: 12px;
  cursor: pointer;
}
</style>
