<script setup>

import LayoutContent from "p/resume/compo/LayoutContent.vue";
import ExeperIcon from "p/resume/icon/ExeperIcon.vue";
import HighlightText from "p/resume/compo/HighlightText.vue";
import TitleContent from "p/resume/compo/TitleContent.vue";
</script>

<template>
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
            <div class="title">市区政务可视化大屏开发</div>
            <div class="desc">
              政务综合指挥可视化大屏，汇聚电网业务上图、民生服务、应急调度、抢修监控、辖区治理多源数据，实现数据实时监控、图表联动、下钻查询、动态轮播展示，用于政府展厅展示与领导日常工作研判。
            </div>
            <div class="experience-item">
              <i class="icon">⚙</i>
              <span>
                      参与项目迁移从零搭建、页面架构设计与全量功能开发，
                      原大屏5280x2160屏改造
                      适配1920、2K、4K多分辨率大屏，实现<highlight-text>全屏自适应</highlight-text>、无拉伸、无留白，展示场景。
                    </span>
            </div>

            <div class="experience-item">
              <i class="icon">⚙</i>
              <span>
                      基于业务封装可复用可视化图表组件、数字滚动组件、轮播组件，统一大屏UI风格，支持动态数据配置、
                      主题切换，支撑后续3个同类大屏项目快速复用落地。
                    </span>
            </div>

            <div class="experience-item">
              <i class="icon">⚙</i>
              <span>
                      解决政务大屏核心性能问题，针对千级数据渲染、
                      高频轮播刷新、接口冗余请求等痛点，
                      通过<HighlightText>分片渲染</HighlightText>、
                      <HighlightText>请求防抖</HighlightText>、
                      <HighlightText>接口缓存</HighlightText>、
                      <HighlightText>DOM复用优化</HighlightText>
                      ，
                      将首屏加载速度提升45%，页面帧率稳定60fps，
                      彻底解决页面卡顿、抖动、白屏问题。
                    </span>
            </div>

            <div class="experience-item">
              <i class="icon">⚙</i>
              <span>
                      通过<HighlightText>渐进式渲染</HighlightText>，<HighlightText>数据切片</HighlightText>解决地图核心性能问题，万级数据渲染崩溃问题。
                    </span>
            </div>

            <div class="experience-item">
              <i class="icon">⚙</i>
              <span>
                      修复样式错乱、数据渲染异常问题，全程跟进联调测试与甲方验收，项目零重大问题顺利交付，长期稳定运维。
                    </span>
            </div>

          </div>

          <div class="experience">
            <div class="title">GIS地图可视化业务平台</div>
            <div class="desc">
              基层数据可视化展示平台，抢修监控，人员轨迹，异常事件精准定位，轨迹回溯，数字化治理。
            </div>
            <div class="experience-item">
              <i class="icon">⚙</i>
              <span>
                      <HighlightText>海量数据渲染</HighlightText>，点位批量标注，自定义图标弹窗、区域高亮、热力态势图、事件轨迹回放、图层分级管控
                    </span>
            </div>

            <div class="experience-item">
              <i class="icon">⚙</i>
              <span>
                      打通地理空间数据与业务数据联动逻辑，实现地图点位、表格数据、统计图表三方联动筛选、实时同步，解决传统地图与业务数据割裂的问题，提升政务数据研判效率。
                    </span>
            </div>

            <div class="experience-item">
              <i class="icon">⚙</i>
              <span>
                      内嵌独自搭建台风监测平台，接入台风数据，绘制台风路径轨迹图，及路径轨迹时间轴联动，台风影响受灾分析，可视化展示。
                    </span>
            </div>

            <div class="experience-item">
              <i class="icon">⚙</i>
              <span>
                      完成PC端、大屏端多端适配，统一展示交互标准，项目交付后投入政务日常网格化工作使用，长期稳定运行，获得甲方验收好评。
                    </span>
            </div>


          </div>
        </template>
      </LayoutContent>
    </template>
  </TitleContent>
</template>

<style scoped lang="scss">
@import "@/assets/css/resume";
</style>
