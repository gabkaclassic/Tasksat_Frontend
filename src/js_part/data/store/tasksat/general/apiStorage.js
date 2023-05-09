import appModes from "@/js_part/data/values/modes/appModes";

const TOKEN = 'AUTH_TOKEN'
export default {
    state: {
        token: sessionStorage.getItem(TOKEN),
    },
    getters: {
        authToken(state) {
            return state.token;
        }
    },
    mutations: {
      SET_TOKEN(state, value) {
          sessionStorage.setItem(TOKEN, value)
          state.token = value
      },
    },
    actions: {
        login(context, value) {
          context.commit('SET_TOKEN', value.substring(7))
        },
        logout(context) {
            context.commit('SET_TOKEN', '')
            context.commit('SET_APP_MODE', appModes.unauthorized)
        },
    },
}