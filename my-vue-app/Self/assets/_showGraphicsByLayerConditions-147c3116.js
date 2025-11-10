function a(e){let o=e.地图触发prop||"getMap";return`
const param = {
    isZoomAt: ${e.是否缩放地图||!1},
    clearOld: ${e.是否需要清除其他图层||!1},
    operationLevel:  ${e.产生地图层级是||"layerOperationLevel"},
    layer: '${e.查询图层名称}',
    where: '${e.查询条件||""}'
}
this.$bus.$emit(${o}, (win) => {
    win._showGraphicsByLayerConditions(param)
})
`}export{a as default};
