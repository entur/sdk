// @flow
import { post } from '../api'
import { getBikeRentalStationProp, getBikeRentalStationByBoxProps } from './query'
import { getJourneyPlannerHost } from '../config'
import { convertPositionToBbox } from '../utils'
import type { BikeRentalStation, Coordinates } from '../../flow-types'

export function getBikeRentalStation(stationId: string): Promise<BikeRentalStation> {
    const { host, headers } = getJourneyPlannerHost(this.config)

    const url = `${host}/graphql`
    const variables = {
        id: stationId,
    }
    const params = { query: getBikeRentalStationProp, variables }

    return post(url, params, headers)
        .then(response => response.data.bikeRentalStation)
}

export function getBikeRentalStations(
    coordinates: Coordinates,
    distance: number = 500,
): Promise<Array<BikeRentalStation>> {
    const { host, headers } = getJourneyPlannerHost(this.config)
    const url = `${host}/graphql`

    const variables = convertPositionToBbox(coordinates, distance)
    const params = { query: getBikeRentalStationByBoxProps, variables }

    return post(url, params, headers)
        .then(response => (response.data || {}).bikeRentalStationsByBbox || [])
}
