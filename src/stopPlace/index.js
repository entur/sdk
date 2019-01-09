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
        .then((response: Object = {}) => {
            if (!response?.data?.stopPlace) {
                throw new Error(`Could not find stop place with ID "${id}"`)
            }
            return response.data.stopPlace
        })
}

export function getStopPlacesByPosition(
    coordinates: Coordinates,
    distance: number = 500,
): Promise<Array<StopPlace>> {
    const variables = convertPositionToBbox(coordinates, distance)

    return journeyPlannerQuery(getStopPlacesByBboxQuery, variables, undefined, this.config)
        .then((response: Object = {}) => {
            if (!response?.data?.stopPlacesByBbox) {
                return []
            }
            return response.data.stopPlacesByBbox
        })
}

export function getStopPlaceFacilities(stopPlaceId: string) {
    return nsrQuery(getStopPlaceFacilitiesQuery, {
        id: stopPlaceId,
    })
}
