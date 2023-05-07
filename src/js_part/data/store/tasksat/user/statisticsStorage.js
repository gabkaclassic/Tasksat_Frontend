

const STATISTICS = 'STATISTICS'

export default {
    state: {
        statistics: (sessionStorage.getItem(STATISTICS) === null) ? null : JSON.parse(sessionStorage.getItem(STATISTICS)),
    },
    getters: {
        statistics(state) {
            return state.statistics
        },
        statisticsSaved(state) {
          return state.statistics !== null
        },
    },
    mutations: {
        SET_STATISTICS(state, value) {
            sessionStorage.setItem(STATISTICS, JSON.stringify(value))
            state.statistics = value
        },

    },
    actions: {
        async setStatistics(context, value) {
            context.commit('SET_STATISTICS', value)
        },
    }
}