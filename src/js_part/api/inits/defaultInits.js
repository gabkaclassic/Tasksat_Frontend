import headers from "@/js_part/api/headers/headers";


export function getInit() {
    return {
        method: "GET",
        credentials: 'include',
        headers: headers.jsonHeader(),
    }
}

export function postInit(data) {
    return {
        method: "POST",
        credentials: 'include',
        headers: headers.jsonHeader(),
        body: JSON.stringify(data)
    }
}

export function deleteInit(data) {
    return {
        method: "DELETE",
        credentials: 'include',
        headers: headers.jsonHeader(),
        body: JSON.stringify(data),
    }
}

export function putInit(data) {
    return {
        method: "PUT",
        credentials: 'include',
        headers: headers.jsonHeader(),
        body: JSON.stringify(data),
    }
}