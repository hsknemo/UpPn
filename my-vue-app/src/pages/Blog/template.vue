<script >
import {ElMessage} from "element-plus";
import { useRoute } from 'vue-router'
import SideItem from 'p/Blog/sideItem.vue'
export default defineComponent({
  name: 'template',
  components: { SideItem },

 setup() {
    const route = useRoute()
    const str = ref()
    const template_container = ref()
    const reactive_store = reactive({
      isFull: false,
    })

    if (route.query.maxFull) {
      reactive_store.isFull = true
    }

    const delay = async ms => {
      return new Promise(resolve => {
        setTimeout(resolve, ms)
      })
    }

    const unMdByRoute = async function(callback) {
      // const allFile = import.meta.glob('./*')
      let mdFile = import.meta.glob('./*.md')
      let mdPath = route.params.md
      // 多层级嵌套
      if (route.params.md.length > 1) {
        mdPath = route.params.md.join('/')
      }
      // 多层级嵌套
      if (!mdFile[`./${mdPath}.md`]) {
        mdFile = import.meta.glob('./**')
      }
      const mdhtml = mdFile[`./${mdPath}.md`]()
      callback(await mdhtml)
    }

    const expJSON = {
      '````加粗文本': {
        start: '',
        end: '',
      },
    }

    // 解析md内容 替换特定html
    const pluginExp = (html1, startStr, endStr1) => {
      if (!expJSON[startStr]) return html1
      let str = `<p>${startStr}`
      let endStr = `${endStr1}</p>`
      html1 = html1.replace(new RegExp(str, 'gm'), expJSON[startStr].start)
      html1 = html1.replace(new RegExp(endStr, 'gm'), expJSON[startStr].end)
      return html1
    }

    let h1Toh6 = new Array(6).fill('1').map((item, index) => 'h' + (index + 1))
    let needUl = ['ul']
    let findIndex = ''
    const article_tree_build = (dom, originData = {}, findDom, index = 0) => {
      try {
        let tagName = dom.tagName.toLocaleLowerCase()
        if (h1Toh6.includes(tagName)) {
          findIndex = index
          if (!originData[index]) {
            originData[index] = {
              tagName: tagName,
              text: dom.textContent,
              children: [],
              index: index
            }
          }
        }

        if (needUl.includes(tagName)) {
          if (originData[findIndex]) {
            originData[findIndex].children.push({
              tagName: tagName,
              children: Array.from(dom.children).map(item => {
                return {
                  tagName: item.tagName.toLocaleLowerCase(),
                  text: item.textContent,
                }
              }),
              index: index
            })
          }
        }

        if (index >= findDom.length - 1) {
          return originData
        }
        index += 1
        return article_tree_build(findDom[index], originData, findDom, index)
      } catch (e) {
        if (index < findDom.length - 1) {
          index += 1
          return article_tree_build(findDom[index], originData, findDom, index)
        }
      }

    }

    const menu_list = ref({})
    /**
     * 切割domStr 设置目录树
     * @param domStr
     */
    const article_collection_by_domStr = domStr => {
      let parentDom = template_container.value
      let list = {}
      let findDom = parentDom.querySelectorAll('*')
      let data = article_tree_build(findDom[0], list, findDom, 0)
      menu_list.value = data
    }

    const splitJing = function(str) {
      return str.replace(/#/g, '')
    }

    unMdByRoute(async target => {
      // var html = markdown(target.html)
      str.value = pluginExp(target.html, 'bbb加粗文本', 'bbb')
      await delay(1000)
      addCopy()
      article_collection_by_domStr(str.value)
      onJump()
    })

    /**
     * 给模板添加复制方法
     */
    const addCopy = () => {
      let cp_btns = document.querySelectorAll('.template-container .cp_btn')
      Array.from(cp_btns).forEach(item => {
        item.onclick = (ev) => {
          ev.stopPropagation()
          ev.preventDefault()

          let codeNum = item.dataset.code
          let parentEle = item.parentElement
          let code = parentEle.querySelector(`code[js-code-block="${codeNum}"]`)
          navigator.clipboard.writeText(code.innerText)

          ElMessage.success('复制成功☺️')
        }
      })
    }


    const onJump = async () => {
      let urlHash = window.location.hash
      if (urlHash) {
        let exp = decodeURIComponent(urlHash)
        let jumpHash = document.querySelector(`[href='${exp}']`)
        console.log(jumpHash, exp)
        jumpHash && jumpHash.click()
      }
    }


    return {
      str,
      menu_list,
      reactive_store,
      template_container,
      splitJing,
    }
  }
})


</script>

<template>
  <div class="article_collection">
    <div class="article_menu"
         :key="index"
         v-for="(item, index) in menu_list">
      <div class="tit">
        <a :href="'#' + splitJing(item.text)">{{splitJing(item.text)}}</a>
      </div>
<!--      <side-item :children="item.children"></side-item>-->
    </div>
  </div>
  <div class="template-container"
       ref="template_container"
       :class="[
           {'max-full': reactive_store.isFull},
           {'max-full-5': !reactive_store.isFull}
       ]"
       v-html="str"
       v-highlight
  >
  </div>
</template>



<style lang="scss" scoped>
  .template-container {
    padding: 15px 15px;
    scroll-behavior: smooth;
    overflow: auto;
    max-height: 850px;
    ::v-deep  {
      h1 {
        font-size: 1.55em;
        font-weight: 800;
        color: var(--md-h1-color);
        font-family: var(--md-sytem-font);
      }

      li,
      p,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: var(--half-gray-128);
      }


      code {
        overflow: auto;
        display: block;
      }
    }
  }

  .article_collection {
    position: fixed;
    top: 190px;
    left: 30px;
    width: 180px;
    max-height: 500px;
    overflow: auto;
    opacity: 0;
    transition: opacity .3s linear;
    background-color: var(--half-gray-128-o-3);
    padding: 5px;
    border-radius: 5px;
    &:hover {
      opacity: 1;
    }

    .tit {
      cursor: pointer;
      font-size: 12px;
      margin-bottom: 5px;
      border-bottom: 1px solid transparent;
      transition: border-bottom-color 0.3s ease-in-out;
      width: fit-content;
      &:hover {
        border-bottom-color: var(--half-gray-128);
      }
    }

    :deep {
      a {
        color: var(--half-gray-128);
      }
    }
  }
</style>
