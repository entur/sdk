import { get, RequestOptions } from '../../http'
import { getServiceConfig, getNSRHost, ArgumentConfig } from '../../config'

import { TopographicPlace } from '../types'

export default function createGetTopographicPlace(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)
    const { host, headers } = getNSRHost(config)

    return async function getTopographicPlace(
        id: string,
        options?: RequestOptions,
    ): Promise<TopographicPlace> {
        const url = `${host}/read/topographic-places/${id}`
        const data = await get<TopographicPlace>(
            url,
            undefined,
            headers,
            config.fetch,
            options,
        )

        return data
    }
}
