// @flow
import { jsonToGraphQLQuery } from 'json-to-graphql-query'

import { post } from './http'

import { getJourneyPlannerHost } from './config'
import type { ServiceConfig } from './config'

function errorHandler(response: Object): Object {
    if (response.errors && response.errors[0]) {
        throw new Error(`GraphQL: ${response.errors[0].message}`)
    }

    return response
}

export function journeyPlannerQuery<T>(
    queryObj: Object,
    variables: Object,
    ignoreFields?: Array<string>,
    config?: ServiceConfig,
): Promise<T> {
    const { host, headers } = getJourneyPlannerHost((this && this.config) || config)
    const url = `${host}/graphql`

    const query = jsonToGraphQLQuery(queryObj, {
        pretty: true,
        ignoreFields,
    })

    return post(url, {
        query,
        variables,
    }, headers)
        .then(errorHandler)
}
