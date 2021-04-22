import { RequestOptions } from '../../http'
import { getServiceConfig, ArgumentConfig } from '../../config'
import { mobilityQuery } from '../../api'

import { FormFactor, PropulsionType, Vehicle } from '../types'

import getVehiclesQuery from './query'

export interface GetVehiclesParams {
    lat: number
    lon: number
    range: number
    count?: number
    operators?: string[]
    codespaces?: string[]
    formFactors?: FormFactor[]
    propulsionTypes?: PropulsionType[]
    includeReserved?: boolean
    includeDisabled?: boolean
}

export default function createGetVehicles(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return async function getVehicles(
        params: GetVehiclesParams,
        options?: RequestOptions,
    ): Promise<Vehicle[]> {
        const data = await mobilityQuery<Vehicle[]>(
            getVehiclesQuery,
            params,
            config,
            options,
        )

        return data || []
    }
}
