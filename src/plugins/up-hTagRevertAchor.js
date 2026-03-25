import replaceDomNode from './utils/replaceDomNode'

let h1Toh6 = new Array(6).fill('1').map((item, index) => 'h' + (index + 1))
export default function Exp(selector)  {
  h1Toh6.forEach(item => {
    let modelSelectors = selector.querySelectorAll(item)
    if (modelSelectors.length) {
      Array.from(modelSelectors).forEach(item => {
        let text = item.textContent.replace(/#/g, '')
        item.id = text
        item.innerHTML = `<a href="#${text}">#</a>${text}`
      })
    }
  })


}
