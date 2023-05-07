import store from "@/js_part/data/store/storages";

export default {
    async setCurrentTask(task) {
        await store.dispatch('setCurrentTask', task)
    },
    async clearCurrentTask() {
        await store.dispatch('setCurrentTask', {})
    },
}