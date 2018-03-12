// @flow
import { post } from '../api';
import { FOOT, BUS, TRAM, RAIL, METRO, WATER, AIR } from '../constants/travelModes';
import {
    getItinerariesProps,
    getStopPlacesProps,
    getStopPlaceDeparturesProps,
} from './properties';
import type { Itinerary } from '../flow-types/Itinerary';
import type { HostConfig } from '../config';
import type { Location } from '../flow-types/Location';

type SearchParams = {
    searchDate: Date,
    from: Location,
    to: Location,
    arriveBy?: boolean,
    modes?: Array<string>,
    limit?: number,
    wheelchairAccessible?: boolean,
    waitReluctance?: number,
    walkReluctance?: number,
    walkBoardCost?: number,
    walkSpeed?: number,
    maxWalkDistance?: number,
}

const DEFAULT_SEARCH_PARAMS = {
    arriveBy: false,
    modes: [FOOT, BUS, TRAM, RAIL, METRO, WATER, AIR],
    limit: 5,
    wheelchairAccessible: false,
    waitReluctance: 0.5,
    walkReluctance: 2,
    walkBoardCost: 600,
    walkSpeed: 1.2,
    maxWalkDistance: 2000,
};

function toDateString(date: Date): string {
    const year: string = String(date.getFullYear());
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseLegs(legs: Array<Object>) {
    return legs.map((leg) => {
        const {
            aimedStartTime, aimedEndTime, expectedStartTime, expectedEndTime, ...rest
        } = leg;

        const returnObj = {
            ...rest,
            aimedStartTime: new Date(aimedStartTime),
            aimedEndTime: new Date(aimedEndTime),
        };

        if (expectedStartTime) {
            returnObj.expectedStartTime = new Date(expectedStartTime);
        }

        if (expectedEndTime) {
            returnObj.expectedEndTime = new Date(expectedEndTime);
        }

        return returnObj;
    });
}

function parseTrips(trips: Array<Object>) {
    return trips.map(({
        startTime, endTime, legs, ...rest
    }) => ({
        ...rest,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        legs: parseLegs(legs),
    }));
}

export function getTripPatterns(
    { host, headers }: HostConfig,
    searchParams: SearchParams,
): Promise<Array<Itinerary>> {
    const {
        searchDate, limit, wheelchairAccessible, ...rest
    } = { ...DEFAULT_SEARCH_PARAMS, ...searchParams };

    const url = `${host}/graphql`;

    const variables = {
        ...rest,
        dateTime: searchDate.toISOString(),
        date: toDateString(searchDate),
        numTripPatterns: limit,
        wheelchair: wheelchairAccessible,
    };

    const params = { query: getItinerariesProps, variables };

    return post(url, params, headers)
        .then((response: Object) => response.data.trip.tripPatterns)
        .then(parseTrips);
}

export function getStopPlaceDepartures(
    { host, headers }: HostConfig,
    stopPlaceId: string,
): Object {
    const url = `${host}/graphql`;

    const variables = {
        id: stopPlaceId,
        start: new Date().toISOString(),
        range: 72000,
        departures: 50,
    };

    const params = { query: getStopPlaceDeparturesProps, variables };

    return post(url, params, headers)
        .then(response => response.data.stopPlace.estimatedCalls || []);
}


export function getStopPlaces(
    { host, headers }: HostConfig,
    stopPlaceIds: Array<string>,
): Promise<Array<Object>> {
    const url = `${host}/graphql`;

    const variables = {
        ids: stopPlaceIds,
        start: new Date().toISOString(),
        range: 72000,
        departures: 3,
    };

    const params = { query: getStopPlacesProps, variables };

    return post(url, params, headers)
        .then(response => response.data.stopPlaces || []);
}
