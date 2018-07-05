// @flow
import { post } from '../api'
import type { HostConfig } from '../config'
import { getBikeRentalStationProp, getBikeRentalStationByBoxProps } from './query'

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

export function getBikeRentalStations(
    { host, headers }: HostConfig,
    distance?: number,
    coordinates: Object,
): Promise<Array<Object>> {
    const url = `${host}/graphql`

    // // TODO: Do math
    const variables = {
        coordinates,
        /*
        minLatitude:
        maxLatitude:
        minLongitude:
        maxLongitude:
        */
    }
    const params = { query: getBikeRentalStationByBoxProps, variables }

    return post(url, params, headers)
        .then(response => response.data)
}
