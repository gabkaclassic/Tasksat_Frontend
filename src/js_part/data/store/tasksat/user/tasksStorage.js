
const TASK = 'CURRENT_TASK'

export default {
    state: {
        currentTask: (sessionStorage.getItem(TASK) == null) ? {} : sessionStorage.getItem(TASK),
    },
    getters: {
        currentTask(state) {
            return state.currentTask
        },

    },
    mutations: {
        SET_TASK(state, value) {
            sessionStorage.setItem(TASK, value)
            state.currentTask = value
        },

    },
    actions: {
        async setCurrentTask(context, value) {
            context.commit('SET_TASK', value)
        },
    }
}