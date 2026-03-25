
import replaceDomNode from './utils/replaceDomNode'
let jsonModel = {
  name: '.language-up-animateText',
  className: 'up-ani-text'
}

/**
 * @description 闪光文字
 * @example
 * ```up-animateText
 */
export default function Exp(selector)  {
  let modelSelectors = selector.querySelectorAll(jsonModel.name)
  if (modelSelectors.length) {
    Array.from(modelSelectors).forEach(item => {
      let parent = item.parentNode
      let div = document.createElement('div')
      div.className = jsonModel.className
      div.innerHTML = item.innerText
      replaceDomNode(selector, div,  parent)
    })
  }
}
