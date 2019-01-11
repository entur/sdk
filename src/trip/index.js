// @flow
import { journeyPlannerQuery } from '../api'
import {
    FOOT, BUS, TRAM, RAIL, METRO, WATER, AIR,
} from '../constants/travelModes'

import {
    getTripPatternQuery,
    getStopPlaceDeparturesQuery,
} from './query'

import type {
    TripPattern,
    Location,
    LegMode,
} from '../../flow-types'
import { convertFeatureToLocation, isValidDate } from '../utils'

type StopPlaceParams = {
    includeNonBoarding?: boolean,
    departures?: number,
    timeRange?: number,
}

const DEFAULT_SEARCH_PARAMS = {
    arriveBy: false,
    modes: [FOOT, BUS, TRAM, RAIL, METRO, WATER, AIR],
    transportSubmode: [],
    limit: 5,
    wheelchairAccessible: false,
}

const DEFAULT_STOP_PLACE_PARAMS = {
    includeNonBoarding: false,
    departures: 50,
    timeRange: 72000,
}

export type GetTripPatternsParams = {
    searchDate: Date,
    from: Location,
    to: Location,
    arriveBy?: boolean,
    modes?: Array<LegMode>,
    limit?: number,
    wheelchairAccessible?: boolean,
}
export function getTripPatterns(
    searchParams: GetTripPatternsParams,
): Promise<Array<TripPattern>> {
    const {
        searchDate, limit, wheelchairAccessible, ...rest
    } = { ...DEFAULT_SEARCH_PARAMS, ...searchParams }

    const variables = {
        ...rest,
        dateTime: searchDate.toISOString(),
        numTripPatterns: limit,
        wheelchair: wheelchairAccessible,
    }

    return journeyPlannerQuery(getTripPatternQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.trip?.tripPatterns || [])
}

export async function findTrips(
    from: string,
    to: string,
    date?: Date | string | number,
): Promise<Array<TripPattern>> {
    const searchDate = date ? new Date(date) : new Date()

    if (!isValidDate(searchDate)) {
        throw new Error('Entur SDK: Could not parse <date> argument to valid Date')
    }

    const [fromFeatures, toFeatures] = await Promise.all([
        this.getFeatures(from),
        this.getFeatures(to),
    ])

    if (!fromFeatures || !fromFeatures.length) {
        throw new Error(`Entur SDK: Could not find any locations matching <from> argument "${from}"`)
    }

    if (!toFeatures || !toFeatures.length) {
        throw new Error(`Entur SDK: Could not find any locations matching <to> argument "${to}"`)
    }

    return this.getTripPatterns({
        searchDate,
        from: convertFeatureToLocation(fromFeatures[0]),
        to: convertFeatureToLocation(toFeatures[0]),
    })
}

export function getStopPlaceDepartures(
    stopPlaceIds: string | Array<string>,
    stopPlaceParams?: StopPlaceParams,
): Object {
    const {
        timeRange, departures, onForBoarding, includeNonBoarding,
    } = { ...DEFAULT_STOP_PLACE_PARAMS, ...stopPlaceParams }

    let omitNonBoarding = !includeNonBoarding

    if (onForBoarding !== undefined) {
        // eslint-disable-next-line no-console
        console.info('Entur SDK: "onForBoarding" is deprecated, use "includeNonBoarding" instead.')
        omitNonBoarding = !onForBoarding
    }

    const askingForSingleStopPlace = typeof stopPlaceIds === 'string'

    const variables = {
        ids: askingForSingleStopPlace ? [stopPlaceIds] : stopPlaceIds,
        start: new Date().toISOString(),
        range: timeRange,
        departures,
        omitNonBoarding,
    }

    return journeyPlannerQuery(getStopPlaceDeparturesQuery, variables, undefined, this.config)
        .then((data: Object = {}) => {
            const stopPlaces = data?.stopPlaces || []
            if (askingForSingleStopPlace) {
                return stopPlaces.length ? stopPlaces[0].estimatedCalls || [] : []
            }
            return stopPlaces.map(({ id, estimatedCalls }) => ({
                id,
                departures: estimatedCalls,
            }))
        })
}
