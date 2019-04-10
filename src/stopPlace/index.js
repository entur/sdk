// @flow
import { journeyPlannerQuery, nsrQuery } from '../api'

import {
    getStopPlaceQuery,
    getStopPlacesQuery,
    getParentStopPlaceQuery,
    getStopPlacesByBboxQuery,
    getStopPlaceFacilitiesQuery,
    getQuaysForStopPlaceQuery,
} from './query'

import { convertPositionToBbox, forceOrder } from '../utils'

import type { Quay, Coordinates } from '../../flow-types'
import type { StopPlaceDetails, StopPlaceFacilities } from '../../flow-types/StopPlace'

type StopPlaceParams = { includeUnusedQuays?: boolean }

export function getStopPlace(
    stopPlaceId: string,
    params?: StopPlaceParams = {},
): Promise<StopPlaceDetails> {
    const { includeUnusedQuays = true, ...rest } = params
    const variables = {
        id: stopPlaceId,
        filterByInUse: !includeUnusedQuays,
        ...rest,
    }

    return journeyPlannerQuery(getStopPlaceQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.stopPlace)
}

export function getStopPlaces(
    stopPlaceIds: Array<string>,
    params?: StopPlaceParams = {},
): Promise<Array<StopPlaceDetails | void>> {
    const { includeUnusedQuays = true, ...rest } = params
    const variables = {
        ids: stopPlaceIds,
        filterByInUse: !includeUnusedQuays,
        ...rest,
    }

    return journeyPlannerQuery(getStopPlacesQuery, variables, undefined, this.config)
        .then((data: Object) => data?.stopPlaces || [])
        .then((stopPlaceDetails: Array<StopPlaceDetails>) => {
            return forceOrder<StopPlaceDetails>(stopPlaceDetails, stopPlaceIds, ({ id }) => id)
        })
}

export function getParentStopPlace(
    stopPlaceId: string,
    params?: StopPlaceParams = {},
): Promise<StopPlaceDetails> {
    const { includeUnusedQuays = true, ...rest } = params
    const variables = {
        id: stopPlaceId,
        filterByInUse: !includeUnusedQuays,
        ...rest,
    }

    return journeyPlannerQuery(getParentStopPlaceQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.stopPlace?.parent)
}

export function getStopPlacesByPosition(
    coordinates: Coordinates,
    distance?: number = 500,
    params?: StopPlaceParams = {},
): Promise<Array<StopPlaceDetails>> {
    const { includeUnusedQuays = true, ...rest } = params
    const variables = {
        ...convertPositionToBbox(coordinates, distance),
        filterByInUse: !includeUnusedQuays,
        ...rest,
    }

    return journeyPlannerQuery(getStopPlacesByBboxQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.stopPlacesByBbox || [])
}

export function getStopPlaceFacilities(stopPlaceId: string): Promise<StopPlaceFacilities> {
    const variables = { id: stopPlaceId }
    return nsrQuery(getStopPlaceFacilitiesQuery, variables, undefined, this.config)
}

export function getQuaysForStopPlace(
    stopPlaceId: string,
    params?: StopPlaceParams = {},
): Promise<Array<Quay>> {
    const { includeUnusedQuays = true, ...rest } = params
    const variables = {
        id: stopPlaceId,
        filterByInUse: !includeUnusedQuays,
        ...rest,
    }

    return journeyPlannerQuery(getQuaysForStopPlaceQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.stopPlace?.quays || [])
}
