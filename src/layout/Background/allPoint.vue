<script setup>
import { Game } from '@/layout/Background/lib/game'
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let game = null

class PointState {
  constructor() {
    this.gap = 25
    this.name = 'PointState'
    this.color = '#333333' // 颜色稍微暗一点
    this.radius = 1.5
    this.x = Math.random() * canvas.value.width
    this.y = Math.random() * canvas.value.height

    let width = canvas.value.width
    let height = canvas.value.height
    let arr = []

    // 按行生成点
    for (let j = 0; j <= height; j+=this.gap) {
      for (let i = 0; i <= width; i+=this.gap) {
        arr.push([i, j])
      }
    }
    this.pointRect = arr
    this.keyStatus = {}
    this.animationIndex = 0
    this.animationDirection = 1 // 1: 正向, -1: 反向
    this.animationSpeed = 0.1 // 动画速度稍微快一点
    this.currentAnimationStep = 0
    this.maxOpacity = 0.8 // 透明度稍微低一点
    this.opacityStep = 0.15 // 透明度变化速度稍微快一点
    let ctx = canvas.value.getContext('2d')
    this.init(ctx)
  }

  init(ctx, game = {}) {
    // 计算当前应该显示的点的索引
    const currentPointIndex = Math.floor(this.animationIndex)
    
    this.pointRect.forEach((item, index) => {
      if (!this.keyStatus[index]) {
        this.keyStatus[index] = {
          x: item[0],
          y: item[1],
          opacity: 0,
          centerX: item[0],
          centerY: item[1],
        }
      }

      // 根据动画进度设置点的透明度
      if (index < currentPointIndex) {
        // 已经完全显示的点
        if (this.keyStatus[index].opacity < this.maxOpacity) {
          this.keyStatus[index].opacity += this.opacityStep
          if (this.keyStatus[index].opacity > this.maxOpacity) {
            this.keyStatus[index].opacity = this.maxOpacity
          }
        }
      } else if (index === currentPointIndex) {
        // 当前正在显示的点
        if (this.keyStatus[index].opacity < this.maxOpacity) {
          this.keyStatus[index].opacity += this.opacityStep
          if (this.keyStatus[index].opacity > this.maxOpacity) {
            this.keyStatus[index].opacity = this.maxOpacity
          }
        }
      } else {
        // 还未显示的点
        if (this.keyStatus[index].opacity > 0) {
          this.keyStatus[index].opacity -= this.opacityStep
          if (this.keyStatus[index].opacity < 0) {
            this.keyStatus[index].opacity = 0
          }
        }
      }

      // 绘制点
      if (this.keyStatus[index].opacity > 0) {
        this.draw(ctx, this.keyStatus[index].x, this.keyStatus[index].y, this.keyStatus[index].opacity)
      }
    })

    // 更新动画索引
    if (this.animationDirection === 1) {
      this.animationIndex += this.animationSpeed
      if (this.animationIndex >= this.pointRect.length) {
        this.animationDirection = -1
      }
    } else {
      this.animationIndex -= this.animationSpeed
      if (this.animationIndex <= 0) {
        this.animationDirection = 1
      }
    }
  }

  draw(ctx, x, y, opacity) {
    ctx.beginPath()
    ctx.arc(x, y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(51, 51, 51, ${opacity})`
    ctx.fill()
  }

  update(game) {
    this.init(game.ctx, game)
  }
}

// 处理屏幕缩放事件
const handleResize = () => {
  if (game) {
    const Width = document.documentElement.offsetWidth
    const Height = document.documentElement.offsetHeight
    game.width = Width
    game.height = Height
    game.canvas.width = Width
    game.canvas.height = Height
    game.canvas.style.width = Width + 'px'
  }
}

onMounted(() => {
  game = Game(canvas)
  game.init()
  game.regisState([new PointState()])
  game.render()
  
  // 监听屏幕缩放事件
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // 清理事件监听，防止内存泄露
  window.removeEventListener('resize', handleResize)
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

