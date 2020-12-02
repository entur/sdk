import { journeyPlannerQuery, getGraphqlParams } from '../api'

import { getTripPatternQuery } from './query'

import { legMapper } from './mapper'

import { Location } from '../types/Location'
import { TransportMode, TransportSubmode, QueryMode } from '../types/Mode'

import { convertFeatureToLocation, isValidDate } from '../utils'

import { createGetFeatures } from '../geocoder'

import { Leg } from '../fields/Leg'

import {
    getServiceConfig,
    mergeConfig,
    ArgumentConfig,
    OverrideConfig,
} from '../config'

export interface TripPattern {
    distance: number
    directDuration: number
    duration: number
    /** @deprecated Use expectedEndTime instead */
    endTime: string
    expectedEndTime: string
    expectedStartTime: string
    id?: string
    legs: Leg[]
    /** @deprecated Use expectedStartTime instead */
    startTime: string
    walkDistance: number
}

interface TransportSubmodeParam {
    transportMode: TransportMode
    transportSubmodes: TransportSubmode[]
}

interface InputBanned {
    lines?: string[]
    authorities?: string[]
    organisations?: string[]
    quays?: string[]
    quaysHard?: string[]
    serviceJourneys?: string[]
}

interface InputWhiteListed {
    lines?: string[]
    authorities?: string[]
    organisations?: string[]
}

export interface GetTripPatternsParams {
    from: Location
    to: Location
    allowBikeRental?: boolean
    arriveBy?: boolean
    limit?: number
    maxPreTransitWalkDistance?: number
    modes?: QueryMode[]
    searchDate?: Date
    transportSubmodes?: TransportSubmodeParam[]
    useFlex?: boolean
    walkSpeed?: number
    minimumTransferTime?: number
    wheelchairAccessible?: boolean
    banned?: InputBanned
    whiteListed?: InputWhiteListed
}

interface GetTripPatternsVariables {
    from: Location
    to: Location
    allowBikeRental?: boolean
    arriveBy: boolean
    numTripPatterns: number
    maxPreTransitWalkDistance?: number
    modes: QueryMode[]
    dateTime: string
    transportSubmodes: TransportSubmodeParam[]
    useFlex?: boolean
    walkSpeed?: number
    minimumTransferTime?: number
    wheelchair: boolean
    banned?: InputBanned
    whiteListed?: InputWhiteListed
}

const DEFAULT_MODES = [
    QueryMode.FOOT,
    QueryMode.BUS,
    QueryMode.TRAM,
    QueryMode.RAIL,
    QueryMode.METRO,
    QueryMode.WATER,
    QueryMode.AIR,
]

function getTripPatternsVariables(
    params: GetTripPatternsParams,
): GetTripPatternsVariables {
    const {
        from,
        to,
        searchDate = new Date(),
        arriveBy = false,
        modes = DEFAULT_MODES,
        transportSubmodes = [],
        wheelchairAccessible = false,
        limit = 5,
        ...rest
    } = params || {}

    return {
        ...rest,
        from,
        to,
        dateTime: searchDate.toISOString(),
        arriveBy,
        modes,
        transportSubmodes,
        wheelchair: wheelchairAccessible,
        numTripPatterns: limit,
    }
}

export function createGetTripPatterns(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getTripPatterns(
        params: GetTripPatternsParams,
        overrideConfig?: OverrideConfig,
    ): Promise<TripPattern[]> {
        return journeyPlannerQuery<{ trip: { tripPatterns: TripPattern[] } }>(
            getTripPatternQuery,
            getTripPatternsVariables(params),
            mergeConfig(config, overrideConfig),
        ).then((data) => {
            if (!data?.trip?.tripPatterns) {
                return []
            }

            return data.trip.tripPatterns.map((trip) => ({
                ...trip,
                legs: trip.legs.map(legMapper),
            }))
        })
    }
}

export function getTripPatternsQuery(
    params: GetTripPatternsParams,
): { query: string; variables?: { [key: string]: any } } {
    return getGraphqlParams(
        getTripPatternQuery,
        getTripPatternsVariables(params),
    )
}

export function createFindTrips(argConfig: ArgumentConfig) {
    const getFeatures = createGetFeatures(argConfig)
    const getTripPatterns = createGetTripPatterns(argConfig)

    return async function findTrips(
        from: string,
        to: string,
        date?: Date | string | number,
    ): Promise<TripPattern[]> {
        const searchDate = date ? new Date(date) : new Date()

        if (!isValidDate(searchDate)) {
            throw new Error(
                'Entur SDK: Could not parse <date> argument to valid Date',
            )
        }

        const [fromFeatures, toFeatures] = await Promise.all([
            getFeatures(from),
            getFeatures(to),
        ])

        if (!fromFeatures || !fromFeatures.length) {
            throw new Error(
                `Entur SDK: Could not find any locations matching <from> argument "${from}"`,
            )
        }

        if (!toFeatures || !toFeatures.length) {
            throw new Error(
                `Entur SDK: Could not find any locations matching <to> argument "${to}"`,
            )
        }

        return getTripPatterns({
            from: convertFeatureToLocation(fromFeatures[0]),
            to: convertFeatureToLocation(toFeatures[0]),
            searchDate,
        })
    }
}
