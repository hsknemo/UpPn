<script setup>
  import words  from '../Word/word.js'
  var log = console.log.bind(console);

  const wordsMap = words.wordsMap.rule.自然码
  const pinKeys = reactive(Object.keys(wordsMap))
  const wordsMapReactive = reactive(wordsMap)
  const currentDownKeys = ref('')

  /* 键盘按下注册 key, 根据当前 key 去判断按下的是哪个字母 */
  const onKeyDown = function(event) {
    var key = event.key
    currentDownKeys.value = pinKeys.includes(key) ? key : ''
  }

  const onKeyUp = function(event) {
    currentDownKeys.value = ''
  }

  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)

  let keyRowThird = ref([
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ])
</script>

<template>
<div class="keyMap">
  <div :key="idx" class="keyRow" v-for="(it, idx) in keyRowThird">
    <div class="pin-item"
         :key="index"
         :class="currentDownKeys === item ? 'pin-item-down' : ''"
         v-for="(item, index) in it"
    >
      <div class="top">{{ item }}</div>
      <div class="bottom">{{ wordsMapReactive[item] }}</div>
    </div>
  </div>

</div>
</template>

<style scoped lang="scss">
.keyMap {
    width: 50%;
    margin: 30px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    .keyRow {
      display: flex;
    }

  .pin-item {
    display: inline-block;
    width: 100px;
    height: 100px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    outline: 1px solid #a2a2a259;
    transition: all .1s;
    &.pin-item-down {
      outline: 3px dashed #353535;
    }
    .top {
      color: #d07575;
    }
    .bottom {
      margin-top: 20px;
      color: #795004;
      white-space: pre-line;
    }
  }
}
</style>
