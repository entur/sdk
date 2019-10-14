// @flow
import { journeyPlannerQuery } from '../api'

import {
    getBikeRentalStationQuery,
    getBikeRentalStationsQuery,
    getBikeRentalStationsByPositionQuery,
} from './query'

import { convertPositionToBbox, forceOrder } from '../utils'
import type { BikeRentalStation, Coordinates } from '../../flow-types'

export function getBikeRentalStation(stationId: string): Promise<BikeRentalStation> {
    const variables = {
        id: stationId,
    }

    return journeyPlannerQuery(getBikeRentalStationQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.bikeRentalStation)
}

export function getBikeRentalStations(
    stationIds: Array<string>,
): Promise<Array<BikeRentalStation | void>> {
    if (!stationIds || !Array.isArray(stationIds)) {
        throw new Error(`getBikeRentalStations takes an an array of strings, but got ${typeof stationIds}`)
    }

    if (stationIds.length === 0) {
        return Promise.resolve([])
    }

    const variables = {
        ids: stationIds,
    }

    return journeyPlannerQuery(getBikeRentalStationsQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.bikeRentalStations || [])
        // TODO: JourneyPlanner does not support filtering yet, so we filter on ID ourselves.
        .then(stations => stations.filter(({ id }) => stationIds.includes(id)))
        .then((stations: Array<BikeRentalStation>) => {
            return forceOrder<BikeRentalStation>(stations, stationIds, ({ id }) => id)
        })
}

export function getBikeRentalStationsByPosition(
    coordinates: Coordinates,
    distance?: number = 500,
): Promise<Array<BikeRentalStation>> {
    const variables = convertPositionToBbox(coordinates, distance)

    return journeyPlannerQuery(
        getBikeRentalStationsByPositionQuery,
        variables,
        undefined,
        this.config,
    )
        .then((data: Object = {}) => data?.bikeRentalStationsByBbox || [])
}
