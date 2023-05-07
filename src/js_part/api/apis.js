import TasksatApi from "./tasksat/tasksat";

export default {
    install(Vue) {
        Vue.config.globalProperties.$tasksat = TasksatApi
    }
}