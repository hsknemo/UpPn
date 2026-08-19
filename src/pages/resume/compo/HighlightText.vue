<script setup>

</script>

<template>
<span class="highlight">
  <slot ></slot>
</span>
</template>

<style scoped lang="scss">
.highlight {
  font-weight: bold;
  color: var(--resume-highlight-color);
}
</style>
