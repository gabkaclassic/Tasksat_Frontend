
<template>

    <div class="table__column">
        <span class="table__task-name">ID: {{ user.id }}</span>
        <span class="table__task-name">Login: {{ user.login }}</span>
    </div>
    <div class="table__block-level">
        <button @click="deleteUser(user.id)">
            Delete
        </button>
    </div>

</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "UserView",
    props: {
        user: {
            required: true,
            type: Object,
        }
    },
    methods: {
      deleteUser(id) {
          id
      }
    },
})
</script>

<style scoped>

</style>