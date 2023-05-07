import store from "@/js_part/data/store/storages";

export default {
    async saveStatistics(statistics){
        await store.dispatch('setStatistics', statistics)
    },
}