<script setup>
import Title from '@/layout/Title/index.vue'
import ListItem from './Components/ListItem.vue'
import Model from '@/model/PROJECT/index.js'
import { onMounted } from 'vue'
const Project = Model.readByKey('pro')


const splitN = function(str) {
  return str.replace(/\s/g, '')
}

const onJump = function(hash) {
  let jumpHash = document.getElementById('hash-' + hash)
  jumpHash && jumpHash.click()
}
onMounted(() => {
  let urlHash = window.location.hash
  if (urlHash) {
    let decodeHash = decodeURIComponent(urlHash.substring(1))
    onJump(decodeHash)
  }
})
</script>

<template>
  <div class="max-full  default-text mt-3 flex-body">
    <div class="left_page_list">
      <div class="page_list_item"
           :key="index"
           v-for="(pro, index) in Project"
      >
        <a :id="'hash-' + splitN(pro.capName)" :href="'#' + splitN(pro.capName)">{{ pro.capName }}</a>
      </div>
    </div>
    <div class="right_container" >
      <Title title="Projects" />
      <div
        class="list-container max-full"
        :key="index"
        v-for="(pro, index) in Project"
      >
        <div class="catgory-name" :id="splitN(pro.capName)">
          {{ pro.capName }}
        </div>
        <div class="catgory-item">
          <ListItem
            :key="idx"
            v-for="(item, idx) in pro.capList"
            class="flex-1"
            :url="item.url"
            :icon="item.icon"
            :name="item.name"
            :desc="item.desc"
          />

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin flexStyle($align:'center', $justContent:'space-around') {
  display: flex;
  align-items: $align;
  justify-content: $justContent;
}
.flex-body {
  overflow: auto;
  max-height: 800px;
  scroll-behavior: smooth;
  .left_page_list {
    position: fixed;
    top: 150px;
    left: 40px;
    width: 10%;
    .page_list_item {
      width: fit-content;
      border-bottom: 1px solid transparent;
      &:hover {
        &:after {
          width: 100%;
        }
        a {
          color: var(--half-gray-128);
        }
      }
      &:after {
        transition: width 0.2s linear;
        content: '';
        width: 0;
        display: block;
        height: 1px;
        background-color: var(--half-gray-128);
      }
    }

    a {
      display: block;
      transition: color 0.2s linear;
      color: var(--half-gray-128-o-3);
    }
  }

}

.list-container {
  position: relative;
  margin-top: 2.3em;
  padding: 0 0.3em;
  box-sizing: border-box;
}
.catgory-name {
  font-family: var(--inter-font-family);
  margin-bottom: .1em;
  z-index: -1;
  font-size: 25px;
  -webkit-text-stroke: 1px var(--half-gray-128);
  white-space: nowrap;
  -webkit-text-fill-color: transparent;
  user-select: none;
  a:active {
    color: unset;
  }
}
.catgory-item {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
}

@media screen and (max-width: 768px) {
  .catgory-item {
    grid-template-columns: unset;
  }
}

.right_container {
  width: 60%;
  margin: auto;
}
</style>
