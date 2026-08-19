<script setup>
import html2pdf from 'html2pdf.js'
import Contact from "p/resume/Contact.vue";
import TitleContent from "p/resume/compo/TitleContent.vue";
import ExeperIcon from "p/resume/icon/ExeperIcon.vue";
import LayoutContent from "p/resume/compo/LayoutContent.vue";
import HighlightText from "p/resume/compo/HighlightText.vue";
import SkillIcon from "p/resume/icon/SkillIcon.vue";
import {onMounted} from "vue";

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
    filename: "my-resume.pdf",
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
        <TitleContent
            title="项目与工作经验"
            engTitle="Experience"
        >
          <template #icon>
            <ExeperIcon></ExeperIcon>
          </template>

          <template #content>
            <LayoutContent
                tit="上海杰狮信息技术有限公司   &nbsp; &nbsp;&nbsp;&nbsp;    2021-3 ~ 至今"
                class="layout-content">
              <template #content>
                <div class="experience">
                  <div class="title">Web前端开发</div>
                  <div class="experience-item">
                    <i class="icon">⚙</i>
                    <span>参与公司多后台系统开发, 物联网系统，使用过 <HighlightText>Element UI</HighlightText> 、 <HighlightText>高德地图API</HighlightText>  进行图上展示 </span>
                  </div>

                  <div class="experience-item">
                    <i class="icon">⚙</i>
                    <span>参与项目中针对<HighlightText>性能优化</HighlightText>进行解决卡顿，耗时长问题</span>
                  </div>

                  <div class="experience-item">
                    <i class="icon">⚙</i>
                    <span>参与大屏端项目开发，平板屏控制大屏功能开发，使用 <HighlightText>WebSocket</HighlightText>技术</span>
                  </div>

                  <div class="experience-item">
                    <i class="icon">⚙</i>
                    <span>
                      参与并持续维护驻场国网电力公司项目，进博会电力大屏，保障大屏正常展示，使用 <HighlightText>MapBox</HighlightText>、
                      <HighlightText>OpenLayers</HighlightText> 进行 <HighlightText>地图开发</HighlightText>工作
                    </span>
                  </div>

                  <div class="experience-item">
                    <i class="icon">⚙</i>
                    <span>
                      参与水司大屏开发与重构工作，绘制 <HighlightText>CSS 动效</HighlightText> 引水效果图，获得用户一致好评，帮助公司顺利拿下高收益项目
                    </span>
                  </div>

                  <div class="experience-item">
                    <i class="icon">⚙</i>
                    <span>
                      参与过<HighlightText>移动端</HighlightText>开发工作, 使用过 <HighlightText>VantUI</HighlightText>, 完成BPM流程系统开发
                    </span>
                  </div>

                  <div class="experience-item">
                    <i class="icon">⚙</i>
                    <span>
                      后负责各种<HighlightText>后台+地图</HighlightText>开发工作，出色完成用户需求
                    </span>
                  </div>


                </div>
              </template>
            </LayoutContent>
          </template>
        </TitleContent>
      </div>

      <div class="r">
        <TitleContent
            title="技能"
            engTitle="SKILL"
        >
          <template #icon>
            <SkillIcon></SkillIcon>
          </template>

          <template #content>
            <LayoutContent
                tit="Web 前端"
                class="layout-content">
              <template #content>
                <div class="experience">
                  <div class="title">
                    <HighlightText> HTML  </HighlightText> | <HighlightText>CSS</HighlightText>
                  </div>
                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>能够编写<HighlightText>语义化</HighlightText>的<HighlightText> HTML</HighlightText>，模块化的 <HighlightText>CSS</HighlightText>,实现较为复杂的页面布局与动画 </span>
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>熟悉已标准化的<HighlightText>HTML5 / CSS3</HighlightText>的的新特性 </span>
                  </div>

                  <div class="title">
                    <HighlightText> 移动端  </HighlightText> | <HighlightText>WebApp开发</HighlightText>
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>使用<HighlightText> CSS3</HighlightText> <HighlightText>媒体查询(@media)</HighlightText> 进行网页开发制作 </span>
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>熟悉移动端尺寸针对<HighlightText> REM</HighlightText> 进行设计开发</span>
                  </div>

                  <div class="title">
                    <HighlightText> ECMAScript  </HighlightText>(<HighlightText>JavaScript</HighlightText>)
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>熟 悉<HighlightText> ECMAScript  </HighlightText>(<HighlightText>JavaScript</HighlightText>),知识及使用, 对
                    <HighlightText>JavaScript 引擎</HighlightText>  有一定的了解，对 JavaScript 有着良好的编程习惯</span>
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>常使用 <HighlightText>Promise</HighlightText> | <HighlightText>Async(await)</HighlightText> 解决 Javascript 工作
                    中的异步转化为同步问题方案
                    </span>
                  </div>

                  <div class="title">
                    <HighlightText> 前端工程化实践 </HighlightText>
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>使用 <HighlightText>Vue2</HighlightText>及<HighlightText>Webpack</HighlightText>, <HighlightText>Vue3</HighlightText>及<HighlightText>Vite</HighlightText>, <HighlightText>NodeJs</HighlightText>, 开发项目，部分项目使用 <HighlightText>TypeScript</HighlightText>,严格编码</span>
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>熟悉
                      <HighlightText>Element UI</HighlightText> | <HighlightText>Element Plus</HighlightText> |
                      <HighlightText>Jquery</HighlightText> | <HighlightText>BootStrap</HighlightText>
                    </span>
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>熟悉 <HighlightText>CSS预处理器</HighlightText>,
                      <HighlightText>Sass</HighlightText> | <HighlightText>Less</HighlightText> | <HighlightText>Stylus</HighlightText>
                    </span>
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>熟悉 <HighlightText>原子化CSS</HighlightText>,
                      <HighlightText>Unocss</HighlightText> |
                      <HighlightText>Tailwind CSS</HighlightText>
                    </span>
                  </div>

                  <div class="title">
                    <HighlightText> AI开发 </HighlightText>
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>编写过 <HighlightText>Agent</HighlightText>落地项目中，完成项目中部分重复工作组件封装
                    </span>
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>使用 <HighlightText>Cursor</HighlightText> | <HighlightText>TraeCode CN</HighlightText> 完成项目开发
                    </span>
                  </div>

                  <div class="title">
                    <HighlightText> 地图开发 </HighlightText>
                  </div>
                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>使用 <HighlightText>Openlayers</HighlightText> | <HighlightText>MapBox</HighlightText> | <HighlightText>高德地图</HighlightText> |
                      <HighlightText>百度地图</HighlightText> 开发过地图项目
                    </span>
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>熟悉常见的 <HighlightText>坐标系转换</HighlightText>，<HighlightText>地图代码封装</HighlightText>
                    </span>
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>能够使用 <HighlightText>Canvas 绘制效果</HighlightText> 叠加到地图上
                    </span>
                  </div>

                  <div class="experience-item">
                    <i class="icon" text-sm>☆</i>
                    <span>使用过简单的 <HighlightText>Three.js</HighlightText>
                    </span>
                  </div>
                </div>
              </template>
            </LayoutContent>
          </template>
        </TitleContent>
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
@mixin flexStyle($align:'center', $justContent:'space-around') {
  display: flex;
  align-items: $align;
  justify-content: $justContent;
}

@mixin IconNormal() {
  font-style: normal;
  display: block;
  line-height: 20px;
}

i {
  @include IconNormal;
}

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

  .layout-content {
    margin-bottom: 26px;

    .experience {
      .title {
        font-weight: bold;
        font-size: 20px;
        color: var(--half-gray-128);
        margin: 10px 0;
      }
    }
    .experience-item {
      @include flexStyle();
      gap: 5px;
      margin-top: 8px;
      span {
        text-align: justify;
      }
    }
  }
}
</style>
