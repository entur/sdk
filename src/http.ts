import qs from 'qs'
import cleanDeep from 'clean-deep'
import { Response } from 'node-fetch'

import fetch from './fetch'

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

function responseHandler(response: Response): Response | PromiseLike<Response> {
    if (!response.ok) {
        throw Error(response.statusText)
    }
    return response
}

export function get<T extends object>(
    url: string,
    params?: object,
    headers?: object,
    config?: object,
): Promise<T> {
    return fetch(`${url}?${qs.stringify(params)}`, {
        method: 'get',
        ...config,
        headers: { ...DEFAULT_HEADERS, ...headers },
    })
        .then(responseHandler)
        .then(res => res.json())
        .then(data =>
            cleanDeep(data, { emptyArrays: false, emptyStrings: false }),
        )
}

export function post<T>(
    url: string,
    params?: object,
    headers?: object,
    config?: object,
): Promise<T> {
    return fetch(url, {
        method: 'post',
        ...config,
        headers: { ...DEFAULT_HEADERS, ...headers },
        body: JSON.stringify(params),
    })
        .then(responseHandler)
        .then(res => res.json())
        .then(data =>
            cleanDeep(data, { emptyArrays: false, emptyStrings: false }),
        )
}
