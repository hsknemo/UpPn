<script>
import Light from './IconComponent/Light.vue'
import Night from './IconComponent/Night.vue'
import { usePreferredColorScheme } from '@vueuse/core'

export default defineComponent({
  name: 'SunCutNight',
  components: {
    Light,
    Night,
  },


  setup() {
    const preferredColor = usePreferredColorScheme()
    const currentTheme = ref(true)

    /* 设置根元素的换肤属性 */
    function addBodyAttr(mode, removeClass) {
      document.documentElement.classList.add(mode)
      document.documentElement.classList.remove(removeClass)
    }


    function onThemeCut() {
      nextTick(_ => {
          setTimeout(() => {
            changeMode(preferredColor.value)
            currentTheme.value = preferredColor.value
          }, 100);
      })
      window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
        console.log('运行')
        nextTick(_ => {
          setTimeout(() => {
            changeMode(preferredColor.value)
          }, 100);
        })
      })
    }

    /* 点击图标换肤 */
    function changeMode(mode) {
      const modeMap = {
        light: _ => {
          currentTheme.value = 'light'
          addBodyAttr('light', 'dark')
        },
        dark: _ => {
          currentTheme.value = 'dark'
          addBodyAttr('dark', 'light')
        },
        'no-preference': _ => {
          currentTheme.value = 'light'
          addBodyAttr('light', 'dark')
        }
      }
      return modeMap[mode]()
    }


    function __main() {
      onThemeCut()
    }

    __main()

    return {
      preferredColor,
      changeMode,
      currentTheme,
    }
  }
})
</script>

<template>
  <div class="s-c-n">
    <Light
      class="icon"
     @click="changeMode('dark')"
      v-if="currentTheme === 'light'"
    />

    <Night
      class="icon"
     @click="changeMode('light')"
     v-if="currentTheme === 'dark'"
    />
  </div>
</template>

<style scoped lang="scss">
.s-c-n {
  cursor: pointer;
  .icon {
    transition: color .3s ease;
      &:hover {
        color: var(--intro-h1);
      }
  }
}
.icon-size {
  font-size: var(--cut-theme-font-icon-size);
  vertical-align: middle;
  &.half-gray-128 {
    color: var(--half-gray-128);
  }
}
</style>
