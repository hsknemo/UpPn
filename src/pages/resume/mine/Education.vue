<script setup>

import HighlightText from "p/resume/compo/HighlightText.vue";
import LayoutContent from "p/resume/compo/LayoutContent.vue";
import TitleContent from "p/resume/compo/TitleContent.vue";
import EducationIcon from "p/resume/icon/EducationIcon.vue";
import PencialIcon from "p/resume/icon/PencialIcon.vue";
</script>

<template>
  <TitleContent
      title="教育经历"
      engTitle="Education"
  >
    <template #icon>
      <EducationIcon></EducationIcon>
    </template>

    <template #content>
      <LayoutContent
          :notBorder="true"
          class="layout-content">
        <template #content>
          <div class="education-wrap">
            <div flex items-center gap-col-2 class="slogon">
              <img src="@/assets/img/edu.png" alt="">
              <div>
                <span text-center block color-gray fw-500>新乡学院</span>
                <span blockcolor-gray fw-500>2019年毕业于计算机系</span>
              </div>
            </div>

            <div class="edu-list" pl-2 mt-3>
              <div flex gap-col-2  class="edu-item">
                <pencial-icon />
                <span>荣获过校级奖学金</span>
              </div>
            </div>
          </div>
        </template>
      </LayoutContent>
    </template>
  </TitleContent>
</template>

<style scoped lang="scss">
@import "@/assets/css/resume";

.education-wrap {
  .slogon {
    span {
      font-size: 20px;
      color: #0281cb;
      font-family: cursive;
      font-weight: bold;    }
  }
  img {
    --size: 100px;
    width: var(--size);
    height: var(--size);
    object-fit: contain;
  }

  .edu-list {
    span {
      font-size: 16px;
    }
  }
}
</style>
