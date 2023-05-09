<template>

    <base-header v-if="!store.getters.unauthorizedMode" />

    <router-view />

</template>

<script>


import BaseHeader from "@/js_part/views/templates/BaseHeader.vue";
import store from "@/js_part/data/store/storages";

export default {
    components: {BaseHeader},
    data() {
      return {
        store: store,
      }
    },
}
</script>

<style>

</style>