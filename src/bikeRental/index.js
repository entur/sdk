// @flow
import { journeyPlannerQuery } from '../api'

import { getBikeRentalStationProp, getBikeRentalStationByBoxProps } from './query'
import { convertPositionToBbox } from '../utils'
import type { BikeRentalStation, Coordinates } from '../../flow-types'

export function getBikeRentalStation(stationId: string): Promise<BikeRentalStation> {
    const variables = {
        id: stationId,
    }

    return journeyPlannerQuery(getBikeRentalStationProp, variables, this.config)
        .then(response => response.data.bikeRentalStation)
}

export function getBikeRentalStations(
    coordinates: Coordinates,
    distance: number = 500,
): Promise<Array<BikeRentalStation>> {
    const variables = convertPositionToBbox(coordinates, distance)

    return journeyPlannerQuery(getBikeRentalStationByBoxProps, variables, this.config)
        .then((response: Object = {}) => response?.data?.bikeRentalStationsByBbox || [])
}
