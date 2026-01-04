<script lang="ts" setup>
import moment from 'moment'

const demoList = [
  {
    title: 'MapLite',
    version: 'v1.',
    magicTag: '1.0',
    time: '2025-12-27 00:00:00',
    link: 'https://github.com/hsknemo/map-lite-doc'
  },
  {
    title: 'VTran',
    version: 'v1.',
    magicTag: '1.9',
    time: '2025-12-03 13:56:00',
    link: 'https://github.com/hsknemo/vtran.git'
  },
  {
    title: 'Tran Server',
    version: 'v1.',
    magicTag: '1.6',
    time: '2025-12-03 13:56:00',
    link: 'https://github.com/hsknemo/vtran-server.git'
  }
]

const computedTimeForNow = (time) => {
  let days = moment().diff(time, 'days')
  let hours = moment().diff(time, 'hours')
  let seconds = moment().diff(time, 'seconds')
  if (days > 0) {
    return `${days} 天前`
  }
  if (hours > 0) {
    return `${hours} 小时前`
  }
  return `${seconds} 秒前`
}

</script>

<template>
  <div class="recent_body"

  >
    <div class="author" h-18 m-auto overflow-hidden rounded rounded-full w-18>
      <img alt="" h-full src="https://avatars.githubusercontent.com/u/42964542?v=4" w-full>
    </div>
    <div class="tip" mt-2 text-3xl text-center>
      <a href="https://github.com/hsknemo">Nemo</a> is <span animate-pulse>Releasing...</span>
    </div>

    <div p4>
      <hr ma op15 w-20 />
    </div>

    <div class="demo_body">
      <div v-for="(item, index) in demoList"
           :key="index"
           class="demo_box"
           mb5>

        <div class="d_top" flex justify-between>
          <div class="demo_tit">
            <a
              :href="item.link"
              target="_blank">{{ item.title }}</a>
          </div>
          <div class="demo_version">
            <a
              :href="item.link"
              target="_blank">{{ item.version }}<span bg-green:15 dark:text-green-3 font-bold mx--0.8 px0.8 rounded
                                                        text-green-7>{{ item.magicTag }}</span></a>
            <time op50 text-sm>{{ computedTimeForNow(item.time) }}</time>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@mixin demoBoxStyle {
  a:hover {
    text-decoration: underline;
  }
  .demo_tit {
    font-family: input-mono;
    @apply font-bold;
  }
  .demo_version {
    @apply flex flex-col gap-2;
    letter-spacing: 2px;
    font-family: input-mono;
  }

  .block {
    p {
      margin: 5px;
    }
  }

  .time {
    @apply w-full text-right;
    font-size: 12px;
  }

  .b_desc {
    font-size: 12px;
    margin-top: 10px;
  }
}

.recent_body {
  .demo_body {
    padding-top: 20px;

    .demo_box {
      @include demoBoxStyle()
    }
  }
}
</style>
