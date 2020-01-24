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
import type { Quay } from '../fields/Quay'

import type { Coordinates } from '../../flow-types'
import type { StopPlaceDetails, StopPlaceFacilities } from '../../flow-types/StopPlace'

import { getServiceConfig, type ArgumentConfig } from '../config'

type StopPlaceParams = { includeUnusedQuays?: boolean }

export function createGetStopPlace(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getStopPlace(
        stopPlaceId: string,
        params?: StopPlaceParams = {},
    ): Promise<StopPlaceDetails> {
        const { includeUnusedQuays = true, ...rest } = params
        const variables = {
            id: stopPlaceId,
            filterByInUse: !includeUnusedQuays,
            ...rest,
        }

        return journeyPlannerQuery(getStopPlaceQuery, variables, config)
            .then((data: Object = {}) => data?.stopPlace)
    }
}

export function createGetStopPlaces(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getStopPlaces(
        stopPlaceIds: Array<string>,
        params?: StopPlaceParams = {},
    ): Promise<Array<StopPlaceDetails | void>> {
        if (!stopPlaceIds || !Array.isArray(stopPlaceIds)) {
            throw new Error(`getStopPlaces takes an an array of strings, but got ${typeof stopPlaceIds}`)
        }

        if (stopPlaceIds.length === 0) {
            return Promise.resolve([])
        }

        const { includeUnusedQuays = true, ...rest } = params
        const variables = {
            ids: stopPlaceIds,
            filterByInUse: !includeUnusedQuays,
            ...rest,
        }

        return journeyPlannerQuery(getStopPlacesQuery, variables, config)
            .then((data: Object) => data?.stopPlaces || [])
            .then((stopPlaceDetails: Array<StopPlaceDetails>) => {
                return forceOrder<StopPlaceDetails>(stopPlaceDetails, stopPlaceIds, ({ id }) => id)
            })
    }
}

export function createGetParentStopPlace(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getParentStopPlace(
        stopPlaceId: string,
        params?: StopPlaceParams = {},
    ): Promise<StopPlaceDetails> {
        const { includeUnusedQuays = true, ...rest } = params
        const variables = {
            id: stopPlaceId,
            filterByInUse: !includeUnusedQuays,
            ...rest,
        }

        return journeyPlannerQuery(getParentStopPlaceQuery, variables, config)
            .then((data: Object = {}) => data?.stopPlace?.parent)
    }
}

export function createGetStopPlacesByPosition(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getStopPlacesByPosition(
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

        return journeyPlannerQuery(getStopPlacesByBboxQuery, variables, config)
            .then((data: Object = {}) => data?.stopPlacesByBbox || [])
    }
}

export function createGetStopPlaceFacilities(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getStopPlaceFacilities(stopPlaceId: string): Promise<StopPlaceFacilities> {
        const variables = { id: stopPlaceId }
        return nsrQuery(getStopPlaceFacilitiesQuery, variables, config)
    }
}

export function createGetQuaysForStopPlace(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getQuaysForStopPlace(
        stopPlaceId: string,
        params?: StopPlaceParams = {},
    ): Promise<Array<Quay>> {
        const { includeUnusedQuays = true, ...rest } = params
        const variables = {
            id: stopPlaceId,
            filterByInUse: !includeUnusedQuays,
            ...rest,
        }

        return journeyPlannerQuery(getQuaysForStopPlaceQuery, variables, config)
            .then((data: Object = {}) => data?.stopPlace?.quays || [])
    }
}
