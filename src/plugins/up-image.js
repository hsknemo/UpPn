import replaceDomNode from './utils/replaceDomNode'
let jsonModel = {
  name: '.language-up-img',
}

export default function Exp(selector)  {
  let modelSelectors = selector.querySelectorAll(jsonModel.name)
  if (modelSelectors.length) {
    Array.from(modelSelectors).forEach(item => {
      let parent = item.parentNode
      let img = document.createElement('img')
      console.log(item)
      img.src = item.innerText
      replaceDomNode(selector, img,  parent)
    })
  }
}
