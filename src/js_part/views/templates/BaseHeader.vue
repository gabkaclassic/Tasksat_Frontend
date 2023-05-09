<template>

  <div class="menu">
      <button class="logout" @click="logout"> Logout </button>
  </div>

</template>

<script>
import {defineComponent} from 'vue'
import router from "@/js_part/routing/router";

export default defineComponent({
    name: "BaseHeader",
    methods: {
        logout() {
          this.$api.logout()
          router.push({path: '/'})
        },
    },
})
</script>

<style scoped>

</style>