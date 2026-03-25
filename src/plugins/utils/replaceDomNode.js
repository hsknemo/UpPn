/**
 *
 *
 * @description 替换dom节点
 * @param parentSelecor 父级选择器
 * @param oldNode 待替换的节点
 * @param newNode 新节点
 */
export default function replaceDomNode(parentSelecor, newNode, oldNode) {
  parentSelecor.replaceChild(newNode, oldNode)
}
