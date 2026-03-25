<template>
  <iframe frameborder="no"
          border="0"
          marginwidth="0"
          marginheight="0"
          width=330
          height=86
          :src="'//music.163.com/outchain/player?type=2&id=' + musicId + '&auto=1&height=66'"></iframe>
</template>

<script>
export default {
  name: "Music",

  props: {
    musicId: {
      type: [String, Number]
    }
  }
}
</script>

<style scoped>

</style>