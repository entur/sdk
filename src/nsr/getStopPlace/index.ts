import { get, RequestOptions } from '../../http'
import { getServiceConfig, getNSRHost, ArgumentConfig } from '../../config'

import { StopPlace } from '../types'

export default function createGetStopPlace(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)
    const { host, headers } = getNSRHost(config)

    return async function getStopPlace(
        id: string,
        options?: RequestOptions,
    ): Promise<StopPlace> {
        const url = `${host}/stop-places/${id}`
        const data = await get<StopPlace>(
            url,
            undefined,
            headers,
            config.fetch,
            options,
        )

        return data
    }
}
