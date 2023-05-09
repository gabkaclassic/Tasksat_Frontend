import {deleteInit, getInit} from "@/js_part/api/inits/defaultInits";
import urls from "@/js_part/data/values/urls/urls";
import {pathVariables} from "@/js_part/api/utils/functions";

export default function() {

    const adminUrl = urls.tasksatUrl + 'admin'

    return {
        async all() {
            return await fetch(adminUrl, getInit())
        },

        async delete(data) {
            return await fetch(adminUrl + pathVariables(data), deleteInit())
        },
    }
}