// @flow
import { jsonToGraphQLQuery } from 'json-to-graphql-query'

import { post } from './http'

import { getJourneyPlannerHost, getNSRHost } from './config'
import type { ServiceConfig } from './config'

const pretty = process.env.NODE_ENV !== 'production'

function errorHandler(response: Object = {}): Object {
    if (response?.errors?.[0]) {
        throw new Error(`GraphQL: ${response.errors[0].message}`)
    }

    if (!response?.data) {
        throw new Error('Entur SDK: No data available')
    }

    return response.data
}

export function getGraphqlParams(
    queryObj: Object | string,
    variables?: Object,
): {
    query: string,
    variables?: Object
} {
    const query = typeof queryObj === 'string'
        ? queryObj
        : jsonToGraphQLQuery(queryObj, { pretty })

    return {
        query,
        variables,
    }
}

export function journeyPlannerQuery<T>(
    queryObj: Object | string,
    variables?: Object,
    config?: ServiceConfig,
): Promise<T> {
    const { host, headers } = getJourneyPlannerHost((this && this.config) || config)
    const url = `${host}/graphql`

    const params = getGraphqlParams(queryObj, variables)

    return post(url, params, headers)
        .then(errorHandler)
}

export function nsrQuery<T>(
    queryObj: Object | string,
    variables?: Object,
    config?: ServiceConfig,
): Promise<T> {
    const { host, headers } = getNSRHost((this && this.config) || config)
    const url = `${host}/graphql`

    const query = typeof queryObj === 'string'
        ? queryObj
        : jsonToGraphQLQuery(queryObj, { pretty })

    return post(url, { query, variables }, headers)
        .then(errorHandler)
}
