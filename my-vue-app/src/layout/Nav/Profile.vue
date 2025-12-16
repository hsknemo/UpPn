<script setup>
import Git from './IconComponent/Git.vue'
import NightToLight from './NightToLight.vue'
import Gernerator from './IconComponent/Gerner.vue'
import Pin from './IconComponent/Pin.vue'

</script>

<template>
  <router-link to="/Udpn">
    <Pin class="icon" />
  </router-link>
  <router-link to="/Gernerator">
    <Gernerator class="icon" />
  </router-link>
  <a  href="https://github.com/hsknemo" target="_brand">
    <Git class="icon" />
  </a>
  <NightToLight class="max-sm:hidden!"/>

</template>


<style scoped lang="scss">
a {
  .icon {
    transition: color .3s ease;
      &:hover {
        color: var(--intro-h1);
      }
  }
}
</style>
