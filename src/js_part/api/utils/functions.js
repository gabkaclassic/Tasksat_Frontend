export function pathVariables(data) {
    let dataString = '?';

    for(let field in data)
        dataString += field + '=' + data[field]+'&'
    dataString = dataString.substring(0, dataString.length - 1)

    return dataString;
}