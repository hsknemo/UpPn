<script setup lang="ts">
import moment from 'moment'

const demoList = [
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
  },
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
    <div class="author" rounded w-18 h-18 m-auto rounded-full overflow-hidden>
      <img w-full h-full src="https://avatars.githubusercontent.com/u/42964542?v=4" alt="">
    </div>
    <div class="tip" text-center mt-2 text-3xl>
      <a href="https://github.com/hsknemo">Nemo</a> is <span animate-pulse>Releasing...</span>
    </div>

    <div p4>
      <hr ma  w-20 op15 />
    </div>

    <div class="demo_body">
      <div class="demo_box"
           mb5
           :key="index"
           v-for="(item, index) in demoList">

        <div class="d_top" flex justify-between>
          <div class="demo_tit">
            <a
              target="_blank"
              :href="item.link">{{ item.title }}</a>
          </div>
          <div class="demo_version">
            <a
              target="_blank"
              :href="item.link">{{ item.version }}<span rounded px0.8 mx--0.8 font-bold dark:text-green-3 text-green-7
                                                        bg-green:15>{{ item.magicTag }}</span></a>
            <time text-sm op50>{{ computedTimeForNow(item.time) }}</time>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

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
  @apply w-screen-sm
  ma;


  .demo_body {
    padding-top: 20px;

    .demo_box {
      @include demoBoxStyle()
    }
  }
}
</style>
