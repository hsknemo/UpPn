import replaceDomNode from './utils/replaceDomNode'
let jsonModel = {
  name: '.language-up-加粗文本',
}


export default function Exp(selector)  {

  let modelSelectors = selector.querySelectorAll(jsonModel.name)
  if (modelSelectors.length) {
    Array.from(modelSelectors).forEach(item => {
      let parent = item.parentNode
      let div = document.createElement('div')
      div.className = 'b_block'
      div.innerHTML = item.innerText
      replaceDomNode(selector, div,  parent)
    })
  }
}
