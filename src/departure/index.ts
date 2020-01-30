import { journeyPlannerQuery } from '../api'
import {
    BUS, TRAM, RAIL, METRO, WATER, AIR, COACH, CAR,
} from '../constants/travelModes'

import { forceOrder } from '../utils'

import { EstimatedCall } from '../fields/EstimatedCall'
import { Leg } from '../fields/Leg'

import {
    getDeparturesFromStopPlacesQuery,
    getDeparturesFromQuayQuery,
    getDeparturesBetweenStopPlacesQuery,
    getDeparturesForServiceJourneyQuery,
} from './query'

import {
    destinationMapper,
    legToDepartureMapper,
} from './mapper'

import { getServiceConfig, ArgumentConfig } from '../config'
import { isTruthy } from '../utils'

export type DeparturesById = {
    id: string;
    departures: Array<EstimatedCall>;
}

type GetDeparturesParams = {
    includeCancelledTrips?: boolean;
    includeNonBoarding?: boolean;
    limit?: number;
    limitPerLine?: number;
    start?: Date;
    timeRange?: number;
    whiteListedLines?: Array<string>;
    whiteListedAuthorities?: Array<string>;
    whiteListedModes?: Array<string>;
}

export function createGetDeparturesFromStopPlaces(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getDeparturesFromStopPlaces(
        stopPlaceIds: Array<string>,
        params: GetDeparturesParams = {},
    ): Promise<Array<DeparturesById | void>> {
        if (!Array.isArray(stopPlaceIds)) {
            throw new Error(`getDeparturesFromStopPlaces takes an an array of strings, but got ${typeof stopPlaceIds}`)
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

        return journeyPlannerQuery<{ stopPlaces?: Array<{ id: string; estimatedCalls: EstimatedCall[] }> }>(getDeparturesFromStopPlacesQuery, variables, config)
            .then((data) => {
                if (!data?.stopPlaces) {
                    return []
                }

                return data.stopPlaces.map(({ estimatedCalls, ...stopPlace }) => ({
                    ...stopPlace,
                    departures: estimatedCalls.map(destinationMapper),
                }))
            })
            .then((stopPlaces: Array<DeparturesById>) => {
                return forceOrder(stopPlaces, stopPlaceIds, ({ id }) => id)
            })
    }
}

export function createGetDeparturesFromStopPlace(argConfig: ArgumentConfig) {
    const getDeparturesFromStopPlaces = createGetDeparturesFromStopPlaces(argConfig)

    return function getDeparturesFromStopPlace(
        stopPlaceId: string,
        params?: GetDeparturesParams,
    ): Promise<Array<EstimatedCall>> {
        return getDeparturesFromStopPlaces([stopPlaceId], params)
            .then((stopPlaces: Array<DeparturesById | void>) => {
                if (!stopPlaces?.length || !stopPlaces[0]) return []
                return stopPlaces[0].departures || []
            })
    }
}

export function createGetDeparturesFromQuays(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getDeparturesFromQuays(
        quayIds: Array<string>,
        params: GetDeparturesParams = {},
    ): Promise<Array<DeparturesById | void>> {
        if (!Array.isArray(quayIds)) {
            throw new Error(`getDeparturesFromQuays takes an an array of strings, but got ${typeof quayIds}`)
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
        return journeyPlannerQuery<{ quays?: Array<{ estimatedCalls: EstimatedCall[]; id: string }> }>(
            getDeparturesFromQuayQuery,
            variables,
            config
        )
            .then((data) => {
                if (!data || !data?.quays) {
                    return []
                }

                return data.quays.map(({ estimatedCalls, ...stopPlace }) => ({
                    ...stopPlace,
                    departures: estimatedCalls.map(destinationMapper),
                }))
            })
            .then((quayDepartures: Array<DeparturesById>) => {
                return forceOrder(quayDepartures, quayIds, ({ id }) => id)
            })
    }
}

export type GetDeparturesBetweenStopPlacesParams = {
    limit?: number;
    start?: Date;
}
export function createGetDeparturesBetweenStopPlaces(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getDeparturesBetweenStopPlaces(
        fromStopPlaceId: string,
        toStopPlaceId: string,
        params: GetDeparturesBetweenStopPlacesParams = {},
    ): Promise<Array<EstimatedCall>> {
        const {
            limit = 20,
            start = new Date(),
            ...rest
        } = params
        const variables = {
            from: { place: fromStopPlaceId },
            to: { place: toStopPlaceId },
            limit,
            dateTime: start.toISOString(),
            arriveBy: false,
            modes: [BUS, TRAM, RAIL, METRO, WATER, AIR, COACH, CAR],
            ...rest,
        }

        return journeyPlannerQuery<{ trip: { tripPatterns: Array<{ legs: Leg[] }> }}>(
            getDeparturesBetweenStopPlacesQuery,
            variables,
            config,
        )
            .then((data) => {
                if (!data || !data?.trip?.tripPatterns) return []

                return data.trip.tripPatterns.map((trip) => {
                    const [leg] = trip.legs
                    if (!leg) return undefined

                    return legToDepartureMapper(leg)
                }).filter(isTruthy)
            })
    }
}

export function createGetDeparturesForServiceJourney(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getDeparturesForServiceJourney(
        id: string,
        date?: string,
    ): Promise<Array<EstimatedCall>> {
        const variables = {
            id,
            date,
        }

        return journeyPlannerQuery<{ serviceJourney?: { estimatedCalls: EstimatedCall[] }}>(
            getDeparturesForServiceJourneyQuery,
            variables,
            config,
        )
            .then((data) => {
                return (data?.serviceJourney?.estimatedCalls || []).map(destinationMapper)
            })
    }
}

export function getStopPlaceDeparturesDEPRECATED() {
    throw new Error('Entur SDK: "getStopPlaceDepartures" is deprecated, use "getDeparturesForStopPlace" or getDeparturesForStopPlaces instead.')
}
