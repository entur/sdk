import { RequestOptions } from '../../http'
import { getServiceConfig, ArgumentConfig } from '../../config'
import { mobilityQuery } from '../../api'

import { Station } from '../types'

import getStationsQuery from './query'

export interface GetStationsByIdParams {
    /** Return only stations with the given IDs. */
    stationIds: string[]
}

export default function createGetStationsById(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return async function getStationsById(
        params: GetStationsByIdParams,
        options?: RequestOptions,
    ): Promise<Station[]> {
        const data = await mobilityQuery<{ stationsById: Station[] }>(
            getStationsQuery,
            params,
            config,
            options,
        )

        return data?.stationsById || []
    }
}
