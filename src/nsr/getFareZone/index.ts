import { get, RequestOptions } from '../../http'
import { getServiceConfig, getNSRHost, ArgumentConfig } from '../../config'

import { FareZone } from '../types'

export default function createGetFareZone(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)
    const { host, headers } = getNSRHost(config)

    return async function getFareZone(
        id: string,
        options?: RequestOptions,
    ): Promise<FareZone> {
        const url = `${host}/read/fare-zones/${id}`
        const data = await get<FareZone>(
            url,
            undefined,
            headers,
            config.fetch,
            options,
        )

        return data
    }
}
