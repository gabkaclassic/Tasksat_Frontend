import store from "../store/storages"
import appModes from "../values/modes/appModes";
import mainPageModes from "../values/modes/mainPageModes";
import taskPageModes from "../values/modes/taskPageModes";

export default {
    async setAdminMode(){
        await store.dispatch('setAppMode', appModes.admin)
    },
    async setUserMode(){
        await store.dispatch('setAppMode', appModes.user)
    },
    async setWorkerMode(){
        await store.dispatch('setAppMode', appModes.worker)
    },
    async setMainPageLoginMode(){
        await store.dispatch('setMainPageMode', mainPageModes.login)
    },
    async setMainPageRegistrationMode(){
        await store.dispatch('setMainPageMode', mainPageModes.registration)
    },
    async setTaskPageAllMode(){
        await store.dispatch('setTaskPageMode', taskPageModes.all)
    },
    async setTaskPageCertainMode(){
        await store.dispatch('setTaskPageMode', taskPageModes.certain)
    },
}