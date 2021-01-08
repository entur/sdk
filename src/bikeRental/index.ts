import { RequestOptions } from '../http'
import { journeyPlannerQuery } from '../api'

import {
    getBikeRentalStationQuery,
    getBikeRentalStationsQuery,
    getBikeRentalStationsByPositionQuery,
} from './query'

import { convertPositionToBbox, forceOrder } from '../utils'
import { Coordinates } from '../types/Coordinates'

import { BikeRentalStation } from '../fields/BikeRentalStation'
import { getServiceConfig, ArgumentConfig } from '../config'

export function createGetBikeRentalStation(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getBikeRentalStation(
        stationId: string,
        options?: RequestOptions,
    ): Promise<BikeRentalStation> {
        const variables = {
            id: stationId,
        }

        return journeyPlannerQuery<{ bikeRentalStation: BikeRentalStation }>(
            getBikeRentalStationQuery,
            variables,
            config,
            options,
        ).then((data) => data?.bikeRentalStation)
    }
}

export function createGetBikeRentalStations(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getBikeRentalStations(
        stationIds: string[],
        options?: RequestOptions,
    ): Promise<Array<BikeRentalStation | undefined>> {
        if (!stationIds || !Array.isArray(stationIds)) {
            throw new Error(
                `getBikeRentalStations takes an array of strings, but got ${typeof stationIds}`,
            )
        }

        if (stationIds.length === 0) {
            return Promise.resolve([])
        }

        const variables = {
            ids: stationIds,
        }

        return journeyPlannerQuery<{
            bikeRentalStations?: BikeRentalStation[]
        }>(getBikeRentalStationsQuery, variables, config, options)
            .then((data) => data?.bikeRentalStations || [])
            .then((stations) =>
                forceOrder(stations, stationIds, ({ id }) => id),
            )
    }
}

export function createGetBikeRentalStationsByPosition(
    argConfig: ArgumentConfig,
) {
    const config = getServiceConfig(argConfig)

    return function getBikeRentalStationsByPosition(
        coordinates: Coordinates,
        distance = 500,
        options?: RequestOptions,
    ): Promise<BikeRentalStation[]> {
        const variables = convertPositionToBbox(coordinates, distance)

        return journeyPlannerQuery<{
            bikeRentalStationsByBbox?: BikeRentalStation[]
        }>(
            getBikeRentalStationsByPositionQuery,
            variables,
            config,
            options,
        ).then((data) => data?.bikeRentalStationsByBbox || [])
    }
}
