<script setup>
import { Game } from '@/layout/Background/lib/game'

const canvas = ref(null)

class PointState {
  constructor() {
    this.gap = 25
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

  init(ctx, game = {}) {
    this.pointRect.forEach((item, index) => {
      if (!this.keyStatus[index]) {
        this.keyStatus[index] = {
          x: item[0],
          y: item[1],
          angle: 0,
          amplitude: 5,
          speed: 0.01,
          trackRadius: 2,
          centerX: item[0],
          centerY: item[1],

        }
      }


      let currentX = this.keyStatus[index].centerX + this.keyStatus[index].trackRadius * Math.cos(this.keyStatus[index].angle);
      let currentY = this.keyStatus[index].centerY + this.keyStatus[index].trackRadius * Math.sin(this.keyStatus[index].angle);

      // 判断当前坐标在不在鼠标经过的范围, 鼠标范围大一点
      let mouseRange = 10
      if (game.mouseX >= currentX - mouseRange && game.mouseX <= currentX + mouseRange && game.mouseY >= currentY - mouseRange && game.mouseY <= currentY + mouseRange) {
        this.keyStatus[index].speed = 1
      } else {
        this.keyStatus[index].speed = .01
      }

      // const currentY = this.keyStatus[index].y + this.keyStatus[index].amplitude * Math.sin(this.keyStatus[index].angle);
      this.keyStatus[index].angle +=  this.keyStatus[index].speed;
      this.draw(ctx, currentX, currentY)
    })
  }

  draw(ctx, x, y) {
    ctx.beginPath()
    ctx.arc(x, y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }


  update(game) {
   this.init(game.ctx, game)
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

