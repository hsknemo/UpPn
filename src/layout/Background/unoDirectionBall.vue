<script setup>
  import { Game } from '@/layout/Background/lib/game'

  const canvas = ref(null)

  const Ball = function() {
    const o = {
      x: 60,
      y: 65,
      type: 'ball',
      name: 'ball',
      speedX: 5,
      speedY: 5,
      size: 8,
      angle: Math.PI * 2,
      color: 'rgb(127, 127, 127)'
    }

    o.move = function() {
      o.x += o.speedX
      o.y += o.speedY
    }

    o.update = function(game) {
      o.move()
      if (o.x - o.size / 2  < 0 || o.x + o.size > game.width) {
        o.speedX = -o.speedX
      }
      if (o.y - o.size / 2 < 0 || o.y + o.size > game.height) {
        o.speedY = -o.speedY
      }
    }

    return o
  }


  onMounted(() => {
    const ball = Ball()
    const game = Game(canvas)
    game.init()
    game.regisState([ball])
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
