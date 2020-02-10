import { post } from './http'

import { getJourneyPlannerHost, getNSRHost } from './config'
import { ServiceConfig } from './config'

function minify(query: string): string {
    return query.trim().replace(/\s+/g, ' ')
}

function errorHandler(response: any) {
    if (response?.errors?.[0]) {
        throw new Error(`GraphQL: ${response.errors[0].message}`)
    }

    if (!response?.data) {
        throw new Error('Entur SDK: No data available')
    }
    return response.data
}

export function getGraphqlParams(
    query: string,
    variables: { [key: string]: any },
): {
    query: string
    variables?: { [key: string]: any }
} {
    return {
        query: minify(query),
        variables,
    }
}

export function journeyPlannerQuery<T>(
    queryObj: string,
    variables: object,
    config: ServiceConfig,
): Promise<T> {
    const { host, headers } = getJourneyPlannerHost(config)
    const url = `${host}/graphql`

    const params = getGraphqlParams(queryObj, variables)

    return post(url, params, headers).then(errorHandler)
}

export function nsrQuery<T>(
    query: string,
    variables: object,
    config: ServiceConfig,
): Promise<T> {
    const { host, headers } = getNSRHost(config)
    const url = `${host}/graphql`

    return post(url, { query: minify(query), variables }, headers).then(
        errorHandler,
    )
}
