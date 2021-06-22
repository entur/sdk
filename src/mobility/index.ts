import { ArgumentConfig } from '../config'

import { default as createGetStations } from './getStations'
import { default as createGetVehicles } from './getVehicles'
import { default as createGetOperators } from './getOperators'

export default function createClient(config: ArgumentConfig) {
    return {
        getOperators: createGetOperators(config),
        getStations: createGetStations(config),
        getVehicles: createGetVehicles(config),
    }
}
