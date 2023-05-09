
<template>

    <div class="table__column">
        <span class="table__task-name">ID: {{ account.id }}</span>
        <span class="table__task-name">Login: {{ account.login }}</span>
        <span class="table__task-name">Type: {{ account.type }}</span>
    </div>
    <button class="table__block-level" @click="deleteAccount(account)">
        Delete
    </button>

</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "AccountView",
    props: {
        account: {
            required: true,
            type: Object,
        }
    },
    methods: {
        deleteAccount(acc) {
            this.$emit('delete', acc)
        },
    },
})
</script>

<style scoped>

</style>