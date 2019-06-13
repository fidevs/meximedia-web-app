import { methods, myaxios } from '../lib/constants'


/* -------------- Running Requests ----------- */
function requests(url, method, data) {
    return myaxios({
        method : method,
        url : url,
        data : data
    })
}

/* -------------- Delete ----------- */
export function deleteById(type, id) {
    const method = methods.DELETE
    const url = type+"/"+id

    return requests(url, method, "")
}


/* -------------- Update ----------- */
export function update(type, id, data) {
    const method = methods.PUT
    const url = type+"/"+id
    const thedata = data

    return requests(url, method, thedata)
}


/* -------------- Find All ----------- */
export function findAll(type) {
    const method = methods.GET
    const url = type

    return requests(url, method, "")
}


/* -------------- Create ----------- */
export function create(type, data) {
    const method = methods.POST
    const url = type
    const thedata = data

    return requests(url, method, thedata)
}


/* -------------- Find By Id ----------- */
export function findById(type, id) {
    const method = methods.GET
    const url = type+"/"+id

    return requests(url, method, "")
}