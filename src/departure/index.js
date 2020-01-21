// @flow
import { journeyPlannerQuery } from '../api'
import {
    BUS, TRAM, RAIL, METRO, WATER, AIR, COACH, CAR,
} from '../constants/travelModes'

import { forceOrder } from '../utils'

import type { EstimatedCall } from '../fields/EstimatedCall'

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

export type DeparturesById = {
    id: string,
    departures: Array<EstimatedCall>
}

type GetDeparturesParams = {
    includeNonBoarding?: boolean,
    limit?: number,
    limitPerLine?: number,
    start?: Date,
    timeRange?: number,
    whiteListedLines?: Array<string>,
    whiteListedAuthorities?: Array<string>,
    whiteListedModes?: Array<string>,
}

export function getDeparturesFromStopPlaces(
    stopPlaceIds: Array<string>,
    params?: GetDeparturesParams = {},
): Promise<Array<DeparturesById | void>> {
    const {
        limit = 50,
        timeRange = 72000,
        start = new Date(),
        limitPerLine,
        includeNonBoarding = false,
        whiteListedLines,
        whiteListedAuthorities,
        whiteListedModes,
        ...rest
    } = params

    const variables = {
        ids: stopPlaceIds,
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

    return journeyPlannerQuery(getDeparturesFromStopPlacesQuery, variables, this.config)
        .then((data: Object = {}) => {
            if (!data?.stopPlaces) {
                return []
            }

            return data.stopPlaces.map(({ estimatedCalls, ...stopPlace }) => ({
                ...stopPlace,
                departures: estimatedCalls.map(destinationMapper),
            }))
        })
        .then((stopPlaces: Array<DeparturesById>) => {
            return forceOrder<DeparturesById>(stopPlaces, stopPlaceIds, ({ id }) => id)
        })
}

export function getDeparturesFromStopPlace(
    stopPlaceId: string,
    params?: GetDeparturesParams,
): Promise<Array<EstimatedCall>> {
    return getDeparturesFromStopPlaces.call(this, [stopPlaceId], params)
        .then((stopPlaces: Array<DeparturesById | void>) => stopPlaces[0]?.departures || [])
}

export function getDeparturesFromQuays(
    quayIds: Array<string>,
    params?: GetDeparturesParams = {},
): Promise<Array<DeparturesById | void>> {
    const {
        limit = 30,
        limitPerLine,
        timeRange = 72000,
        includeNonBoarding = false,
        start = new Date(),
        ...rest
    } = params

    const variables = {
        ids: quayIds,
        start: start.toISOString(),
        omitNonBoarding: !includeNonBoarding,
        timeRange,
        limit,
        limitPerLine,
        ...rest,
    }
    return journeyPlannerQuery(getDeparturesFromQuayQuery, variables, this.config)
        .then((data: Object = {}) => {
            if (!data?.quays) {
                return []
            }

            return data.quays.map(({ estimatedCalls, ...stopPlace }) => ({
                ...stopPlace,
                departures: estimatedCalls.map(destinationMapper),
            }))
        })
        .then((quayDepartures: Array<DeparturesById>) => {
            return forceOrder<DeparturesById>(quayDepartures, quayIds, ({ id }) => id)
        })
}

export type GetDeparturesBetweenStopPlacesParams = {
    limit?: number,
    start?: Date
}
export function getDeparturesBetweenStopPlaces(
    fromStopPlaceId: string,
    toStopPlaceId: string,
    params?: GetDeparturesBetweenStopPlacesParams = {},
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

    return journeyPlannerQuery(
        getDeparturesBetweenStopPlacesQuery,
        variables,
        this.config,
    )
        .then((data: Object) => {
            if (!data?.trip?.tripPatterns) return []

            return data.trip.tripPatterns.map((trip) => {
                const [leg] = trip.legs
                if (!leg) return undefined

                return legToDepartureMapper(leg)
            }).filter(Boolean)
        })
}

export function getDeparturesForServiceJourney(
    id: string,
    date?: string,
): Promise<Array<EstimatedCall>> {
    const variables = {
        id,
        date,
    }

    return journeyPlannerQuery(
        getDeparturesForServiceJourneyQuery,
        variables,
        this.config,
    )
        .then((data: Object) => {
            return (data?.serviceJourney?.estimatedCalls || []).map(destinationMapper)
        })
}

export function getStopPlaceDeparturesDEPRECATED() {
    throw new Error('Entur SDK: "getStopPlaceDepartures" is deprecated, use "getDeparturesForStopPlace" or getDeparturesForStopPlaces instead.')
}
