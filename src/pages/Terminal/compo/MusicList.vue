<template>
<div class="music-list">
  <template v-for="(item, index) in searchMusicList">
    <div class="song-item" >
      <div class="name" @click="onPlay(item)">
        {{ item.name }}: <span>{{ MusicSinger(item.artists) }}</span>
      </div>
      <!--        template music-->
      <component :musicId="item.id" v-if="item.MusicPlay" :is="Music"></component>
    </div>
  </template>
</div>
</template>

<script>
import Music from './Music.vue'

export default {
  name: "MusicList",

  data() {
    return {
      Music
    }
  },

  props: {
    searchMusicList: {
      type: Array
    }
  },

  methods: {
    MusicSinger(arr) {
      if (arr.length) {
        return arr[0].name
      }
      return ''
    },

    onPlay(arg) {
      this.searchMusicList.forEach(item => {
        item.MusicPlay = false
        if (item.id === arg.id) {
          item.MusicPlay = true
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.music-list {
  color: var(--half-gray-128);

  .song-item {
    padding: 10px;
    cursor: pointer;
    transition: all .3s ease;
    animation: toLeftAnima .4s ease forwards;
    outline: 1px solid transparent;
    &:hover {
      transform: translateY(-3px);
      outline: 1px solid var(--half-gray-128);
    }
  }
}


@keyframes toLeftAnima {
  from {
    opacity: 0;
    transform: translateX(10px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>