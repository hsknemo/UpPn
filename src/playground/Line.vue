<template>
  <div class="line-container" ref="parentContainer" @mouseleave="isStartMove = false">

<!--    <div  @click="onClickPic" class="content" >-->
<!--      <div class="warning" v-if="warning">-->
<!--        <p class="position-text">{{ warningConfig.num || '' }}</p>-->
<!--        <span style="display: block;     transform: translate(3px, -13px) rotate(42deg);-->
<!--    font-size: 12px;">!</span>-->
<!--      </div>-->
<!--      <div class="danger" v-if="danger">-->
<!--        <p class="position-text">{{ dangerConfig.num || ''}}</p>-->
<!--        <span style="display: block; transform: translate(3px, -13px) rotate(42deg);font-size: 12px;">!</span>-->
<!--      </div>-->

<!--      <img src="./imgs/2.jpg" alt="">-->
<!--    </div>-->

<div class="dialog-content-realLine" ref="content">
<template
  v-for="(item, index) of baseLine"
>
  <div>

    <div class="real-line-block"
         :data-set-record="item.option"
         :data-set-isHasData="item.data.length !== 0"
         :class="[
           {
             'border-top': item.option.includes('top'),
             'border-bottom': item.option.includes('bottom'),
             'border-right': item.option.includes('right'),
             'border-left': item.option.includes('left'),
             'index-end': isEndData(index, Object.keys(baseLine).length)
           }
         ]"
    >
        <template v-if="item.data.length">
        <!--                循环电线上面的数据 lineData 包含导线信息 接头信息-->
        <template v-for="(lineData, idx) in item.data">

          <div class="dl-point"
               :lineName="lineData.lineName"
               :style="getStyle(item.option, lineData.sumLen)"
               :data-set-width="lineData.sumLen">
            <template v-for="it in lineData.lineData">
              <div
                  v-if="it.pointShow"
                  :style="activeStyle(lineData.sumLen, lineData.lineData, it.pointType, item.option)"
                  :class="[
                      {
                        'yh-point warning': it.pointType === '隐患点',
                        'gz-point': it.pointType === '故障',
                        'dz-point': it.pointType === '电站',
                        'dx-point': it.pointType === '导线',
                        'jt-point': it.pointType === '接头'
                      }
            ]">
                <span
                    :class="[
                        {'dz-point-text': it.pointType === '电站'},
                        {'warning-point-text': it.pointType === '隐患点'}
                    ]"
                >
                {{ isShowText(it.pointName, it.pointType) }}
                </span>
              </div>

            </template>
          </div>
        </template>
      </template>

    </div>
  </div>
</template>

</div>

  </div>
</template>

<script>
  // import LineData from './config/LineConfig/index'

  export default {
    name: 'Line.vue',

    props: {
      dangerConfig: {
        type: Object,
      },

      warningConfig: {
        type: Object,
      },

      warning: {
        type: Boolean,
        default: _ => (false),
      },
      danger: {
        type: Boolean,
        default: _ => (false),
      },
    },

    data () {
      return {
        show: false,
        // LineData: LineData.lineData,
        baseLine: {},

        isStartMove: false,

        x: 0,
        y: 0,

        currentDomScale: 1,
      }
    },

    watch: {
      show: {
        handler (val) {
          if (val) {
            setTimeout(
              _ => {
                // this.addListener()
              }
              , 1000)
          }
        },
        immediate: true,
      },
    },

    computed: {
      allLength () {
        let sum = 0
        this.LineData.forEach(item => {
          if (item.pointLength) {
            sum += Number(item.pointLength)
          }
        })

        return sum
      },
    },

    mounted () {
      // this.addListener()
      this.init()
    },

    methods: {
      isShowText(text, type) {
        if (type === '隐患点') {
          return '!'
        }
        return text
      },
      isEndData(index, baseLineLength) {
        return Number(index) + 1 === baseLineLength
      },
      init () {
        // 一组是 上 右 下 左 这是顺序不能改变
        let lineMapSelect = {
          0: 'top-1000',
          1: 'right-200',
          2: 'bottom-1000',
          3: 'left-200',
        }

        // eslint-disable-next-line camelcase
        let give_line_couple = function (num) {
          // eslint-disable-next-line camelcase
          let build_line_map = new Map()
          let s = 0
          let i = 0
          let index = 0
          while (s <= num) {
            build_line_map.set(index, lineMapSelect[i])
            s += Number(lineMapSelect[i].split('-')[1])
            index += 1
            if (i >= 3) {
              i = 0
            } else {
              i++
            }
          }

          return build_line_map
        }
        // 绘制线路底图线条
        // let testLine = [590, 1300, 3800, 1200, 600]
        let testLine = [500, 1700, 1900, 2900]

        let testLine1 = [
          {
            lineName: '电缆1',
            sumLen: 500,
            lineData: [
              {
                pointType: '导线',
                pointName: '导线开始',
                pointShow: true,
              },
              {
                pointType: '接头',
                pointName: '*',
                pointShow: true,
              },

              {
                pointType: '隐患点',
                pointName: 'xxxx故障',
                pointShow: false,
              },
              {
                pointType: '导线',
                pointName: '导线2',
                pointShow: true,
              },
              {
                pointType: '接头',
                pointName: '$',
                pointShow: true,
              },
            ],
          },
          {
            lineName: '电缆2',
            sumLen: 500,
            lineData: [
              {
                pointType: '导线',
                pointName: '导线1',
                pointShow: true,
              },
              {
                pointType: '接头',
                pointName: '*',
                pointShow: true,
              },
              {
                pointType: '隐患点',
                pointName: 'xxxx故障',
                pointShow: false,
              },
              {
                pointType: '导线',
                pointName: '导线2',
                pointShow: true,
              },
              {
                pointType: '接头',
                pointName: '$',
                pointShow: true,
              },
            ],
          },
          {
            lineName: '电缆3',
            sumLen: 500,
            lineData: [
              {
                pointType: '导线',
                pointName: '导线段',
                pointShow: true,
              },
              {
                pointType: '接头',
                pointName: '*',
                pointShow: true,
              },
              {
                pointType: '隐患点',
                pointName: 'xxxx故障',
                pointShow: false,
              },
              {
                pointType: '导线',
                pointName: '导线段',
                pointShow: true,
              },
              {
                pointType: '接头',
                pointName: '$',
                pointShow: true,
              },
            ],
          },
          {
            lineName: '电缆4',
            sumLen: 2900,
            lineData: [
              {
                pointType: '导线',
                pointName: '导线段',
                pointShow: true,
              },
              {
                pointType: '接头',
                pointName: '*',
                pointShow: true,
              },
              {
                pointType: '隐患点',
                pointName: 'xxxx故障',
                pointShow: false,
              },
              {
                pointType: '导线',
                pointName: '导线段',
                pointShow: true,
              },
              {
                pointType: '接头',
                pointName: '$',
                pointShow: true,
              },
            ],
          },
        ]

        let n = 0

        testLine1.forEach(item => {
          n += item.sumLen + 100
        })
        let findLine = give_line_couple(n)
        let revertObj = {}
        findLine.forEach((item, index) => {
          revertObj[index] = {
            start: '普通点位',
            // 生成的线路配置项
            option: item,
            // 当前线路上的数据信息
            data: [],
            // 剩余长度 注意转化数字
            lastLength: Number(item.split('-')[1]),
          }
        })
        let obj = Object.values(revertObj)
        let loopIndex = 0
        let secondIndex = 0
        let sumNumber = 0
        while (secondIndex < testLine1.length) {
          if (loopIndex > Object.keys(obj).length || !obj[loopIndex]) {
            break
          }
          sumNumber += obj[loopIndex].lastLength

          if (sumNumber >= testLine1[secondIndex].sumLen) {
            obj[loopIndex].data.push(testLine1[secondIndex])
            obj[loopIndex].lastLength = sumNumber - testLine1[secondIndex].sumLen
            secondIndex += 1
            sumNumber = 0
          } else {
            loopIndex += 1
          }
        }

        // 存放起始电站
        console.log( revertObj[0], '22323')
        revertObj[0].data[0].lineData.unshift({
          start: '电站开始',
          pointType: '电站',
          pointShow: true,
          pointName: '采新变电站'
        })


        let lastEndLen = revertObj[Object.keys(revertObj).length - 1].data.length
        let setIndex = lastEndLen < -1 ? 0 : lastEndLen
        let lastIndex = Object.keys(revertObj).length - 1
        let lastDz = {
          start: '电站结束',
          pointType: '电站',
          pointShow: true,
          pointName: '采夫变电站'
        }
        // 存放终点电站
        if (revertObj[lastIndex].data[setIndex] && revertObj[lastIndex].data[setIndex].lineData) {
          revertObj[lastIndex].data[setIndex].lineData.unshift(lastDz)
        } else {
          revertObj[lastIndex].data[0] = {
            lineData: [
              lastDz
            ]
          }
        }

        console.log(revertObj)

        this.baseLine = revertObj

        this.findGzPoint('电缆1')
      },

      onClickPic () {
        this.show = true
      },

      compuPercent (num) {
        return (962 * (num / this.allLength)) + 'px'
      },

      setStyle (dom, key, value) {
        dom.style[key] = value
      },

      updateScale (y) {
        const content = this.$refs.content
        if (y < 0) {
          this.currentDomScale += 0.1
          // 上滚轮
          // 放大
        }

        if (y > 0) {
          this.currentDomScale -= 0.1
          // 下滚轮
          // 缩小
        }

        if (this.currentDomScale <= 0.3) {
          // 只能缩放到 0
          this.currentDomScale = 0.3
          this.controJtShow(false)
        }
        if (this.currentDomScale >= 2) {
          // 放大只能到 2级
          this.currentDomScale = 2
          this.controJtShow(true)
        }

        console.log({
          当前缩放层级: this.currentDomScale,
        })
        this.setStyle(content, 'transform', `scale(${this.currentDomScale})`)
        this.setStyle(this.$refs.position, 'transform', `rotate(-43deg) scale(${this.currentDomScale})`)
      },

      // 层级控制接头的显示与隐藏
      controJtShow (bool) {
        this.LineData.forEach(item => {
          if (item.pointType === '接头') {
            if (bool) {
              item.positionLevel = 1
            } else {
              item.positionLevel = 2
            }
          }
        })
      },

      updatePosition (x, y) {
        this.x = x
        this.y = y
      },

      collide (moveNum, maxNumber, o) {
        console.log({
          moveNum, maxNumber, o,
        })
        let n = moveNum

        if (n > maxNumber / 2) {
          return maxNumber / 2
        }
        if (n < -maxNumber / 2) {
          return -maxNumber / 2
        }

        return n
      },

      addListener () {
        const content = this.$refs.content
        console.log({
          content,
        })
        content.addEventListener('wheel', event => {
          console.log(event)
          const deltaY = event.deltaY
          this.updateScale(deltaY)
        }, false)

        content.addEventListener('mouseup', event => {
          this.isStartMove = false
          content.removeEventListener('mouseup')
          content.removeEventListener('mousemove')
        }, false)

        content.addEventListener('mousedown', event => {
          console.log('123123123123')
          event.stopPropagation()
          event.preventDefault()
          this.x = event.clientX - content.offsetLeft
          this.y = event.clientY - content.offsetTop
          this.isStartMove = true
        }, false)

        content.addEventListener('mousemove', event => {
          event.stopPropagation()
          event.preventDefault()
          if (this.isStartMove) {
            let x = event.clientX - this.x
            let y = event.clientY - this.y
            // x = this.collide(x, this.$refs.parentContainer.offsetWidth, 'x')
            // y = this.collide(y, this.$refs.parentContainer.offsetHeight, 'y')
            // this.updatePosition(x, y)
            this.setStyle(content, 'transform', `scale(${this.currentDomScale})`)
            this.setStyle(content, 'top', `${y}px`)
            this.setStyle(content, 'left', `${x}px`)
          }
        }, false)
      },

      /**
       * 计算线的宽度
       * @param position
       * @param width
       */
      getStyle (position, width) {
        if (position.includes('top')) {
          if (width > 1000) {
            width = width / 10
          }
          return `width: ${width}px`
        }
        if (position.includes('right')) {
          return `width: ${45}px`
        }
      },

      /**
       *
       * @param totalSumLen 当前电缆的总长度
       * @param elementLen 当前电缆下面的元素数量
       * @param pointType 当前传入点的类型
       * @param position 所处位置
       */
      activeStyle (totalSumLen, element, pointType, position) {
        console.log(totalSumLen, position)
          // if (position.includes('1000')) {
          //   totalSumLen / 1000
          // }
        if (totalSumLen >= 1000) {
          totalSumLen /= 10
        }
        // 基础接头的宽度
        let baseJtWidth = 40
        // 导线的数量
        let dxSum = 0
        // 接头的数量
        let jtSum = 0

        console.log({
          element
        })

        element.forEach(item => {
          if (item.pointType === '导线') {
            dxSum += 1
          }
          if (item.pointType === '接头') {
            jtSum += 1
          }
        })

        // 减去接头的数量
        let miunsJtNum = totalSumLen - jtSum * baseJtWidth
        // 一根导线的长度
        let oneDxLineLen = miunsJtNum / dxSum

        if (pointType === '导线') {
          console.log({
            position
          })
          // 左、右 不需要宽度
          if (['left-200', 'right-200'].includes(position)) {
            return `width: 100%; height: 25px`
          } else {
            return `width: ${oneDxLineLen}px`
          }

        } else if (pointType === '接头') {
          return `width: ${baseJtWidth}px`
        }

      },

      /**
       * 找寻故障点 显示
       */
      findGzPoint(lineName) {
        const baseLine = this.baseLine

        for (const baseLineKey in baseLine) {
          let findData = baseLine[baseLineKey].data
          if (Array.isArray(findData) && findData.length) {
            findData.forEach(item => {
              if (item.lineName === lineName) {
                item.lineData.forEach(itm => {
                  if (itm.pointType === '隐患点') {
                    itm.pointShow = true
                  }
                })
              }
            })
          }
        }
        console.log({
          baseLine,
        })
      },
    },
  }
</script>

<style scoped lang="scss">
.line-container {
  //background-color: #1b3f57;
  border-radius: 10px;
  height: 900px;
  overflow: hidden;
  position: relative;

  .content {
    position: absolute;
    //width: 100vw;
    width: 100%;
    display: flex;
    align-items: center;
    height: 100%;
    //background-color: red;
    //transition: all 1s;

    img {
      margin: auto;
      cursor: pointer;
    }
  }

  * {
    box-sizing: border-box;
  }
  .relative {
    position: relative;
    height: 100%;
  }
  .absolute {
    position: absolute;
  }
  .line-item {
    //height: 50px;
    //background-color: green;
  }

  .cursorPointer {
    cursor: pointer;
  }

  .bdz-point  {
    width: 30px;
    height: 30px;
    //background-color: red;
    &.img {
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url('./imgs/jz.png');
    }
    span.text {
      top: 37px;
      color: rgb(3,231,240);
    }
  }

  .dl-point {
    height: 10px;
    span.text {
      top: -28px;
      white-space: nowrap;
      color: rgb(5,125,201);
    }
  }

  .jt-point {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: red;
    &.img {
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('./imgs/jt.png');
    }

    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-52%, 14%);
    }
    span.text {

      top: 26px;
      color: black;
    }
  }

  .dx-point {
    width: 108px;
    height: 10px;
    border-top: 3px dashed blue;
    //background-color: rgb(44,98,132);
    span.text {
      top: 26px;
      color: #fff;
    }
  }
}

.bigLine {
  ::v-deep {
    .el-dialog{
      //width: 100vw !important;
      //height: 100vh !important;
      margin-left: 267px !important;
      //margin-top: 0 !important;
      z-index: 1000;
    }
  }
}

.cont {
  background-color: #1b3f57;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    z-index: 100;
  }
}

.content, .cont  {
  .danger, .warning {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 16%;
    left: 52%;
    border: 10px solid transparent;
    border-radius: 4px;
    transform: rotate(-43deg);
    z-index: 10000;
    &:before {
      content: '';
      position: absolute;
      top: 1px;
      left: -6px;
      border: 3px solid transparent;
      border-top-color: #fff;
      border-right-color: #fff;
      transform: rotate(180deg);
    }

    span {
      color: #fff;
    }

  }

  .danger {
    left: 30%;
  }

  .warning {
    border-top-color: #f38d17;
    border-right-color: #f38d17;
    animation: animBlur 1s linear infinite;
    /* background-color: #f38d17; */

  }
  .danger {
    border-top-color: #ff3636;
    border-right-color: #ff3636;
    animation: aniDanger 1s linear infinite;
    /* background-color: #f38d17; */

  }
}

.cont {
  .warning, .danger {
    top: 44.5%;
    left: 91.1%;

    &:before {
      content: '';
      position: absolute;
      top: 0px;
      left: -6px;
    }
  }

  .danger {
    top: 24.6%;
    left: 33%;
  }

}

@keyframes animBlur {
  from {
    filter: drop-shadow(0px 1px 5px #dada00);
  }

  to {
    filter: drop-shadow(0px 1px 5px #ee7c0a);
  }
}

@keyframes aniDanger {
  from {
    filter: drop-shadow(0px 1px 5px #ff6574);
  }

  to {
    filter: drop-shadow(0px 1px 5px #c20b1e);
  }
}

.position-text {
  white-space: nowrap;
  transform: rotate(43deg) translate(-19px, -25px);
  color: #fff;
  font-size: 12px;
  position: absolute;
  top: 12px;
  left: -4px;
}
$baseLineColor: rgba(222, 212, 212, 0.51);
.index-end {
  flex-direction: row-reverse;
}
.dialog-content-realLine {
  width: 100%;
  padding: 57px;
  height: 100%;
  overflow: auto;
  .real-line-block {
    position: relative;
    align-items: center;
    display: flex;
    * {
      box-sizing: border-box;
    }

    &.border-top {
      border: 1px  solid transparent;
      border-top-color: $baseLineColor;
      .dl-point {
        //position: absolute;
      }
    }

    &.border-right {
      border: 1px  solid transparent;
      border-right-color: $baseLineColor;
      height: 100px;
      .dl-point {
        position: absolute;
        flex-direction: column;
        right: -23px;
        top: 13px;
      }
    }

    &.border-left {
      border: 1px  solid transparent;
      border-left-color: $baseLineColor;
      height: 100px;
      .dl-point {
        position: absolute;
        flex-direction: column;
      }
    }

    &.border-bottom {
      border: 1px  solid transparent;
      border-bottom-color: $baseLineColor;
      .dl-point {
        position: absolute;
      }
    }

    .dl-point {
      display: flex;
    }

    .dx-point {
      //background-color: coral;
    }

    .dx-point, .jt-point {
      color: #fff;
      text-align: center;
    }

    .gz-point {
      animation: blink .3s linear;
    }

    .dz-point {
      position: relative;
      background-color: red;
      width: 100px;
      height: 47px;
      top: -20px;
    }
      .dz-point-text {
        position: absolute;
        color: #fff;
        font-size: 12px;
        left: 10px;
        top: 57px;
      }
  }
}

.danger, .warning {
  position: absolute;
  width: 10px;
  height: 10px;
  top: -318%;
  left: 52%;
  border: 15px solid transparent;
  border-radius: 4px;
  transform: rotate(-43deg);
  z-index: 10000;
  &:before {
    content: '';
    position: absolute;
    top: 1px;
    left: -6px;
    border: 3px solid transparent;
    border-top-color: #fff;
    border-right-color: #fff;
    transform: rotate(180deg);
  }

  span {
    color: #fff;
  }

}

.danger {
  left: 30%;
}

.warning {
  border-top-color: #f38d17;
  border-right-color: #f38d17;
  animation: animBlur 1s linear infinite;
  /* background-color: #f38d17; */

}
.danger {
  border-top-color: #ff3636;
  border-right-color: #ff3636;
  animation: aniDanger 1s linear infinite;
  /* background-color: #f38d17; */

}


.warning-point-text {
  display: block;
  transform: translate(3px, -19px) rotate(42deg);
}

</style>
