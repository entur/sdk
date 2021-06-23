import { get, RequestOptions } from '../../http'
import { getServiceConfig, getNSRHost, ArgumentConfig } from '../../config'

import { Parking } from '../types'

export default function createGetParkingsForStopPlace(
    argConfig: ArgumentConfig,
) {
    const config = getServiceConfig(argConfig)
    const { host, headers } = getNSRHost(config)

    return async function getParkingsForStopPlace(
        id: string,
        options?: RequestOptions,
    ): Promise<Parking[]> {
        const url = `${host}/read/stop-places/${id}/parkings`
        const data = await get<Parking[]>(
            url,
            undefined,
            headers,
            config.fetch,
            options,
        )

        return data || []
    }
}
