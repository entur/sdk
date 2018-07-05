// @flow
import geolib from 'geolib'
import { post } from '../api'
import type { HostConfig } from '../config'
import { getBikeRentalStationProp, getBikeRentalStationByBoxProps } from './query'

function getBoundingBox(initialPoint, dist) {
    const east = geolib.computeDestinationPoint(initialPoint, dist, 0)
    const north = geolib.computeDestinationPoint(initialPoint, dist, 90)
    const west = geolib.computeDestinationPoint(initialPoint, dist, 180)
    const south = geolib.computeDestinationPoint(initialPoint, dist, 270)

    return geolib.getBounds([east, north, west, south])
}

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
    coordinates: Object,
    distance: number = 500,
): Promise<Array<Object>> {
    const url = `${host}/graphql`

    const {
        maxLat, maxLng, minLat, minLng,
    } = getBoundingBox(coordinates, distance)

    const variables = {
        maxLat, maxLng, minLat, minLng,
    }
    const params = { query: getBikeRentalStationByBoxProps, variables }

    return post(url, params, headers)
        .then(response => response.data.bikeRentalStationsByBbox)
}
