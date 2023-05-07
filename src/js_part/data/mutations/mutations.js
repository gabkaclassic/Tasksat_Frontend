import modesMutations from "@/js_part/data/mutations/modesMutations";
import apiMutations from "@/js_part/data/mutations/apiMutations";
import tasksMutations from "@/js_part/data/mutations/tasksMutations";

export default {
    install(Vue) {
        Vue.config.globalProperties.$modes = modesMutations
        Vue.config.globalProperties.$api = apiMutations
        Vue.config.globalProperties.$tasks = tasksMutations
    }
}