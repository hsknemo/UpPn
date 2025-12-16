<script setup>
import Profile from "./Profile.vue"
import { reactive, ref } from 'vue'
import PrimeAlignJustify from '@/model/PROJECT/iconComponent/Menu.vue'
import SunCutNight from '@/layout/Nav/NightToLight.vue'
defineComponent({
  name: "Nav"
})
const Nav = reactive({
  navData: [
    {
      name: "Blog",
      path: "/Blog"
    },
    {
      name: "Project",
      path: "/project"
    },
    {
      name: "Recent",
      path: "/recent"
    },
  ]
});
const isOpen = ref(false);
</script>


<template>
  <div class="menu_btn">
    <SunCutNight />
    <PrimeAlignJustify  @click="isOpen = !isOpen" />
  </div>
  <div class="nav-container "
       :class="[
         {
           'slide-left-transition': isOpen
         }
       ]"
  >
    <template v-for="(item, index) in Nav.navData" :key="index">
      <RouterLink :to="item.path">
        {{ item.name }}
      </RouterLink>
    </template>
    <Profile />
  </div>
</template>


<style scoped lang="scss">
.nav-container {
  display: flex;
  padding: 15px;
  justify-content: end;
  align-items: center;
  ::v-deep {
    a {
      color: var(--nav-text-color);
      text-decoration: none;
      margin-right: 15px;
      font-size: var(--nav-text-size);
      font-family: var(--common-font-family);
      transition: color .3s ease;
      &:hover {
        color: var(--intro-h1);
      }
    }
  }
}

.menu_btn {
  display: none;
}

@media (max-width: 639.9px) {
  .top-container .l {
    top: 0 !important;
  }
  .nav-container {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 50%;
    height: 100vh;
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2px;
    transition: all .3s ease;
    transform: translateX(-100%);
    &.slide-left-transition {
      transform: unset;
    }
    :deep {
      a {
        width: 100%;
        display: block;
        margin: 5px 0;
        text-align: left;
        padding-left: 10px;
      }
      a,.icon {
        color: inherit !important;
      }
    }
  }

  .menu_btn {
    display: flex;
    position: fixed;
    align-items: center;
    right: 12px;
    top: 12px;
    font-size: 22px;
    z-index: 999;
    gap: 5px;

    :deep {
      .s-c-n {
        position: relative;
        top: -2px;
      }
    }


  }
}
</style>

