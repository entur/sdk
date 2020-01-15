// @flow
import { journeyPlannerQuery } from '../api'
import {
    FOOT, BUS, TRAM, RAIL, METRO, WATER, AIR,
} from '../constants/travelModes'

import {
    getTripPatternQuery,
} from './query'

import { legMapper } from './mapper'

import type {
    Location,
    QueryMode,
    TransportMode,
    TransportSubmode,
} from '../../flow-types'
import { convertFeatureToLocation, isValidDate } from '../utils'

import type { Leg } from '../fields/Leg'

type TripPattern = {
    distance: number,
    directDuration: number,
    duration: number,
    endTime: string,
    id?: string,
    legs: Array<Leg>,
    startTime: string,
    walkDistance: number
}

type TransportSubmodeParam = {
    transportMode: TransportMode,
    transportSubmodes: Array<TransportSubmode>,
}

type InputBanned = {|
    lines?: Array<string>,
    authorities?: Array<string>,
    organisations?: Array<string>,
    quays?: Array<string>,
    quaysHard?: Array<string>,
    serviceJourneys?: Array<string>,
|}

type InputWhiteListed = {|
    lines?: Array<string>,
    authorities?: Array<string>,
    organisations?: Array<string>,
|}

export type GetTripPatternsParams = {
    from: Location,
    to: Location,
    allowBikeRental?: boolean,
    arriveBy?: boolean,
    limit?: number,
    maxPreTransitWalkDistance?: number,
    modes?: Array<QueryMode>,
    searchDate?: Date,
    transportSubmodes?: Array<TransportSubmodeParam>,
    useFlex?: boolean,
    walkSpeed?: number,
    wheelchairAccessible?: boolean,
    banned?: InputBanned,
    whiteListed?: InputWhiteListed,
}

const DEFAULT_GET_TRIP_PATTERN_IGNORE_FIELDS = [
    'notices',
    'situations',
    'journeyPattern',
    'fromEstimatedCall',
    'toEstimatedCall',
    'intermediateEstimatedCalls',
    'interchangeFrom',
    'interchangeTo',
    'pointsOnLink',
    'authority',
    'operator',
    'quay',
    'bookingArrangements',
    'rentedBike',
]

export function getTripPatterns(
    params: GetTripPatternsParams = {},
    ignoreFields?: Array<string> = DEFAULT_GET_TRIP_PATTERN_IGNORE_FIELDS,
): Promise<Array<TripPattern>> {
    const {
        from,
        to,
        searchDate = new Date(),
        arriveBy = false,
        modes = [FOOT, BUS, TRAM, RAIL, METRO, WATER, AIR],
        transportSubmodes = [],
        wheelchairAccessible = false,
        limit = 5,
        ...rest
    } = params

    const variables = {
        from,
        to,
        dateTime: searchDate.toISOString(),
        arriveBy,
        modes,
        transportSubmodes,
        wheelchair: wheelchairAccessible,
        numTripPatterns: limit,
        ...rest,
    }

    return journeyPlannerQuery(getTripPatternQuery, variables, ignoreFields, this.config)
        .then((data: Object = {}) => {
            if (!data?.trip?.tripPatterns) {
                return []
            }

            return data.trip.tripPatterns.map(trip => ({
                ...trip,
                legs: trip.legs.map(legMapper),
            }))
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

    return this.getTripPatterns(
        convertFeatureToLocation(fromFeatures[0]),
        convertFeatureToLocation(toFeatures[0]),
        searchDate,
    )
}
