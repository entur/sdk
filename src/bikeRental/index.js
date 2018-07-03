// @flow
import { post } from '../api'
import type { HostConfig } from '../config'
import { getBikeRentalStationProp } from './query'

export function getBikeRentalStation(
    { host, headers }: HostConfig,
    stationId: string,
): Promise<Array<Object>> {
    const url = `${host}/graphql`
    const variables = {
        id: stationId,
    }
    const params = { query: getBikeRentalStationProp, variables }

    return post(url, params, headers)
        .then(response => response.data.bikeRentalStation)
}
