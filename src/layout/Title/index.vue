<template>
  <div class="defalut-text title">
    {{ $attrs.title }}
  </div>
</template>


<style lang="scss" scoped>
.title {
  font-size: var(--intro-h1-size);
  color: var(--intro-h1);
  font-weight: var(--intro-h1-fonWeight);
  font-family: var(--inter-font-family);
}

@media (max-width: 750px) {
  .title {
    text-align: center;
  }

}
</style>
