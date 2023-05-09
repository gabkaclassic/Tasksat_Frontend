import {getInit, postInit} from "@/js_part/api/inits/defaultInits";
import {pathVariables} from "@/js_part/api/utils/functions"
import urls from "@/js_part/data/values/urls/urls";
export default function() {

    const checkUrl = urls.tasksatUrl + 'check'
    const createUrl = urls.tasksatUrl + 'create'

    return {
        async all(type) {
            return await fetch(checkUrl + '/all/' + type, getInit())
        },
        async create(data, type) {
            return await fetch(createUrl + '/' + type + pathVariables(data), postInit())
        },
        async check(data) {
            return await fetch(checkUrl + '/task' + pathVariables(data), getInit())
        },
    }
}