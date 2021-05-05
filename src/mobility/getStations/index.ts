import { RequestOptions } from '../../http'
import { getServiceConfig, ArgumentConfig } from '../../config'
import { mobilityQuery } from '../../api'

import { Station } from '../types'

import getStationsQuery from './query'

export interface GetStationsParams {
    /** The latitude coordinate. */
    lat: number
    /** The longitude coordinate. */
    lon: number
    /** The radius in meters from the coordinate pair in which to find stations. */
    range: number
    /** The maximum number of stations to return. */
    count?: number
    /** The maximum number of stations to return. */
    codespaces?: string[]
    /** Return only stations of the given systems. */
    systems?: string[]
    /** Return only stations of the given operators. */
    operators?: string[]
}

export default function createGetStations(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return async function getStations(
        params: GetStationsParams,
        options?: RequestOptions,
    ): Promise<Station[]> {
        const data = await mobilityQuery<{ stations: Station[] }>(
            getStationsQuery,
            params,
            config,
            options,
        )

        return data?.stations || []
    }
}
