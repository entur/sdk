// @flow
import { post } from '../api'
import type { HostConfig } from '../config'
import { getBikeRentalStationProp, getBikeRentalStationByBoxProps } from './query'
import { convertPositionToBbox } from '../utils'
import type { BikeRentalStation, Coordinates } from '../flow-types'

export function getBikeRentalStation(
    { host, headers }: HostConfig,
    stationId: string,
): Promise<BikeRentalStation> {
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
): Promise<Array<BikeRentalStation>> {
    const url = `${host}/graphql`

    const variables = convertPositionToBbox(coordinates, distance)
    const params = { query: getBikeRentalStationByBoxProps, variables }

    return post(url, params, headers)
        .then(response => (response.data || {}).bikeRentalStationsByBbox || [])
}
