import { get, RequestOptions } from '../../http'
import { getServiceConfig, getNSRHost, ArgumentConfig } from '../../config'

import { Parking } from '../types'

export default function createGetParking(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)
    const { host, headers } = getNSRHost(config)

    return async function getParking(
        id: string,
        options?: RequestOptions,
    ): Promise<Parking> {
        const url = `${host}/read/parkings/${id}`
        const data = await get<Parking>(
            url,
            undefined,
            headers,
            config.fetch,
            options,
        )

        return data
    }
}
