export default class Template {
  constructor(args = {}, movieSchema = {}) {
    for (const argsKey in movieSchema) {
      if (movieSchema[argsKey]) {
        this[argsKey] = args[argsKey] || ''
      }
    }
  }

  getTag() {
    if (!this.类型) return ''
    let type = this.类型.split('/')
    return type.map(item => {
      return `<span class="tag">${item}</span>`
    }).join('')
  }

  getTemplate() {
    let data = this
    console.log(data)
    let tagStr = this.getTag()
    return `
      <div class="db_card_container">
        <img src="${data.影片海报}" alt="">
        <div class="db_card_info">
            <div class="top">
                <h3><a target="_blank" href="${data.影片地址}">${ data.影片名称 }</a></h3>
                <div class="rate_area">
                    <div class="db_rate" style="--rate: ${ data.评分 !== '暂无评分' ? 14 * (-1 * (10 - parseInt(data.评分))) + 'px' : '-140px' }">
                    </div>
                    <div class="db_rate_num">${ data.评分 } </div>
                </div>
            </div>
            <div class="mid">
                <div class="t_info">
                    <span class="time">${ data.上映日期 }</span>
                    <span>${ data.导演 }</span>
                </div>
                <div class="t_info">
                    <span title="${data.主演}">${ data.主演 }</span>
                </div>
                <div class="tags">
                    ${ tagStr }
                </div>
                <div class="desc" title="${ data.剧情简介 }">
                    ${ data.剧情简介 }
                </div>
            </div>
        </div>
    </div>
    `
  }
}
