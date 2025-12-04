class e{constructor(o){this.code=o}formatCode(){var o=this.code;return JSON.parse(JSON.stringify(o,null,2))}}class s{constructor(o){this.args=o}getSymbol(){var o=this.args,r={point:"_pointSymbol",line:"_lineSymbol",polygon:"_polygonSymbol"};return this[r[o.\u6492\u70B9\u7C7B\u578B\u662F]]?new e(this[r[o.\u6492\u70B9\u7C7B\u578B\u662F]]()).formatCode():""}_lineSymbol(){var o=this.args;return`
    symbol: {
        type: '${o.\u5B9A\u5236\u6492\u70B9\u6548\u679C.\u7C7B\u578B||"simple-fill"}',
        color: ${o.\u5B9A\u5236\u6492\u70B9\u6548\u679C.\u989C\u8272||"[255, 255, 0, 0.8]"},
        outline: {
            color: ${o.\u5B9A\u5236\u6492\u70B9\u6548\u679C.\u8FB9\u6846\u989C\u8272||"[255, 255, 0, 0.8]"},
            width: "${o.\u5B9A\u5236\u6492\u70B9\u6548\u679C.\u5927\u5C0F.\u5BBD||"[255, 255, 0, 0.8]"}"
        },
    },
      `}_polygonSymbol(){var o=this.args;return`
  symbol: {
      type: '${o.\u5B9A\u5236\u6492\u70B9\u6548\u679C.\u7C7B\u578B||"simple-fill"}',
      color: ${o.\u5B9A\u5236\u6492\u70B9\u6548\u679C.\u989C\u8272||"[255, 255, 0, 0.8]"},
      outline: {
          color: ${o.\u5B9A\u5236\u6492\u70B9\u6548\u679C.\u8FB9\u6846\u989C\u8272||"[255, 255, 0, 0.8]"},
          width: "${o.\u5B9A\u5236\u6492\u70B9\u6548\u679C.\u5927\u5C0F.\u5BBD||"[255, 255, 0, 0.8]"}"
      },
  },
    `}_pointSymbol(){var o=this.args;return`
    symbol: {
        type: '${o.\u5B9A\u5236\u6492\u70B9\u6548\u679C.\u7C7B\u578B}',
        url:  this.${o.\u5B9A\u5236\u6492\u70B9\u6548\u679C.\u5F15\u7528\u56FE\u7247\u5730\u5740},
        width: '${o.\u5B9A\u5236\u6492\u70B9\u6548\u679C.\u5927\u5C0F.\u5BBD}',
        height: '${o.\u5B9A\u5236\u6492\u70B9\u6548\u679C.\u5927\u5C0F.\u9AD8}',
    },
    `}}class a{constructor(o){this.args=o}getloop(){return new e(this._loop()).formatCode()}_loop(){var o=this.args;return`
let paramList = []

for (let i = 0; i < ${o.\u6279\u91CF\u904D\u5386\u5BF9\u8C61||"data"}.length; i++) {
    let item = ${o.\u6279\u91CF\u904D\u5386\u5BF9\u8C61||"data"}[i]
    let coords = item['${o.\u5750\u6807\u53C2\u6570\u662F||"coordinates"}']

    paramList.push({
        coords: coords,
    })
}
        `}}function i(t){let o=t.\u5730\u56FE\u89E6\u53D1prop||"getMap",r=new s(t).getSymbol(),l=new a(t).getloop();return console.log(r),`
    ${l}
const param = {
    type: '${t.\u6492\u70B9\u7C7B\u578B\u662F}',
    clearOld: ${t.\u662F\u5426\u9700\u8981\u6E05\u9664\u5176\u4ED6\u56FE\u5C42},
    clear: ${t.\u662F\u5426\u9700\u8981\u6E05\u9664\u5176\u4ED6\u56FE\u5C42},
    operationLevel: 'point-level',
    ${JSON.parse(JSON.stringify(r,null,2))}
    data: paramList,
}



this.$bus.$emit(${o}, (win) => {
    win._showGraphicsByDataJson(param)
})

    `}export{i as default};
