// @flow
import { journeyPlannerQuery } from '../api'

import {
    getDeparturesFromStopPlacesQuery,
    getDeparturesFromQuayQuery,
} from './query'

import type {
    StopPlaceDepartures,
    QuayDepartures,
    Departure,
} from '../../flow-types/Departures'


type GetDeparturesParams = {
    includeNonBoarding?: boolean,
    limit?: number,
    departures?: number, // deprecated
    start?: Date,
    timeRange?: number,
}
export function getDeparturesFromStopPlaces(
    stopPlaceIds: Array<string>,
    params?: GetDeparturesParams = {},
): Promise<Array<StopPlaceDepartures>> {
    const {
        limit = 50,
        departures,
        timeRange = 72000,
        start = new Date(),
        includeNonBoarding = false,
        ...rest
    } = params

    if (departures !== undefined) {
        // eslint-disable-next-line no-console
        console.info('Entur SDK: "departures" is deprecated, use "limit" instead.')
    }

    const variables = {
        ids: stopPlaceIds,
        start: start.toISOString(),
        omitNonBoarding: !includeNonBoarding,
        timeRange,
        limit: departures || limit,
        ...rest,
    }

    return journeyPlannerQuery(getDeparturesFromStopPlacesQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.stopPlaces || [])
}

export function getDeparturesFromStopPlace(
    stopPlaceId: string,
    params?: GetDeparturesParams,
): Promise<Array<Departure>> {
    return getDeparturesFromStopPlaces.call(this, [stopPlaceId], params)
        .then((stopPlaces: Array<StopPlaceDepartures>) => stopPlaces?.[0]?.estimatedCalls || [])
}

export function getDeparturesFromQuays(
    quayIds: Array<string>,
    params?: GetDeparturesParams = {},
): Promise<Array<QuayDepartures>> {
    const {
        limit = 30,
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
        ...rest,
    }
    return journeyPlannerQuery(getDeparturesFromQuayQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.quays || [])
}

export function getStopPlaceDeparturesDEPRECATED() {
    throw new Error('Entur SDK: "getStopPlaceDepartures" is deprecated, use "getDeparturesForStopPlace" or getDeparturesForStopPlaces instead.')
}
