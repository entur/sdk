import { RequestOptions } from '../../http'
import { getServiceConfig, ArgumentConfig } from '../../config'
import { mobilityQuery } from '../../api'

import {  Operator } from '../types'

import getOperatorsQuery from './query'

export default function createGetOperators(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return async function getOperators(
        options?: RequestOptions,
    ): Promise<Operator[]> {
        const data = await mobilityQuery<{ operators: Operator[] }>(
            getOperatorsQuery,
            {},
            config,
            options,
        )

        return data?.operators || []
    }
}
