<script setup>

  import Clock from './IconCompoent/Clock.vue'
  import Title from '@/layout/Title/index.vue'
  import NullMessage from './Components/NullMessage.vue'
  import ModelBolg from '@/model/BLOG/index.js'
  import { useRouter, useRoute } from 'vue-router'
  import Fa7BrandsEllo from '@/model/PROJECT/iconComponent/ChildMenu.vue'
  defineComponent({
    name: 'BlogPage',
  })
  import { reactive } from 'vue'
  const isOpen = ref(false)
  const router = useRouter()

  /* 定义 Blog 数据 */
  const Blog = reactive({
    // 标题
    blogCat: ModelBolg.readKey(),
    // 当前高亮
    currentTag: '',
    // 当前高亮对应的 blog 数据
    currentBlog: []
  })
  Blog.currentTag = Blog.blogCat[0]


  const readBlogDataByKey = function(key) {
    Blog.currentTag = key
    Blog.currentBlog = ModelBolg.readByKey(key)
  }

  readBlogDataByKey(Blog.currentTag)


  const onJumpMd = item => {
    router.push({
      path: '/posts/' + item.path,
      query: {
        maxFull: item.isCodeArea
      }
    })
  }
</script>

<template>
  <div>
    <div class="btom-menu">
      <Fa7BrandsEllo  @click="isOpen = !isOpen"/>
    </div>
    <div >
      <Title title="Blogs"></Title>
      <div class="title-wrap"
           :class="[
           {
             'slide-up-transition': isOpen
           }
         ]"
      >
        <Title
          v-for="(item, index) in Blog.blogCat"
          :key="index"
          @click="readBlogDataByKey(item)"
          class="title-item"
          :class="Blog.currentTag === item ? 'active' : ''"
          :title="item"
        />
      </div>

      <template v-if="Blog.currentBlog.length">
        <div class="post-item" v-for="item in Blog.currentBlog">
          <span class="anchor" @click="onJumpMd(item)">{{ item.name}}</span>
          <!--        <RouterLink :to="'/posts/' + item.path + `?max-full=${item.isCodeArea}`">{{ item.name}}</RouterLink>-->
          <div class="other">
            <span>{{ item.time }} · <span class="readTime">{{ item.readTime }}</span></span>
          </div>
        </div>
      </template>

      <template v-else>
        <NullMessage />
      </template>

    </div>
  </div>

</template>

<style lang="scss" scoped>
.title-wrap {
  display: flex;
  gap: 1em;
  margin: .5em 0;
  .title-item {
    cursor: pointer;
    font-size: 1em;
    color: var(--half-gray-128);
    transition: .3s color ease;
    width: fit-content;
    &.active,
    &:hover {
      color: var(--intro-h1)
    }
  }
}
.post-item {
  padding: 10px;
  margin-bottom: 15px;
  font-family: var(--common-font-family);

  .anchor {
    font-size: 16px;
    cursor: pointer;
  }

  .readTime {
    color: #7a7a7a;
  }

  &:hover {
    * {
      opacity: .95;
    }
  }
  ::v-deep {
    a {
      font-size: 18px;
    }
  }
  * {
    opacity: .75;
    transition: all 1s;
    color: var(--half-gray-128);
    font-family: var(--common-font-family);
  }
  .other {
    margin-top: 3px;
  }
}

.btom-menu {
  display: none;
}

@media (max-width: 750px) {
  .title-wrap {
    position: fixed;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    bottom: 20px;
    background-color: var(--bg-color);
    max-height: 300px;
    transform: translateY(200%);
    transition: transform .3s ease;
    overflow: auto;

    &.slide-up-transition {
      transform: translateY(0);
    }
  }
  .btom-menu {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    z-index: 999;
    background-color: var(--bg-color);
    font-size: 20px;
  }
}
</style>
