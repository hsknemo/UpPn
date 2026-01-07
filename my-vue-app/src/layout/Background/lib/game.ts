interface GameInterface {
  width: number,
  height: number,
  state: any,
  canvas: any,
  ctx: any,
  init: Function,
  regisState: Function,
  clearState: Function,
  loadCircle?: Function,
  render: Function,
}


export const Game = function(canvas) {
  const Height = ref(document.documentElement.offsetHeight)
  const Width = ref(document.documentElement.offsetWidth)
  var o = {
    state: {},
    canvas: null,
    ctx: null,
    width: Width.value,
    height: Height.value,
  } as GameInterface
  const canvasDom = canvas.value
  const ctx = canvas.value.getContext('2d')
  canvas.value.style.width = Width.value
  o.ctx = ctx
  o.init = function() {
    o.canvas.width = Width.value
    o.canvas.height = Height.value
  }
  o.canvas = canvasDom
  /* 注册舞台对象, 数组 */
  o.regisState = function(state) {
    state.forEach(item => {
      o.state[item.name] = [item]
    })
  }
  /* 初始化舞台 */
  o.clearState = function() {
    o.canvas.width = o.canvas.width
    o.canvas.height = o.canvas.height
  }

  /* 画圆函数 */
  o.loadCircle = function(ball) {
    var ctx = o.ctx
    o.ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, ball.angle, true);
    ctx.fillStyle = ball.color
    ctx.fill();
  }

  /* 渲染舞台 */
  o.render = function() {
    setInterval(() => {
      o.clearState()
      for (const key in o.state) {
        var item = o.state[key]
        item.forEach(state => {
          state.update(o)
        })
      }
    }, 1000 / 60);
  }

  return o
}
