import { get, RequestOptions } from '../http'
import {
    Scooter,
    ScooterOperator,
    BatteryScooter,
    BatteryLevelScooter,
} from './types'
import { getServiceConfig, getScootersHost, ArgumentConfig } from '../config'

const ALL_OPERATORS = Object.values(ScooterOperator)

export interface GetScootersByPositionParams {
    latitude: number
    longitude: number
    distance?: number
    limit?: number
    operators?: ScooterOperator[]
}

export function createGetScootersByPosition(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)
    const { host, headers } = getScootersHost(config)

    return async function getScootersByPosition(
        params: GetScootersByPositionParams,
        options?: RequestOptions,
    ): Promise<Scooter[]> {
        const {
            latitude: lat,
            longitude: lon,
            distance: range = 200,
            limit: max = 20,
            operators = ALL_OPERATORS,
        } = params

        if (!operators?.length) {
            return []
        }

        const data = await get<Scooter[]>(
            host,
            {
                lat,
                lon,
                range,
                max,
                operators: operators.join(','),
            },
            headers,
            config.fetch,
            options,
        )

        return data || []
    }
}

export function isBatteryScooter(scooter: Scooter): scooter is BatteryScooter {
    return 'battery' in scooter
}

export function isBatteryLevelScooter(
    scooter: Scooter,
): scooter is BatteryLevelScooter {
    return 'batteryLevel' in scooter
}
