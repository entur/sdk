// @flow
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
    query: string,
    variables: Object,
    config?: ServiceConfig,
): Promise<T> {
    const { host, headers } = getJourneyPlannerHost((this && this.config) || config)
    const url = `${host}/graphql`

    return post(url, {
        query,
        variables,
    }, headers)
        .then(errorHandler)
}
