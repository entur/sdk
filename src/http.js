// @flow
import qs from 'qs'
import cleanDeep from 'clean-deep'
import fetch from './fetch'

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

function responseHandler(response) {
    if (!response.ok) {
        throw Error(response.statusText)
    }
    return response
}

export function get(
    url: string,
    params?: Object,
    headers?: Object,
    config?: Object,
): Promise<Object> {
    return fetch(`${url}?${qs.stringify(params)}`, {
        method: 'get',
        ...config,
        headers: { ...DEFAULT_HEADERS, ...headers },
    })
        .then(responseHandler)
        .then(res => res.json())
        .then(data => cleanDeep(data, { emptyArrays: false }))
}

export function post(
    url: string,
    params?: Object,
    headers?: Object,
    config?: Object,
): Promise<Object> {
    return fetch(url, {
        method: 'post',
        ...config,
        headers: { ...DEFAULT_HEADERS, ...headers },
        body: JSON.stringify(params),
    })
        .then(responseHandler)
        .then(res => res.json())
        .then(data => cleanDeep(data, { emptyArrays: false }))
}
