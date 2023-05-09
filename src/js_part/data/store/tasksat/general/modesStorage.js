import appModes from "@/js_part/data/values/modes/appModes";
import mainPageModes from "@/js_part/data/values/modes/mainPageModes";
import taskPageModes from "@/js_part/data/values/modes/taskPageModes";

const MODE = 'APP_MODE'
const MAIN_PAGE_MODE = 'MAIN_PAGE_MODE'
const TASK_PAGE_MODE = 'TASK_PAGE_MODE'

export default {
    state: {
        applicationMode: (sessionStorage.getItem(MODE) == null) ? appModes.unauthorized : sessionStorage.getItem(MODE),
        mainPageMode: (sessionStorage.getItem(MAIN_PAGE_MODE) == null) ? mainPageModes.login : sessionStorage.getItem(MAIN_PAGE_MODE),
        taskPageMode: (sessionStorage.getItem(TASK_PAGE_MODE) == null) ? taskPageModes.all : sessionStorage.getItem(TASK_PAGE_MODE),
    },
    getters: {
        applicationMode(state) {
            return state.applicationMode
        },
        mainPageMode(state) {
            return state.mainPageMode
        },
        taskPageMode(state) {
            return state.taskPageMode
        },
        allTaskMode(state) {
            return state.taskPageMode === taskPageModes.all
        },
        certainTaskMode(state) {
            return state.taskPageMode === taskPageModes.certain
        },
        loginMode(state) {
            return state.mainPageMode === mainPageModes.login

        },
        registrationMode(state) {
            return state.mainPageMode === mainPageModes.registration

        },
        adminMode(state) {
            return state.applicationMode === appModes.admin
        },
        unauthorizedMode(state) {
            return state.applicationMode === appModes.unauthorized
        },
        userMode(state) {
            return state.applicationMode === appModes.user
        },
        workerMode(state) {
            return state.applicationMode === appModes.worker
        },
    },
    mutations: {
        SET_MAIN_PAGE_MODE(state, value) {
          sessionStorage.setItem(MAIN_PAGE_MODE, value)
          state.mainPageMode = value
        },
        SET_TASK_PAGE_MODE(state, value) {
            sessionStorage.setItem(TASK_PAGE_MODE, value)
            state.taskPageMode = value
        },
        SET_APP_MODE(state, value) {
            sessionStorage.setItem(MODE, value)
            state.applicationMode = value
        },
    },
    actions: {
        async setMainPageMode(context, value) {
            context.commit('SET_MAIN_PAGE_MODE', value)
        },
        async setTaskPageMode(context, value) {
            context.commit('SET_TASK_PAGE_MODE', value)
        },
        async setAppMode(context, value) {
            context.commit('SET_APP_MODE', value)
        },

    }
}