// @flow
import { journeyPlannerQuery, nsrQuery } from '../api'

import {
    getStopPlaceQuery,
    getStopPlacesByBboxQuery,
    getStopPlaceFacilitiesQuery,
} from './query'

import { convertPositionToBbox } from '../utils'

import type { Coordinates, StopPlace } from '../../flow-types'

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
}
