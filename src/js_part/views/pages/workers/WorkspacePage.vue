
<template>

    <div>
        <task-creation-form />
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import TaskCreationForm from "@/js_part/views/templates/forms/tasks/TaskCreationForm.vue";
import store from "@/js_part/data/store/storages";
import router from "@/js_part/routing/router";

export default defineComponent({
    name: "WorkspacePage",
    components: {TaskCreationForm},
    created() {

        if(store.getters.userMode) {
            router.push({path: '/tasks'})
        }
        if(store.getters.adminMode) {
            router.push({path: '/accounts'})
        }

        if(!store.getters.workerMode)
            router.push({path: '/'})
    },
})
</script>



<style scoped>

</style>