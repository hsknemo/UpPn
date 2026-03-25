<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup>
import { onMounted } from 'vue';



const canvas = ref()
const isDown = ref(false)

const startDraw = function (ctx, x, y) { 
    
    console.log(x, y)
    ctx.lineTo(x, y);

    ctx.stroke();

}

onMounted(function () {
    const domCanvas = canvas.value
    const pen = domCanvas.getContext('2d')

    domCanvas.addEventListener('mousedown', event => { 
        var mouseX= event.pageX  - domCanvas.offsetLeft;
         var mouseY= event.pageY - domCanvas.offsetTop;
        isDown.value = true
        var ctx = pen
        ctx.beginPath();
        ctx.lineWidth= 11;
        ctx.strokeStyle= '#ff0';
        ctx.moveTo(mouseX, mouseY);

        domCanvas.addEventListener('mousemove', e => { 
            console.log(isDown.value)
            if (isDown.value) { 
                console.log('按下移动', )
                var mouseX= e.pageX - domCanvas.offsetLeft;
                var mouseY= e.pageY - domCanvas.offsetTop;
                startDraw(pen, mouseX, mouseY)
            }
        })
    })

    document.addEventListener('mouseup', event => { 
        isDown.value = false
    })
    
    console.log({
        pen
    })
})

</script>



<style lang="scss">

canvas {
    width: 100%;
    height: 100%
}

.layout-container{
    width: 100%;
    height: calc(100% - 150px);
}
</style>