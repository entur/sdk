// @flow
import { post } from '../api'
import { FOOT, BUS, TRAM, RAIL, METRO, WATER, AIR } from '../constants/travelModes'
import {
    getItinerariesProps,
    getStopPlacesProps,
    getStopPlaceDeparturesProps,
    getStopPlacesByBboxProps,
} from './properties'
import type { HostConfig } from '../config'
import {
    Coordinates,
    Itinerary,
    Location,
} from '../flow-types'
import { convertPositionToBbox } from '../utils'

type SearchParams = {
    searchDate: Date,
    from: Location,
    to: Location,
    arriveBy?: boolean,
    modes?: Array<string>,
    limit?: number,
    wheelchairAccessible?: boolean,
}

type StopPlaceParams = {
    onForBoarding?: boolean,
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
    onForBoarding: false,
    departures: 50,
    timeRange: 72000,
}

function toDateString(date: Date): string {
    const year: string = String(date.getFullYear())
    const month: string = String(date.getMonth() + 1).padStart(2, '0')
    const day: string = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export function getTripPatterns(
    { host, headers }: HostConfig,
    searchParams: SearchParams,
): Promise<Array<Itinerary>> {
    const {
        searchDate, limit, wheelchairAccessible, ...rest
    } = { ...DEFAULT_SEARCH_PARAMS, ...searchParams }

    const url = `${host}/graphql`

    const variables = {
        ...rest,
        dateTime: searchDate.toISOString(),
        date: toDateString(searchDate),
        numTripPatterns: limit,
        wheelchair: wheelchairAccessible,
    }

    const params = { query: getItinerariesProps, variables }

    return post(url, params, headers)
        .then((response: Object) => response.data.trip.tripPatterns)
}

export function getStopPlaceDepartures(
    { host, headers }: HostConfig,
    stopPlaceId: string,
    stopPlaceParams?: StopPlaceParams,
): Object {
    const {
        timeRange, departures, onForBoarding,
    } = { ...DEFAULT_STOP_PLACE_PARAMS, ...stopPlaceParams }

    const url = `${host}/graphql`

    const variables = {
        id: stopPlaceId,
        start: new Date().toISOString(),
        range: timeRange,
        departures,
        onForBoarding,
    }

    const params = { query: getStopPlaceDeparturesProps, variables }

    return post(url, params, headers)
        .then((response: Object) => response.data.stopPlace.estimatedCalls || [])
}


export function getStopPlaces(
    { host, headers }: HostConfig,
    stopPlaceIds: Array<string>,
): Promise<Array<Object>> {
    const url = `${host}/graphql`

    const variables = {
        ids: stopPlaceIds,
        start: new Date().toISOString(),
        range: 72000,
        departures: 3,
    }

    const params = { query: getStopPlacesProps, variables }

    return post(url, params, headers)
        .then(response => response.data.stopPlaces || [])
}

export function getStopPlacesByPosition(
    { host, headers }: HostConfig,
    coordinates: Coordinates,
    distance: number = 500,
): Promise<Array<Object>> {
    const url = `${host}/graphql`

    const positionArray = convertPositionToBbox(coordinates, distance)
    const variables = {
        minLng: positionArray[0],
        minLat: positionArray[1],
        maxLng: positionArray[2],
        maxLat: positionArray[3],
    }

    const params = { query: getStopPlacesByBboxProps, variables }

    return post(url, params, headers)
        .then(response => response.data.stopPlacesByBbox)
}
