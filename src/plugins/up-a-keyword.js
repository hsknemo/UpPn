import replaceDomNode from './utils/replaceDomNode'
let jsonModel = {
  keyWord: 'up-a',
  name: '.language-up-a',
  nameCode: 'code'
}

const createAncor = (contentHtml, selector, parent) => {
  let a = document.createElement('a')
  let findRes = contentHtml.split('|').filter(item => item)
  if (!findRes.length) return
  a.className = 'keyword'
  a.href = findRes[0]
  a.innerHTML = findRes[1]
  a.target = '_blank'
  replaceDomNode(selector, a,  parent)
}

export default function Exp(selector)  {
  let modelSelectors = selector.querySelectorAll(jsonModel.name)
  // 换行处理的keyword
  if (modelSelectors.length) {
    Array.from(modelSelectors).forEach(item => {
      let parent = item.parentNode
      createAncor(item.innerHTML, selector, parent)
    })
  }
  // 行内 keyword 关键词高亮处理
  let codeSelectors = selector.querySelectorAll(jsonModel.nameCode)
  codeSelectors.forEach(item => {
    if (item.innerText.includes(jsonModel.keyWord)) {
      let splitArr = item.innerText.split(jsonModel.keyWord)
      let content = splitArr[1]
      let parent = item.parentNode
      createAncor(content, parent, item)
    }
  })
}
