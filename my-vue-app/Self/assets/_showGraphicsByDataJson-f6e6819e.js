class e{constructor(o){this.code=o}formatCode(){var o=this.code;return JSON.parse(JSON.stringify(o,null,2))}}class s{constructor(o){this.args=o}getSymbol(){var o=this.args,r={point:"_pointSymbol",line:"_lineSymbol",polygon:"_polygonSymbol"};return this[r[o.撒点类型是]]?new e(this[r[o.撒点类型是]]()).formatCode():""}_lineSymbol(){var o=this.args;return`
    symbol: {
        type: '${o.定制撒点效果.类型||"simple-fill"}',
        color: ${o.定制撒点效果.颜色||"[255, 255, 0, 0.8]"},
        outline: {
            color: ${o.定制撒点效果.边框颜色||"[255, 255, 0, 0.8]"},
            width: "${o.定制撒点效果.大小.宽||"[255, 255, 0, 0.8]"}"
        },
    },
      `}_polygonSymbol(){var o=this.args;return`
  symbol: {
      type: '${o.定制撒点效果.类型||"simple-fill"}',
      color: ${o.定制撒点效果.颜色||"[255, 255, 0, 0.8]"},
      outline: {
          color: ${o.定制撒点效果.边框颜色||"[255, 255, 0, 0.8]"},
          width: "${o.定制撒点效果.大小.宽||"[255, 255, 0, 0.8]"}"
      },
  },
    `}_pointSymbol(){var o=this.args;return`
    symbol: {
        type: '${o.定制撒点效果.类型}',
        url:  this.${o.定制撒点效果.引用图片地址},
        width: '${o.定制撒点效果.大小.宽}',
        height: '${o.定制撒点效果.大小.高}',
    },
    `}}class a{constructor(o){this.args=o}getloop(){return new e(this._loop()).formatCode()}_loop(){var o=this.args;return`
let paramList = []

for (let i = 0; i < ${o.批量遍历对象||"data"}.length; i++) {
    let item = ${o.批量遍历对象||"data"}[i]
    let coords = item['${o.坐标参数是||"coordinates"}']

    paramList.push({
        coords: coords,
    })
}
        `}}function i(t){let o=t.地图触发prop||"getMap",r=new s(t).getSymbol(),l=new a(t).getloop();return console.log(r),`
    ${l}
const param = {
    type: '${t.撒点类型是}',
    clearOld: ${t.是否需要清除其他图层},
    clear: ${t.是否需要清除其他图层},
    operationLevel: 'point-level',
    ${JSON.parse(JSON.stringify(r,null,2))}
    data: paramList,
}



this.$bus.$emit(${o}, (win) => {
    win._showGraphicsByDataJson(param)
})

    `}export{i as default};
