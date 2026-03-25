import replaceDomNode from './utils/replaceDomNode'
let jsonModel = {
  keyWord: 'up-keyword',
  name: '.language-up-keyword',
  nameCode: 'code'
}

const createSpan = (contentHtml, selector, parent) => {
  let span = document.createElement('span')
  span.className = 'keyword'
  span.innerHTML = contentHtml
  replaceDomNode(selector, span,  parent)
}

export default function Exp(selector)  {
  let modelSelectors = selector.querySelectorAll(jsonModel.name)
  // 换行处理的keyword
  if (modelSelectors.length) {
    Array.from(modelSelectors).forEach(item => {
      let parent = item.parentNode
      createSpan(item.innerHTML, selector, parent)
    })
  }
  // 行内 keyword 关键词高亮处理
  let codeSelectors = selector.querySelectorAll(jsonModel.nameCode)
  codeSelectors.forEach(item => {
    if (item.innerText.includes(jsonModel.keyWord)) {
      let splitArr = item.innerText.split(jsonModel.keyWord)
      let content = splitArr[1]
      let parent = item.parentNode
      createSpan(content, parent, item)
    }
  })
}
