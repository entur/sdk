import { RequestOptions } from '../../http'
import { getServiceConfig, ArgumentConfig } from '../../config'
import { mobilityQuery } from '../../api'

import { FormFactor, PropulsionType, Vehicle } from '../types'

import getVehiclesQuery from './query'

export interface GetVehiclesParams {
    /** The latitude coordinate. */
    lat: number
    /** The longitude coordinate. */
    lon: number
    /** The radius in meters from the coordinate pair in which to find vehicles. */
    range: number
    /** The maximum number of vehicles to return. */
    count?: number
    /** Return only vehicles of the given operators.  */
    operators?: string[]
    /** The maximum number of vehicles to return. */
    codespaces?: string[]
    /** Return only vehicles of the given form factors. */
    formFactors?: FormFactor[]
    /** Return only vehicles of the given propulsion types. */
    propulsionTypes?: PropulsionType[]
    /** Whether you want to return vehicles that are already reserved. The default is false. */
    includeReserved?: boolean
    /** Whether you want to return vehicles that are disabled. The default is false. */
    includeDisabled?: boolean
}

export default function createGetVehicles(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return async function getVehicles(
        params: GetVehiclesParams,
        options?: RequestOptions,
    ): Promise<Vehicle[]> {
        const data = await mobilityQuery<{ vehicles: Vehicle[] }>(
            getVehiclesQuery,
            params,
            config,
            options,
        )

        return data?.vehicles || []
    }
}
