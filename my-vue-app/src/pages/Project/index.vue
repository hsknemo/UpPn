<script setup>
import Title from '@/layout/Title/index.vue'
import ListItem from './Components/ListItem.vue'
import Model from '@/model/PROJECT/index.js'
const Project = Model.readByKey('pro')

</script>

<template>
  <div class="max-full  default-text mt-3 flex-body">
    <div class="left_page_list">
      <div class="page_list_item"
           :key="index"
           v-for="(pro, index) in Project"
      >
        <a :href="'#' + pro.capName">{{ pro.capName }}</a>
      </div>
    </div>
    <div class="right_container">
      <Title title="Projects" />
      <div
        class="list-container max-full"
        :key="index"
        v-for="(pro, index) in Project"
      >
        <div class="catgory-name" :id="pro.capName">
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
 @include flexStyle();
  .left_page_list {
    position: sticky;
    top: 2px;
    margin-right: 10rem;
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
}
</style>
