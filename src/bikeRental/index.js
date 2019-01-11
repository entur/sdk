// @flow
import { journeyPlannerQuery } from '../api'

import { getBikeRentalStationQuery, getBikeRentalStationByBoxQuery } from './query'

import { convertPositionToBbox } from '../utils'
import type { BikeRentalStation, Coordinates } from '../../flow-types'

export function getBikeRentalStation(stationId: string): Promise<BikeRentalStation> {
    const variables = {
        id: stationId,
    }

    return journeyPlannerQuery(getBikeRentalStationQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.bikeRentalStation)
}

export function getBikeRentalStations(
    coordinates: Coordinates,
    distance: number = 500,
): Promise<Array<BikeRentalStation>> {
    const variables = convertPositionToBbox(coordinates, distance)

    return journeyPlannerQuery(getBikeRentalStationByBoxQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.bikeRentalStationsByBbox || [])
}
