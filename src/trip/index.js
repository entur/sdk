// @flow
import { post } from '../api'
import {
    FOOT, BUS, TRAM, RAIL, METRO, WATER, AIR,
} from '../constants/travelModes'
import {
    getItinerariesProps,
    getStopPlaceDeparturesProps,
    getStopPlaceProps,
    getStopPlacesByBboxProps,
} from './query'
import { getJourneyPlannerHost } from '../config'

import type {
    Coordinates,
    TripPattern,
    Location,
    StopPlace,
    LegMode,
} from '../../flow-types'
import { convertPositionToBbox, convertFeatureToLocation, isValidDate } from '../utils'

type StopPlaceParams = {
    onForBoarding?: boolean, // deprecated
    includeNonBoarding?: boolean,
    departures?: number,
    timeRange?: number,
}

const DEFAULT_SEARCH_PARAMS = {
    arriveBy: false,
    modes: [FOOT, BUS, TRAM, RAIL, METRO, WATER, AIR],
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
export function getTripPatterns(searchParams: GetTripPatternsParams): Promise<Array<TripPattern>> {
    const { host, headers } = getJourneyPlannerHost(this.config)
    const url = `${host}/graphql`

    const {
        searchDate, limit, wheelchairAccessible, ...rest
    } = { ...DEFAULT_SEARCH_PARAMS, ...searchParams }

    const variables = {
        ...rest,
        dateTime: searchDate.toISOString(),
        numTripPatterns: limit,
        wheelchair: wheelchairAccessible,
    }

    return post(url, { query: getItinerariesProps, variables }, headers)
        .then((response: Object) => {
            try {
                return response.data.trip.tripPatterns
            } catch (e) {
                return []
            }
        })
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
    const { host, headers } = getJourneyPlannerHost(this.config)
    const {
        timeRange, departures, onForBoarding, includeNonBoarding,
    } = { ...DEFAULT_STOP_PLACE_PARAMS, ...stopPlaceParams }

    let omitNonBoarding = !includeNonBoarding

    if (onForBoarding !== undefined) {
        // eslint-disable-next-line no-console
        console.info('Entur SDK: "onForBoarding" is deprecated, use "includeNonBoarding" instead.')
        omitNonBoarding = !onForBoarding
    }

    const url = `${host}/graphql`

    const askingForSingleStopPlace = typeof stopPlaceIds === 'string'

    const variables = {
        ids: askingForSingleStopPlace ? [stopPlaceIds] : stopPlaceIds,
        start: new Date().toISOString(),
        range: timeRange,
        departures,
        omitNonBoarding,
    }

    const params = { query: getStopPlaceDeparturesProps, variables }

    return post(url, params, headers)
        .then((response: Object) => {
            if (!response || !response.data) {
                throw new Error(`Entur SDK: Could not fetch departures for ids: ${JSON.stringify(stopPlaceIds)}`)
            }
            const stopPlaces = response.data.stopPlaces || []
            if (askingForSingleStopPlace) {
                return stopPlaces.length ? stopPlaces[0].estimatedCalls || [] : []
            }
            return stopPlaces.map(({ id, estimatedCalls }) => ({
                id,
                departures: estimatedCalls,
            }))
        })
}

export function getStopPlace(id: string): Promise<StopPlace> {
    const { host, headers } = getJourneyPlannerHost(this.config)
    const url = `${host}/graphql`

    const variables = { id }
    const params = { query: getStopPlaceProps, variables }

    return post(url, params, headers)
        .then((response) => {
            try {
                return response.data.stopPlace
            } catch (e) {
                throw new Error(`Could not find stop place with ID "${id}"`)
            }
        })
}

export function getStopPlacesByPosition(
    coordinates: Coordinates,
    distance: number = 500,
): Promise<Array<StopPlace>> {
    const { host, headers } = getJourneyPlannerHost(this.config)
    const url = `${host}/graphql`

    const variables = convertPositionToBbox(coordinates, distance)
    const params = { query: getStopPlacesByBboxProps, variables }

    return post(url, params, headers)
        .then((response) => {
            try {
                return response.data.stopPlacesByBbox
            } catch (e) {
                return []
            }
        })
}
