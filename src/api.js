// @flow
import fetch from 'node-fetch';
import queryParams from 'query-params';
import cleanDeep from 'clean-deep';


const DEFUALT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

function responseHandler(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function get(
    url: string,
    params?: Object,
    headers?: Object,
    config?: Object,
): Promise<Object> {
    return fetch(`${url}?${queryParams.encode(params)}`, {
        method: 'get',
        ...config,
        headers: { ...DEFUALT_HEADERS, ...headers },
    })
        .then(responseHandler)
        .then(res => res.json())
        .then(cleanDeep);
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
        headers: { ...DEFUALT_HEADERS, ...headers },
        body: JSON.stringify(params),
    })
        .then(responseHandler)
        .then(res => res.json())
        .then(cleanDeep);
}
