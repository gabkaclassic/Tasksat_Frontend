import urls from "@/js_part/data/values/urls/urls";
import {getInit} from "@/js_part/api/inits/defaultInits";

export default function() {

    const statisticsUrl = urls.tasksatUrl + 'statistics'

    return {
        async load() {
            return await fetch(statisticsUrl, getInit())
        },
    }
}