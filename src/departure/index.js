// @flow
import { journeyPlannerQuery } from '../api'

import {
    getDeparturesForStopPlacesQuery,
    getDeparturesForQuayQuery,
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
    timeRange?: number,
}
export function getDeparturesForStopPlaces(
    stopPlaceIds: Array<string>,
    params?: GetDeparturesParams = {},
): Promise<Array<StopPlaceDepartures>> {
    const {
        limit = 50,
        departures,
        timeRange = 72000,
        includeNonBoarding = false,
        ...rest
    } = params

    if (departures !== undefined) {
        // eslint-disable-next-line no-console
        console.info('Entur SDK: "departures" is deprecated, use "limit" instead.')
    }

    const variables = {
        ids: stopPlaceIds,
        start: new Date().toISOString(),
        omitNonBoarding: !includeNonBoarding,
        timeRange,
        limit: departures || limit,
        ...rest,
    }

    return journeyPlannerQuery(getDeparturesForStopPlacesQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.stopPlaces || [])
}

export function getDeparturesForStopPlace(
    stopPlaceId: string,
    params?: GetDeparturesParams,
): Promise<Array<Departure>> {
    return getDeparturesForStopPlaces.call(this, [stopPlaceId], params)
        .then((stopPlaces: Array<StopPlaceDepartures>) => stopPlaces?.[0]?.estimatedCalls || [])
}

export function getDeparturesForQuays(
    quayIds: Array<string>,
    params?: GetDeparturesParams = {},
): Promise<Array<QuayDepartures>> {
    const {
        limit = 30,
        timeRange = 72000,
        includeNonBoarding = false,
        ...rest
    } = params

    const variables = {
        ids: quayIds,
        start: new Date().toISOString(),
        omitNonBoarding: !includeNonBoarding,
        timeRange,
        limit,
        ...rest,
    }
    return journeyPlannerQuery(getDeparturesForQuayQuery, variables, undefined, this.config)
        .then((data: Object = {}) => data?.quays || [])
}

export function getStopPlaceDeparturesDEPRECATED() {
    throw new Error('Entur SDK: "getStopPlaceDepartures" is deprecated, use "getDeparturesForStopPlace" or getDeparturesForStopPlaces instead.')
}
