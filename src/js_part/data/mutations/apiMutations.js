import store from "@/js_part/data/store/storages";

export default {
    async login(token, iam){
        await store.dispatch('login', token)
        await store.dispatch('setAppMode', iam)
    },
    async logout(){
        await store.dispatch('logout')
    },
}