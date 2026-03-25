<template>
<div class="micro-video-container">
  <template v-for="(item, index) in videoList" :key="index">
    <div class="video-wrap-item" >
      <div class="title">{{ item.title }}</div>
      <video width="400" controls  height="500" >
        <source :src="item.playUrl" type="video/mp4" />
      </video>
    </div>
  </template>

</div>
</template>

<script>
export default {
  name: "MicroVideo.vue",

  props: {
    videoList: {
      type: Array,
      default: _ => ([])
    }
  }
}
</script>

<style scoped>

</style>