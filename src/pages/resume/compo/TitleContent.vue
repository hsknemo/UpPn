<script setup>
 const props = defineProps({
   title: {
     type: String
   },
   engTitle: {
     type: String
   },
 })
</script>

<template>
<div class="tit-slot-wrap">
  <header>
    <div class="t">
      <slot name="icon"></slot>
    </div>
    <div class="r">
      <div class="top">{{ props.title || '标题1'}}</div>
      <div class="bottom">{{ props.engTitle || '英文标题'}}</div>
    </div>
  </header>

  <slot name="content"></slot>

</div>
</template>

<style scoped lang="scss">
@mixin flexStyle($align:'center', $justContent:'space-around') {
  display: flex;
  align-items: $align;
  justify-content: $justContent;
}
$color:  var(--resume-highlight-color);
.tit-slot-wrap {
  header {
    @include flexStyle(center);
    gap: 10px;
    margin-bottom: 10px;
  }
 .t {
   @include flexStyle(center, center);
   --size: 50px;
   background-color: $color;
   border-radius: 50%;
   width: var(--size);
   height: var(--size);
 }

  .r {
    .top {
      font-weight: bold;
      font-size: 22px;
      color: #999;
    }
    .bottom {
      font-family: var(--inter-font-family);
      color: $color;
      font-weight: bold;
      letter-spacing: 1px;
    }
  }
}
</style>
