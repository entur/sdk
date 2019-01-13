// @flow
import { journeyPlannerQuery, nsrQuery } from '../api'

import {
    getStopPlaceQuery,
    getStopPlacesByBboxQuery,
    getStopPlaceFacilitiesQuery,
    getQuaysForStopPlaceQuery,
} from './query'

import { convertPositionToBbox } from '../utils'

import type { Quay, Coordinates, StopPlace } from '../../flow-types'

export function getStopPlace(id: string): Promise<StopPlace> {
    const variables = { id }

    return journeyPlannerQuery(getStopPlaceQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.stopPlace)
}

export function getStopPlacesByPosition(
    coordinates: Coordinates,
    distance: number = 500,
): Promise<Array<StopPlace>> {
    const variables = convertPositionToBbox(coordinates, distance)

    return journeyPlannerQuery(getStopPlacesByBboxQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.stopPlacesByBbox || [])
}

export function getStopPlaceFacilities(stopPlaceId: string) {
    const variables = { id: stopPlaceId }
    return nsrQuery(getStopPlaceFacilitiesQuery, variables, undefined, this.config)
}

type QuayParams = { filterByInUse?: boolean }
export function getQuaysForStopPlace(
    stopPlaceId: string,
    params?: QuayParams,
): Promise<Array<Quay>> {
    const variables = { id: stopPlaceId, ...params }
    return journeyPlannerQuery(getQuaysForStopPlaceQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.stopPlace?.quays || [])
}
