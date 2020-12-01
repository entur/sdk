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
import { Quay } from '../fields/Quay'

import { Coordinates } from '../types/Coordinates'
import { StopPlaceDetails, StopPlaceFacilities } from '../types/StopPlace'

import { getServiceConfig, ArgumentConfig } from '../config'

type StopPlaceParams = { includeUnusedQuays?: boolean }

export function createGetStopPlace(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getStopPlace(
        stopPlaceId: string,
        params: StopPlaceParams = {},
    ): Promise<StopPlaceDetails | undefined> {
        const { includeUnusedQuays = true, ...rest } = params
        const variables = {
            id: stopPlaceId,
            filterByInUse: !includeUnusedQuays,
            ...rest,
        }

        return journeyPlannerQuery<{ stopPlace?: StopPlaceDetails }>(
            getStopPlaceQuery,
            variables,
            config,
        ).then((data) => data?.stopPlace)
    }
}

export function createGetStopPlaces(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getStopPlaces(
        stopPlaceIds: string[],
        params: StopPlaceParams = {},
    ): Promise<Array<StopPlaceDetails | undefined>> {
        if (!Array.isArray(stopPlaceIds)) {
            throw new Error(
                `getStopPlaces takes an array of strings, but got ${typeof stopPlaceIds}`,
            )
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

        return journeyPlannerQuery<{ stopPlaces?: StopPlaceDetails[] }>(
            getStopPlacesQuery,
            variables,
            config,
        )
            .then((data) => data?.stopPlaces || [])
            .then((stopPlaceDetails: StopPlaceDetails[]) => {
                return forceOrder(
                    stopPlaceDetails,
                    stopPlaceIds,
                    ({ id }) => id,
                )
            })
    }
}

export function createGetParentStopPlace(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getParentStopPlace(
        stopPlaceId: string,
        params: StopPlaceParams = {},
    ): Promise<StopPlaceDetails | undefined> {
        const { includeUnusedQuays = true, ...rest } = params
        const variables = {
            id: stopPlaceId,
            filterByInUse: !includeUnusedQuays,
            ...rest,
        }

        return journeyPlannerQuery<{
            stopPlace?: { parent?: StopPlaceDetails }
        }>(getParentStopPlaceQuery, variables, config).then(
            (data) => data?.stopPlace?.parent,
        )
    }
}

export function createGetStopPlacesByPosition(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getStopPlacesByPosition(
        coordinates: Coordinates,
        distance = 500,
        params: StopPlaceParams = {},
    ): Promise<StopPlaceDetails[]> {
        const { includeUnusedQuays = true, ...rest } = params
        const variables = {
            ...convertPositionToBbox(coordinates, distance),
            filterByInUse: !includeUnusedQuays,
            ...rest,
        }

        return journeyPlannerQuery<{ stopPlacesByBbox?: StopPlaceDetails[] }>(
            getStopPlacesByBboxQuery,
            variables,
            config,
        ).then((data) => data?.stopPlacesByBbox || [])
    }
}

export function createGetStopPlaceFacilities(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getStopPlaceFacilities(
        stopPlaceId: string,
    ): Promise<StopPlaceFacilities> {
        const variables = { id: stopPlaceId }
        return nsrQuery(getStopPlaceFacilitiesQuery, variables, config)
    }
}

export function createGetQuaysForStopPlace(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getQuaysForStopPlace(
        stopPlaceId: string,
        params: StopPlaceParams = {},
    ): Promise<Quay[]> {
        const { includeUnusedQuays = true, ...rest } = params
        const variables = {
            id: stopPlaceId,
            filterByInUse: !includeUnusedQuays,
            ...rest,
        }

        return journeyPlannerQuery<{ stopPlace?: { quays?: Quay[] } }>(
            getQuaysForStopPlaceQuery,
            variables,
            config,
        ).then((data) => data?.stopPlace?.quays || [])
    }
}
