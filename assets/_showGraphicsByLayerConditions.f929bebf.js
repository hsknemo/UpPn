function a(e){let o=e.\u5730\u56FE\u89E6\u53D1prop||"getMap";return`
const param = {
    isZoomAt: ${e.\u662F\u5426\u7F29\u653E\u5730\u56FE||!1},
    clearOld: ${e.\u662F\u5426\u9700\u8981\u6E05\u9664\u5176\u4ED6\u56FE\u5C42||!1},
    operationLevel:  ${e.\u4EA7\u751F\u5730\u56FE\u5C42\u7EA7\u662F||"layerOperationLevel"},
    layer: '${e.\u67E5\u8BE2\u56FE\u5C42\u540D\u79F0}',
    where: '${e.\u67E5\u8BE2\u6761\u4EF6||""}'
}
this.$bus.$emit(${o}, (win) => {
    win._showGraphicsByLayerConditions(param)
})
`}export{a as default};
