import { get, RequestOptions } from '../../http'
import { getServiceConfig, getNSRHost, ArgumentConfig } from '../../config'

import { GroupOfStopPlaces } from '../types'

export default function createGetGroupOfStopPlaces(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)
    const { host, headers } = getNSRHost(config)

    return async function getGroupOfStopPlaces(
        id: string,
        options?: RequestOptions,
    ): Promise<GroupOfStopPlaces> {
        const url = `${host}/groups-of-stop-places/${id}`
        const data = await get<GroupOfStopPlaces>(
            url,
            undefined,
            headers,
            config.fetch,
            options,
        )

        return data
    }
}
