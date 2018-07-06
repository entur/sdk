// @flow
import { post } from '../api'
import type { HostConfig } from '../config'
import { getBikeRentalStationProp, getBikeRentalStationByBoxProps } from './query'
import { convertPositionToBbox } from '../utils'
import type { Coordinates } from '../flow-types'

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
    coordinates: Coordinates,
    distance: number = 500,
): Promise<Array<Object>> {
    const url = `${host}/graphql`

    const positionArray = convertPositionToBbox(coordinates, distance)
    const variables = {
        minLng: positionArray[0],
        minLat: positionArray[1],
        maxLng: positionArray[2],
        maxLat: positionArray[3],
    }

    const params = { query: getBikeRentalStationByBoxProps, variables }

    return post(url, params, headers)
        .then(response => response.data.bikeRentalStationsByBbox)
}
