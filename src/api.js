// @flow
import fetch from 'node-fetch';
import cleanDeep from 'clean-deep';

function makeRequest(url: string, params: Object, headers?: Object, config?: Object): Promise<Object> {
    return fetch(url, {
        method: 'post',
        ...config,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(params),
    })
        .then((res) => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res;
        })
        .then(res => res.json())
        .then(cleanDeep);
}

export default makeRequest;
