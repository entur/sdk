import { RequestOptions } from '../http'
import { journeyPlannerQuery } from '../api'

import { forceOrder } from '../utils'

import { Departure } from '../fields/Departure'

import {
    getDeparturesFromStopPlacesQuery,
    getDeparturesFromQuayQuery,
    getDeparturesBetweenStopPlacesQuery,
    getDeparturesForServiceJourneyQuery,
} from './query'

import {
    destinationMapper,
    legToDepartureMapper,
    LegWithDepartures,
} from './mapper'

import { getServiceConfig, ArgumentConfig } from '../config'
import { isTruthy } from '../utils'
import { QueryMode } from '../types/Mode'

export type DeparturesById = {
    id: string
    departures: Departure[]
}

type GetDeparturesParams = {
    includeCancelledTrips?: boolean
    includeNonBoarding?: boolean
    limit?: number
    limitPerLine?: number
    start?: Date
    timeRange?: number
    whiteListedLines?: string[]
    whiteListedAuthorities?: string[]
    whiteListedModes?: string[]
}

export function createGetDeparturesFromStopPlaces(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getDeparturesFromStopPlaces(
        stopPlaceIds: string[],
        params: GetDeparturesParams = {},
        options?: RequestOptions,
    ): Promise<Array<DeparturesById | undefined>> {
        if (!Array.isArray(stopPlaceIds)) {
            throw new Error(
                `getDeparturesFromStopPlaces takes an array of strings, but got ${typeof stopPlaceIds}`,
            )
        }

        if (stopPlaceIds.length === 0) {
            return Promise.resolve([])
        }

        const {
            limit = 50,
            timeRange = 72000,
            start = new Date(),
            limitPerLine,
            includeCancelledTrips = false,
            includeNonBoarding = false,
            whiteListedLines,
            whiteListedAuthorities,
            whiteListedModes,
            ...rest
        } = params

        const variables = {
            ids: stopPlaceIds,
            includeCancelledTrips,
            start: start.toISOString(),
            omitNonBoarding: !includeNonBoarding,
            timeRange,
            limit,
            limitPerLine,
            whiteListedLines,
            whiteListedAuthorities,
            whiteListedModes,
            ...rest,
        }

        return journeyPlannerQuery<{
            stopPlaces?: Array<{ id: string; estimatedCalls: Departure[] }>
        }>(getDeparturesFromStopPlacesQuery, variables, config, options)
            .then((data) => {
                if (!data?.stopPlaces) {
                    throw new Error(
                        `Missing data: getDeparturesFromStopPlaces received no data from the API.`,
                    )
                }

                return data.stopPlaces.map(
                    ({ estimatedCalls, ...stopPlace }) => ({
                        ...stopPlace,
                        departures: estimatedCalls.map(destinationMapper),
                    }),
                )
            })
            .then((stopPlaces: DeparturesById[]) => {
                return forceOrder(stopPlaces, stopPlaceIds, ({ id }) => id)
            })
    }
}

export function createGetDeparturesFromStopPlace(argConfig: ArgumentConfig) {
    const getDeparturesFromStopPlaces =
        createGetDeparturesFromStopPlaces(argConfig)

    /**
     * Finds departures that leaves from a certain StopPlace.
     */
    return function getDeparturesFromStopPlace(
        stopPlaceId: string,
        params?: GetDeparturesParams,
    ): Promise<Departure[]> {
        return getDeparturesFromStopPlaces([stopPlaceId], params).then(
            (stopPlaces: Array<DeparturesById | undefined>) => {
                if (!stopPlaces?.length || !stopPlaces[0]) return []
                return stopPlaces[0].departures || []
            },
        )
    }
}

export function createGetDeparturesFromQuays(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getDeparturesFromQuays(
        quayIds: string[],
        params: GetDeparturesParams = {},
        options?: RequestOptions,
    ): Promise<Array<DeparturesById | undefined>> {
        if (!Array.isArray(quayIds)) {
            throw new Error(
                `getDeparturesFromQuays takes an array of strings, but got ${typeof quayIds}`,
            )
        }

        if (quayIds.length === 0) {
            return Promise.resolve([])
        }

        const {
            limit = 30,
            limitPerLine,
            timeRange = 72000,
            includeCancelledTrips = false,
            includeNonBoarding = false,
            start = new Date(),
            ...rest
        } = params

        const variables = {
            ids: quayIds,
            start: start.toISOString(),
            includeCancelledTrips,
            omitNonBoarding: !includeNonBoarding,
            timeRange,
            limit,
            limitPerLine,
            ...rest,
        }
        return journeyPlannerQuery<{
            quays?: Array<{ estimatedCalls: Departure[]; id: string }>
        }>(getDeparturesFromQuayQuery, variables, config, options)
            .then((data) => {
                if (!data || !data?.quays) {
                    throw new Error(
                        `Missing data: getDeparturesFromQuays received no data from the API.`,
                    )
                }

                return data.quays.map(({ estimatedCalls, ...stopPlace }) => ({
                    ...stopPlace,
                    departures: estimatedCalls.map(destinationMapper),
                }))
            })
            .then((quayDepartures: DeparturesById[]) => {
                return forceOrder(quayDepartures, quayIds, ({ id }) => id)
            })
    }
}

export type GetDeparturesBetweenStopPlacesParams = {
    limit?: number
    start?: Date
}
export function createGetDeparturesBetweenStopPlaces(
    argConfig: ArgumentConfig,
) {
    const config = getServiceConfig(argConfig)

    return function getDeparturesBetweenStopPlaces(
        fromStopPlaceId: string,
        toStopPlaceId: string,
        params: GetDeparturesBetweenStopPlacesParams = {},
        options?: RequestOptions,
    ): Promise<Departure[]> {
        const { limit = 20, start = new Date(), ...rest } = params
        const variables = {
            from: { place: fromStopPlaceId },
            to: { place: toStopPlaceId },
            limit,
            dateTime: start.toISOString(),
            arriveBy: false,
            modes: [
                QueryMode.BUS,
                QueryMode.TRAM,
                QueryMode.RAIL,
                QueryMode.METRO,
                QueryMode.WATER,
                QueryMode.AIR,
                QueryMode.COACH,
                QueryMode.CAR,
            ],
            ...rest,
        }

        return journeyPlannerQuery<{
            trip: { tripPatterns: Array<{ legs: LegWithDepartures[] }> }
        }>(
            getDeparturesBetweenStopPlacesQuery,
            variables,
            config,
            options,
        ).then((data) => {
            if (!data || !data?.trip?.tripPatterns) return []

            return data.trip.tripPatterns
                .map((trip) => {
                    const [leg] = trip.legs
                    if (!leg) return undefined

                    return legToDepartureMapper(leg)
                })
                .filter(isTruthy)
        })
    }
}

export function createGetDeparturesForServiceJourney(
    argConfig: ArgumentConfig,
) {
    const config = getServiceConfig(argConfig)

    return function getDeparturesForServiceJourney(
        id: string,
        date?: string,
        options?: RequestOptions,
    ): Promise<Departure[]> {
        const variables = {
            id,
            date,
        }

        return journeyPlannerQuery<{
            serviceJourney?: { estimatedCalls: Departure[] }
        }>(
            getDeparturesForServiceJourneyQuery,
            variables,
            config,
            options,
        ).then((data) => {
            return (data?.serviceJourney?.estimatedCalls || []).map(
                destinationMapper,
            )
        })
    }
}

export function getStopPlaceDeparturesDEPRECATED() {
    throw new Error(
        'Entur SDK: "getStopPlaceDepartures" is deprecated, use "getDeparturesForStopPlace" or getDeparturesForStopPlaces instead.',
    )
}
