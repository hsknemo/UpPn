export default function _showGraphicsByLayerConditions(args) { 
    let mapProp = args.地图触发prop || 'getMap'
    return `
const param = {
    isZoomAt: ${args.是否缩放地图 || false},
    clearOld: ${args.是否需要清除其他图层 || false},
    operationLevel:  ${args.产生地图层级是 || 'layerOperationLevel'},
    layer: '${args.查询图层名称}',
    where: '${args.查询条件 || ''}'
}
this.$bus.$emit(${mapProp}, (win) => {
    win._showGraphicsByLayerConditions(param)
})
`
}