import replaceDomNode from './utils/replaceDomNode'
import MovieTemplate from './template/movieTemplate.js'
import Schema from "@/plugins/template/Schema";

let jsonModel = {
  name: '.language-up-电影卡片',
  dataSchema: Schema.douBanSchema
}


/**
 * 生成电影卡片
 * @param selector
 * @constructor
 */
export default function Exp(selector) {
  let modelSelectors = selector.querySelectorAll(jsonModel.name)
  if (modelSelectors.length) {
    Array.from(modelSelectors).forEach(item => {
      let parent = item.parentNode
      let div = document.createElement('div')
      div.className = 'movie_block'
      if (item.innerText) {
        let splitStr = item.innerText.split('|').filter(item => item)
        let dataSche = {}
        splitStr.forEach(item => {
          // 解析值
          let [key] = item.split(/:/)
          let value = item.split(/:/).slice(1, item.split(/:/).length).join(':')
          let k = key.replace(/\s|"/g, '')
          if (jsonModel.dataSchema[k]) {
            value = value.replace(/"|\n|\s|,/g,'')
            dataSche[k] = value
          }
        })
        console.log(dataSche)
        let movieTemp = new MovieTemplate(dataSche, Schema.douBanSchema)
        div.innerHTML = movieTemp.getTemplate()
      }

      replaceDomNode(selector, div, parent)
    })
  }
}
