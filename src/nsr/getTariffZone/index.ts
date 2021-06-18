import { get, RequestOptions } from '../../http'
import { getServiceConfig, getNSRHost, ArgumentConfig } from '../../config'

import { TariffZone } from '../types'

export default function createGetTariffZone(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)
    const { host, headers } = getNSRHost(config)

    return async function getTariffZone(
        id: string,
        options?: RequestOptions,
    ): Promise<TariffZone> {
        const url = `${host}/tariff-zones/${id}`
        const data = await get<TariffZone>(
            url,
            undefined,
            headers,
            config.fetch,
            options,
        )

        return data
    }
}
