<style scoped>

</style>

<template>
  <div class="major-cotainer">
    <span v-if="mode === 'text'" v-text="value"></span>

    <el-select
        style="width: 100%"
        v-if="mode === 'select'"
        :multiple="multiMode"
        clearable
        @change="currentSelect"
        v-model='tempValue'>
      <template v-for="(item, index) in options">
        <el-option :label="item[selectLableName]" :value="item[selectValueName]"></el-option>
      </template>
    </el-select>
  </div>
</template>

<script>
/**
* @Desc: 中间封装 el-select 功能 该组件会打出对应方法修改父级组件值
* @author WaterMelon
* @date 2022/3/9 2:54 下午
*/

export default {
  name: 'majorSelect',

  props: {
    getChinese: {
      type: Boolean,
      default: false
    },
    // 开启多选模式, 组件会自动将值转化为字符串
    multiMode: {
      type: Boolean,
      defalut: false
    },
    /*
    *  vmodele 对象向子组件 props 传值, 必须是对象, 如果是变量会报错
    *  */
    value: {
      type: Object
    },
    /* 虚假监控值 测试阶段 */
    notStr: {
      type: String
    },
    monitorVarible: {
      type: String
    },
    /* 需要选择变量项名称 */
    selectLableName: {
      type: String,
      require: true,
      default: _ => 'dictName'
    },
    selectValueName: {
      type: String,
      require: true,
      default: _ => 'dictCode'
    },
    options: {
      type: Array,
      require: true
    },
    // 必须传入改字段, 对应的是父级绑定的值
    realData: {
      type: [String, Array],
      require: true
    },
    /* 开启文本格式 与 选择模式 */
    mode: {
      type: String,
      default: 'select'
    }
  },
  created() {
    // this.init()
  },
  watch: {
    realData: {
      handler(val) {
        this.$set(this, 'tempValue', '')
        if (val) {
          if (this.multiMode) {
            var log = console.log.bind(console)
            log(val.split(','), 'vl')
            this.tempValue = val.split(',')
          } else {
            this.tempValue = val
          }
        }
      },
    }
  },
  data() {
    return {
      tempValue: ''
    }
  },

  methods: {

    /**
     * 编码
     * @param value
     */
    processChineseValue(value) {
      var o = {
        name: [],
        processName: '',
        processEngName: ''
      }
      value.forEach(item => {
        var fites = (this.options.filter(oitem => oitem[this.selectValueName] === item))
        if (fites.length) {
          o.name.push(fites[0][this.selectLableName])
          o.processName += `,'${fites[0][this.selectLableName]}'`
          o.processEngName += `,'${fites[0][this.selectValueName]}'`

        }
      })

      if (o.processName) {
        o.processName = o.processName.replace(/,/, '')
        /**
         * 得到的结果是:
         *          "'Wxxxx', 'Wxxxxx', 'Wxxxxx'"
         */
      }

      if (o.processEngName) {
        o.processEngName = o.processEngName.replace(/,/, '')
        /**
         * 得到的结果是:
         *          "'中文 1', '中文 2', '中文 3'"
         */
      }

      return o
    },

    currentSelect(value) {
      // 多选情况下
      if (Array.isArray(value)) {
        this.$set(this.value, this.monitorVarible, this.tempValue.join(','))
        if (this.getChinese) {
          this.$emit('currentSelect', {
            orginName: value,
            chineseName: this.processChineseValue(value)
          })
        }

      } else {
        this.value[this.monitorVarible] = this.tempValue
      }
    },
  }
}

</script>
