import replaceDomNode from './utils/replaceDomNode'
let jsonModel = {
  name: '.language-up-br',
}


export default function Exp(selector)  {
  let modelSelectors = selector.querySelectorAll(jsonModel.name)
  if (modelSelectors.length) {
    Array.from(modelSelectors).forEach(item => {
      let parent = item.parentNode
      let break_block = document.createElement('br')
      replaceDomNode(selector, break_block,  parent)
    })
  }
}
