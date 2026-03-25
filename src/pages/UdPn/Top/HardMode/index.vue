<script>
export default defineComponent({
  name: 'HardMode',
  setup() {
    var rightInput = reactive({
      setArr: [],
      encouragement: ['Yep! 666', '哇 ! 你真厉害 😄', '棒👍'],
      terrible: ['😞 小主你打错了哟~', '😬 退格再试试?', '😥 可能这个字太难了', '💪加油~'],
    })
    
    

    var leftInput = ref([])
    var equalInputIndex = ref(new Set())
    var unoEqualInputIndex = ref(new Set())

    function resetData() {
      if (!leftInput && !rightInput.setArr.length) {
        equalInputIndex.value = []
        return false
      }
      return true
    }

    function resetEqualInputIndex() {
      equalInputIndex.value = new Set()
      unoEqualInputIndex.value = new Set()
    }

    /* 赋值框中大段文字切割 */
    function onRightInput(event) {
      const value = event.target.value
      rightInput.setArr = value.split('')
    }

    /* 比较输入文字与复制文字是否相同 */
    function onLeftInputEqual() {
      resetEqualInputIndex()
      if (resetData()) {
        var splitInputText = leftInput.value.split('')
        splitInputText.forEach((text, index) => {
          if (rightInput.setArr[index] == text) {
            equalInputIndex.value.add(index)
          } else {
            unoEqualInputIndex.value.add(index)
          }
        })
      }
      
    }

    return {
      onRightInput,
      rightInput,
      leftInput,
      equalInputIndex,
      unoEqualInputIndex,
      onLeftInputEqual,
    }
  }
})
</script>


<template>
    <div
    class="max-full default-text height-2">
      {{ unoEqualInputIndex.size ? rightInput.terrible[Math.floor(Math.random()  * (rightInput.terrible.length + 1))] : rightInput.encouragement[Math.floor(Math.random()  * (rightInput.encouragement.length + 1))] }}
    </div>
    <div class="max-full f-text-left" v-if="rightInput.setArr.length">
          <span 
          :class="[equalInputIndex.has(index) ? 'curTxt-active' : '', unoEqualInputIndex.has(index) ? 'curTxt-wrong' : '']"
          class="idx-item"
           v-for="(item, index) in rightInput.setArr">
            {{item}}
          </span>
    </div>
    <div class="container" >
       <div class="right">
        <span class="default-text">OrginText</span>
        <textarea 
        class="default-textarea"
        @input="onRightInput" name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div class="left">
        <span class="default-text">TargetText</span>
        <el-input 
        class="input-area"
        type="textarea"
        rows="5"
        v-model="leftInput"
        @input="onLeftInputEqual"
        >
        </el-input>
      </div>
    </div>
</template>


<style lang="scss" scoped>
.f-text-left {
  text-align: left;
}
.height-2 {
  height: 2em;
}
.idx-item {
  display: inline-block;
  padding: 0.6em;
  margin: 0.34em;
  background-color: #9e9e9e;
  transition: all .3s;
  &.curTxt-active {
    color: green;
    transform: translateY(-0.3em);
  }
  &.curTxt-wrong {
    color: red;
  }
}

.input-area {
  ::v-deep textarea {
    color: var(--half-gray-128);
    background-color: unset;
  }
}

.container {
  display: flex;
  width: 600px;
  margin: auto;
  margin-top: 1.3em;
  .left, .right {
    width: 300px;
  }
  .right {
    
  }
}
</style>