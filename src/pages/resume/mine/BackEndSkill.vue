<script setup>

import HighlightText from "p/resume/compo/HighlightText.vue";
import LayoutContent from "p/resume/compo/LayoutContent.vue";
</script>

<template>
  <LayoutContent
      tit="Web 后端"
      class="layout-content">
    <template #content>
      <div class="experience">
        <div class="experience-item">
          <i class="icon" text-sm>☆</i>
          <span>
           熟悉 <highlight-text>Node.js </highlight-text> 的使用，熟悉 <HighlightText> Express 框架</HighlightText> 使用，能够
           编写 <HighlightText>Restful</HighlightText> 接口设计规范
         </span>
        </div>

        <div class="experience-item">
          <i class="icon" text-sm>☆</i>
          <span>
           熟悉 <highlight-text>Node.js </highlight-text> 操作 <HighlightText> Mysql </HighlightText> 进行 <HighlightText> CRUD </HighlightText>
         </span>
        </div>

        <div class="experience-item">
          <i class="icon" text-sm>☆</i>
          <span>
            使用过 <highlight-text>Node.js </highlight-text> 利用 <HighlightText>cheerio</HighlightText> 进行 <HighlightText> 数据爬取 </HighlightText>
         </span>
        </div>

        <div class="experience-item">
          <i class="icon" text-sm>☆</i>
          <span>
            使用过Node.js 操作 <highlight-text>Redis</highlight-text> 解决查询性能问题及缓存标注
         </span>
        </div>

        <div class="experience-item">
          <i class="icon" text-sm>☆</i>
          <span>
            对基本的网络安全有过了解 <highlight-text>XSS</highlight-text> / <HighlightText>CSRF</HighlightText> 有解决思路及方案
         </span>
        </div>
      </div>
    </template>
  </LayoutContent>
</template>

<style scoped lang="scss">
@import "@/assets/css/resume";
</style>
