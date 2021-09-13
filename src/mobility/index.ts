import { ArgumentConfig } from '../config'

import { default as createGetStations } from './getStations'
import { default as createGetStationsById } from './getStationsById'
import { default as createGetVehicles } from './getVehicles'
import { default as createGetOperators } from './getOperators'

export interface MobilityClient {
    getOperators: ReturnType<typeof createGetOperators>
    getStations: ReturnType<typeof createGetStations>
    getStationsById: ReturnType<typeof createGetStationsById>
    getVehicles: ReturnType<typeof createGetVehicles>
}

export default function createClient(config: ArgumentConfig): MobilityClient {
    return {
        getOperators: createGetOperators(config),
        getStations: createGetStations(config),
        getStationsById: createGetStationsById(config),
        getVehicles: createGetVehicles(config),
    }
}
