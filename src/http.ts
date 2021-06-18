import qs from 'qs'
import cleanDeep from 'clean-deep'
import { Response, RequestInfo, RequestInit } from 'node-fetch'

import fetch from './fetch'

export type RequestOptions = Pick<RequestInit, 'signal' | 'headers'>

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

function delayedPromise<T>(
    callback: () => Promise<T>,
    delay: number,
): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => callback().then(resolve).catch(reject), delay)
    })
}

function retryIfNecessary(
    response: Response,
    call: () => Promise<Response>,
): Response | PromiseLike<Response> {
    if (response.status !== 429) {
        return response
    }

    const delay = Math.floor(Math.random() * 200)
    return delayedPromise(call, delay)
}

function responseHandler(response: Response): Response | PromiseLike<Response> {
    if (!response.ok) {
        throw Error(response.statusText)
    }
    return response
}

export function get<T>(
    url: string,
    params?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    customFetch?: (
        url: RequestInfo,
        init?: RequestInit | undefined,
    ) => Promise<Response>,
    { signal, headers: requestHeaders }: RequestOptions = {},
): Promise<T> {
    const fetcher = customFetch || fetch

    const call = (): Promise<Response> =>
        fetcher(`${url}?${qs.stringify(params)}`, {
            method: 'get',
            signal,
            headers: { ...DEFAULT_HEADERS, ...headers, ...requestHeaders },
        })

    return call()
        .then((response) => retryIfNecessary(response, call))
        .then(responseHandler)
        .then((res) => res.json())
        .then(
            (data) =>
                cleanDeep(data, {
                    emptyArrays: false,
                    emptyStrings: false,
                }) as T,
        )
}

export function post<T>(
    url: string,
    params?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    customFetch?: (
        url: RequestInfo,
        init?: RequestInit | undefined,
    ) => Promise<Response>,
    { signal, headers: requestHeaders }: RequestOptions = {},
): Promise<T> {
    const fetcher = customFetch || fetch

    const call = (): Promise<Response> =>
        fetcher(url, {
            method: 'post',
            signal,
            headers: { ...DEFAULT_HEADERS, ...headers, ...requestHeaders },
            body: JSON.stringify(params),
        })

    return call()
        .then((response) => retryIfNecessary(response, call))
        .then(responseHandler)
        .then((res) => res.json())
        .then(
            (data) =>
                cleanDeep(data, {
                    emptyArrays: false,
                    emptyStrings: false,
                }) as T,
        )
}
