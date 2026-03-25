<script >
    import Editor from '../Editer.vue'
    export default {
        name: 'CreateCodeMapByJson',
        components: {
            Editor 
        },
        setup() {
            let inputVal = ref()

            let templatePointJson = {
                "main": "批量撒点代码",
                "地图触发prop": "getMap",
                "批量遍历对象": "data",
                "坐标参数是": "coords",
                "撒点类型是": "point",
                "产生地图层级是": "point-level",
                "是否需要清除其他图层": "false",
                "定制撒点效果": {
                    类型: 'picture-marker',
                    引用图片地址: 'url',
                    颜色: '[255, 255, 0, 0.8]',
                    大小: {
                        宽: '0px',
                        高: '0px'
                    }
                }
            }
            inputVal.value = JSON.stringify(templatePointJson, null, 2)
            let outputVal = ref()
            const globFile = import.meta.glob('./*.js')
            const codeMap = {
                '批量撒点代码': async (args) => {
                    const file = await (await globFile['./_showGraphicsByDataJson.js'])()
                    return await file.default(args)
                },
                '查询某个图层并显示': async (args) => {
                    const file = await (await globFile['./_showGraphicsByLayerConditions.js'])()
                    return await file.default(args)
                }
            }

            const formatCode = function(code) {
                return JSON.parse(JSON.stringify(code, null, 2))
            }

            const onUpdate = async function(val) {
                try {
                var code = JSON.parse(val)
                outputVal.value = formatCode(await codeMap[code.main](code))
        
                } catch (error) {
                    throw Error('错误' + error)
                }
            }

            onUpdate(inputVal.value)

            return {
                inputVal,
                outputVal,
                onUpdate,
            }
        }
    }
</script>

<template>
<div class="flex-wrap">
    <Editor
        :language="'json'"
        @update:value="onUpdate"
        class="editor" 
        :value="inputVal" 
        />

    <Editor 
        :language="'javascript'"
        class="editor"  
        :value="outputVal" />
</div>
</template>


<style lang="scss" scoped>
.flex-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    gap: 10px;
    .editor {
        height: 80vh;
        flex-basis: 50%;
    }
}
@media screen and (max-width: 759px) {
   .flex-wrap {
    display: unset;
    margin: 20px;
    gap: 10px;
    justify-content: unset;
    align-items: unset;
    .editor {
        width: 100vw;
        height: 40vh;
    }
} 
}
</style>