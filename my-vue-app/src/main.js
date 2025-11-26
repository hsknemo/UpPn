import { createApp } from 'vue'
/* element-ui */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
/*vue-router*/
import Router from './router/index'
/*vuex*/
import Store from './store/index'
import '@/layout/css/theme.scss'
import hljs from 'highlight.js';
import 'highlight.js/styles/cybertopia-saturated.min.css' //样式
import '@/assets/movie/card.scss'
import ExpMarkdownCustome from '@/plugins/index'
import upMovieItem from "@/plugins/up-MovieItem";
/* 挂接 */
const app = createApp(App)

app.use(Router)
app.use(Store)
app.use(ElementPlus)
app.mount('#app')
//创建v-highlight全局指令
app.directive('highlight',function (el) {
  ExpMarkdownCustome.upInitClassName(el)
  ExpMarkdownCustome.upBold(el)
  ExpMarkdownCustome.upMovieItem(el)
  ExpMarkdownCustome.upKeyWord(el)
  ExpMarkdownCustome.upAnchorKeyWord(el)
  ExpMarkdownCustome.upBreak(el)
  ExpMarkdownCustome.upAnimateText(el)
  ExpMarkdownCustome.upImage(el)
  ExpMarkdownCustome.upHtagRevertAchor(el)

  let blocks = el.querySelectorAll('pre code');

  blocks.forEach((block, index) =>{
    if (['code'.toUpperCase()].includes(block.tagName)) {
      block.setAttribute(`js-code-block`, index)

      block.parentElement.insertAdjacentHTML('beforeend',
        `<button class="cp_btn" data-code="${index}"><svg  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6306" width="18" height="18"><path d="M906.688 469.312a53.376 53.376 0 0 0-53.376-53.312h-384a53.312 53.312 0 0 0-53.312 53.312v384c0 29.44 23.872 53.376 53.312 53.376h384c29.44 0 53.376-23.936 53.376-53.376v-384z m64 384a117.376 117.376 0 0 1-117.376 117.376h-384A117.376 117.376 0 0 1 352 853.312v-384c0-64.768 52.48-117.312 117.312-117.312h384c64.768 0 117.376 52.48 117.376 117.312v384z" p-id="6307"></path><path d="M608 213.312v-42.688a53.376 53.376 0 0 0-53.376-53.312h-384a53.312 53.312 0 0 0-53.312 53.312v384a53.44 53.44 0 0 0 53.312 53.376h42.688l6.4 0.64a32 32 0 0 1 0 62.72l-6.4 0.64h-42.688A117.376 117.376 0 0 1 53.312 554.624v-384A117.312 117.312 0 0 1 170.624 53.312h384A117.44 117.44 0 0 1 672 170.624v42.688a32 32 0 0 1-64 0z" p-id="6308"></path></svg></>`)
    }
    hljs.highlightBlock(block)
  })
})
