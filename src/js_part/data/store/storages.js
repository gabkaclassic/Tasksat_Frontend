import modesStorage from "./tasksat/general/modesStorage";
import Vuex from "vuex"
import apiStorage from "./tasksat/general/apiStorage";
import tasksStorage from "@/js_part/data/store/tasksat/user/tasksStorage";
export default new Vuex.Store({

    modules: {
        modes: modesStorage,
        api: apiStorage,
        tasks: tasksStorage
    }
})