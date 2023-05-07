import modesStorage from "./tasksat/general/modesStorage";
import Vuex from "vuex"
import apiStorage from "./tasksat/general/apiStorage";
import tasksStorage from "@/js_part/data/store/tasksat/user/tasksStorage";
import statisticsStorage from "@/js_part/data/store/tasksat/user/statisticsStorage";
export default new Vuex.Store({

    modules: {
        modes: modesStorage,
        api: apiStorage,
        tasks: tasksStorage,
        statistics: statisticsStorage,
    }
})