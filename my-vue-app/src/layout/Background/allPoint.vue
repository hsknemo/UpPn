<script setup>
import { Game } from '@/layout/Background/lib/game'

const canvas = ref(null)

class PointState {
  constructor() {
    this.gap = 30
    this.name = 'PointState'
    this.color = '#494949'
    this.radius = 1.5
    this.x = Math.random() * canvas.value.width
    this.y = Math.random() * canvas.value.height

    let width = canvas.value.width
    let height = canvas.value.height
    let arr = []

    for (let i = 0; i <= width; i+=this.gap) {
      for (let j = 0; j <= height; j+=this.gap) {
        arr.push([i, j])
      }
    }
    this.pointRect = arr
    this.keyStatus = {}
    let ctx = canvas.value.getContext('2d')
    this.init(ctx)

  }

  init(ctx) {
    let g = 51
    this.pointRect.forEach((item, index) => {
      let cosNum = item[1]
      if (!this.keyStatus[index]) {
        this.keyStatus[index] = {
          x: item[0],
          y: item[1],
          cosNum: cosNum
        }
      }

      this.draw(ctx, item[0], this.keyStatus[index].cosNum)
    })
  }

  draw(ctx, x, y) {
    ctx.beginPath()
    ctx.arc(x, y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }


  update(game) {
   this.init(game.ctx)
  }
}

onMounted(() => {
  const game = Game(canvas)
  game.init()
  game.regisState([new PointState()])
  game.render()
})
</script>

<template>
  <canvas ref="canvas" id="canvas"></canvas>
  <div ref="dic"></div>
</template>

<style scoped lang="scss">
#canvas {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>

