// @flow
import { jsonToGraphQLQuery } from 'json-to-graphql-query'

import { post } from './http'

import { getJourneyPlannerHost, getNSRHost } from './config'
import type { ServiceConfig } from './config'

const pretty = process.env.NODE_ENV !== 'production'

function errorHandler(response: Object): Object {
    if (response.errors && response.errors[0]) {
        throw new Error(`GraphQL: ${response.errors[0].message}`)
    }

    return response
}

export function journeyPlannerQuery<T>(
    queryObj: Object | string,
    variables?: Object,
    ignoreFields?: Array<string>,
    config?: ServiceConfig,
): Promise<T> {
    const { host, headers } = getJourneyPlannerHost((this && this.config) || config)
    const url = `${host}/graphql`

    const query = typeof queryObj === 'string'
        ? queryObj
        : jsonToGraphQLQuery(queryObj, { pretty, ignoreFields })

    return post(url, { query, variables }, headers)
        .then(errorHandler)
}

export function nsrQuery<T>(
    queryObj: Object | string,
    variables?: Object,
    ignoreFields?: Array<string>,
    config?: ServiceConfig,
): Promise<T> {
    const { host, headers } = getNSRHost((this && this.config) || config)
    const url = `${host}/graphql`

    const query = typeof queryObj === 'string'
        ? queryObj
        : jsonToGraphQLQuery(queryObj, { pretty, ignoreFields })

    return post(url, { query, variables }, headers)
        .then(errorHandler)
}
