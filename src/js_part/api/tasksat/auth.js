import {getInit, postInit} from "@/js_part/api/inits/defaultInits";
import {pathVariables} from "@/js_part/api/utils/functions"
import urls from "@/js_part/data/values/urls/urls";
export default function() {

    const url = urls.tasksatUrl + 'auth'

    return {
        async login(data) {
            return await fetch( url + pathVariables(data), getInit())
        },
        async registration(data) {
            return await fetch(url + pathVariables(data), postInit())
        }
    }
}