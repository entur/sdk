import { get, RequestOptions } from '../../http'
import { getServiceConfig, getNSRHost, ArgumentConfig } from '../../config'

import { Quay } from '../types'

export default function createGetQuay(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)
    const { host, headers } = getNSRHost(config)

    return async function getQuay(
        id: string,
        options?: RequestOptions,
    ): Promise<Quay> {
        const url = `${host}/quays/${id}`
        const data = await get<Quay>(
            url,
            undefined,
            headers,
            config.fetch,
            options,
        )

        return data
    }
}
