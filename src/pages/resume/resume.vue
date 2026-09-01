<script setup>
import html2pdf from 'html2pdf.js'
import Contact from "p/resume/Contact.vue";
import TitleContent from "p/resume/compo/TitleContent.vue";
import ExeperIcon from "p/resume/icon/ExeperIcon.vue";
import LayoutContent from "p/resume/compo/LayoutContent.vue";
import HighlightText from "p/resume/compo/HighlightText.vue";
import SkillIcon from "p/resume/icon/SkillIcon.vue";
import {onMounted} from "vue";
import Experience from "p/resume/mine/Experience.vue";
import Skill from "p/resume/mine/Skill.vue";
import Education from "p/resume/mine/Education.vue";

onMounted(() => {
  setBody()
})

function setBody() {
  document.body.style.backgroundColor = '#eee'
}

async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function handleExportPdf() {
  await sleep(300)
  document.body.classList.add('pdf')
  const el = document.querySelector('.resume-body')
  const opt = {
    margin: 0,
    filename: "web前端_秦凯_18790554504.pdf",
    image: { type: "jpeg", quality: 0.95 },
    html2canvas: { scale: 2 },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait' // portrait纵向，landscape横向
    },
    pagebreak: {
      mode: ['css', 'legacy'], // 启用CSS分页属性 + 兼容旧版类名
      avoid: ['.avoid-break', 'tr', '.card'] // 指定哪些元素不能被截断
    }
  };

  // 使用 Worker API 在生成后添加水印
  html2pdf()
      .set(opt)
      .from(el)
      .toPdf()
      .save();

  await sleep(300)
  document.body.classList.remove('pdf')
}
</script>

<template>
  <button
          class="export-btn"
          position="sticky"
          top="0"
          @click="handleExportPdf">
    导出PDF
  </button>
  <div class="resume-body">
    <header class="resume-header">
      <div class="resume-header__l">
        <div class="chat-area">
          <img src="../../assets/resume/chat.png" alt="">
        </div>
        <Contact />
      </div>
      <div class="resume-header__r">
        <span>秦凯</span>
        <h5>既然开始，那就风雨兼程吧...</h5>
      </div>
    </header>

    <main class="resume-center">
      <div class="l">
        <Experience
        />

        <Education
        />
      </div>

      <div class="r">
        <Skill  />
      </div>
    </main>


    <footer>

    </footer>
  </div>
</template>
<style>
html:root {
  --resume-highlight-color: rgb(9, 134, 127);
}
</style>
<style scoped lang="scss">

@import "@/assets/css/resume";

$header-color: rgb(39, 39, 39);


.export-btn {
  margin: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  color: #fff;
  @apply cursor-pointer;
  background-color: var(--resume-highlight-color);
}

img {
  display: block;
  object-fit: fill;
  width: 100%;
  height: 100%;
}

.resume-body {
  max-width: 1000px;
  min-width: 800px;
  margin: auto;

  a {
    color: #fff;
  }

  *, & {
    box-sizing: border-box;
  }

  .resume-header {
    height: 200px;
    background-color: $header-color;
    @include flexStyle(center, space-between);

    &__l {
      @include flexStyle();
      gap: 62px;

      .chat-area {
        width: 150px;
        height: 150px;
        border-radius: 5px;
        background-color: #fff;
        padding: 5px;
        margin-left: 22px;
      }
    }

    &__r {
      margin-right: 52px;
      height: 100%;
      color: #fff;
      @include flexStyle(center, center);
      flex-direction: column;
      span {
        text-align: center;
        letter-spacing: 30px;
        font-size: 40px;
        font-weight: bold;
      }
      h5 {
        margin-top: 5px;
      }
    }
  }

  .resume-center {
    padding: 20px;
    background-color: #fff;
    position: relative;
    @include flexStyle();
    gap: 10px;
    .l, .r {
      flex: 1;
    }
  }
}
</style>
