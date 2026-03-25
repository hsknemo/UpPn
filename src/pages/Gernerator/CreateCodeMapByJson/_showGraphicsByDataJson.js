class TemplateCodeUtil {
    constructor(code) {
        this.code = code
    }

    formatCode() {
        var code = this.code
        return JSON.parse(JSON.stringify(code, null, 2))
    }
}


class CreateSymbol {
  constructor(args) {
    this.args = args
  }


  getSymbol() {
      var args = this.args
      var symbolType = {
        point: '_pointSymbol',
        line: '_lineSymbol',
        polygon: '_polygonSymbol',
      }
      return this[symbolType[args.撒点类型是]] ? new TemplateCodeUtil(this[symbolType[args.撒点类型是]]()).formatCode() : ''
  }

  _lineSymbol() {
      var args = this.args
      return `
    symbol: {
        type: '${args.定制撒点效果.类型 || 'simple-fill' }',
        color: ${args.定制撒点效果.颜色 || '[255, 255, 0, 0.8]'},
        outline: {
            color: ${args.定制撒点效果.边框颜色 || '[255, 255, 0, 0.8]'},
            width: "${args.定制撒点效果.大小.宽 || '[255, 255, 0, 0.8]'}"
        },
    },
      `
  }

  _polygonSymbol() {
    var args = this.args
    return `
  symbol: {
      type: '${args.定制撒点效果.类型 || 'simple-fill' }',
      color: ${args.定制撒点效果.颜色 || '[255, 255, 0, 0.8]'},
      outline: {
          color: ${args.定制撒点效果.边框颜色 || '[255, 255, 0, 0.8]'},
          width: "${args.定制撒点效果.大小.宽 || '[255, 255, 0, 0.8]'}"
      },
  },
    `
}

  _pointSymbol() {
    var args = this.args
    return  `
    symbol: {
        type: '${args.定制撒点效果.类型}',
        url:  this.${args.定制撒点效果.引用图片地址},
        width: '${args.定制撒点效果.大小.宽}',
        height: '${args.定制撒点效果.大小.高}',
    },
    `
  }
}

class CreateLoop {
    constructor(args) {
        this.args = args
    }

    getloop() {
        return new TemplateCodeUtil(this._loop()).formatCode()
    }

    _loop() {
        var args = this.args
        return `
let paramList = []

for (let i = 0; i < ${args.批量遍历对象 || 'data'}.length; i++) {
    let item = ${args.批量遍历对象 || 'data'}[i]
    let coords = item['${args.坐标参数是 || 'coordinates'}']

    paramList.push({
        coords: coords,
    })
}
        `
    }
}

export default function showGraphicsByDataJson(args) {
    let mapProp = args.地图触发prop || 'getMap'
    let isSymbol = new CreateSymbol(args).getSymbol()
    let isLoop = new CreateLoop(args).getloop()
    console.log(isSymbol)
   return  `
    ${isLoop}
const param = {
    type: '${args.撒点类型是}',
    clearOld: ${args.是否需要清除其他图层},
    clear: ${args.是否需要清除其他图层},
    operationLevel: 'point-level',
    ${JSON.parse(JSON.stringify(isSymbol, null, 2))}
    data: paramList,
}



this.$bus.$emit(${mapProp}, (win) => {
    win._showGraphicsByDataJson(param)
})

    `
}