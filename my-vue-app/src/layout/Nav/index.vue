<script>
import Profile from "./Profile.vue"
export default defineComponent({
    name: "Nav",
    setup() {
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
        return {
            Nav
        };
    },
    components: { Profile }
})
</script>


<template>
  <div class="nav-container">
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
</style>
