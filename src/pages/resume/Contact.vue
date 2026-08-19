<script setup>

import PhoneIcon from "p/resume/icon/PhoneIcon.vue";
import EmainIcon from "p/resume/icon/emainIcon.vue";
import GitHub from "p/resume/icon/GitHub.vue";
import WebSite from "p/resume/icon/WebSite.vue";
</script>

<template>
  <div class="contact-area">
    <div class="contact-area__item">
      <phone-icon /> <span>18790554504</span>
    </div>

    <div class="contact-area__item">
      <emain-icon /> <span>937817514@qq.com</span>
    </div>

    <div class="contact-area__item">
      <git-hub /> <a href="https://github.com/hsknemo" target="_blank">https://github.com/hsknemo</a>
    </div>

    <div class="contact-area__item">
      <web-site /> <a target="_blank" href="https://hsknemo.netlify.app/">https://hsknemo.netlify.app/</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin flexStyle($align:'center', $justContent:'space-around') {
  display: flex;
  align-items: $align;
  justify-content: $justContent;
}
.contact-area {
  @include flexStyle(unset, center);
  flex-direction: column;
  gap: 8px;
  a {
    color: #fff;
  }
  .contact-area__item {
    @include flexStyle(center);
    gap: 5px;
    color: #fff;
    font-weight: 500;
  }
}
</style>
