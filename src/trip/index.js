// @flow
import type { Itinerary } from '../flow-types/Itinerary'
import api from '../api'
import query from './properties'
import type { Location } from '../flow-types/Location'

type SearchParams = {
    searchDate: Date,
    from: Location,
    to: Location,
    arriveBy: boolean,
    modes: Array<string>,
    limit: number,
    wheelchairAccessible: boolean,
    waitReluctance: number,
    walkReluctance: number,
    walkBoardCost: number,
    walkSpeed: number,
    maxWalkDistance: number,
}

function toDateString(date: Date): string {
    const year: string = String(date.getFullYear())
    const month: string = String(date.getMonth()+1).padStart(2, '0')
    const day: string = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

function parseLegs(legs: Array<Object>) {
    return legs.map(leg => {
        const {
            aimedStartTime, aimedEndTime, expectedStartTime, expectedEndTime, ...rest
        } = leg

        const returnObj = {
            ...rest,
            aimedStartTime: new Date(aimedStartTime),
            aimedEndTime: new Date(aimedEndTime),
        }

        if (expectedStartTime) {
            returnObj.expectedStartTime = new Date(expectedStartTime)
        }

        if (expectedEndTime) {
            returnObj.expectedEndTime = new Date(expectedEndTime)
        }

        return returnObj
    })
}

function parseTrips(trips: Array<Object>) {
    return trips.map(({ startTime, endTime, legs, ...rest }) => {
        return {
            ...rest,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            legs: parseLegs(legs),
        }
    })
}

function getTripPatterns(searchParams: SearchParams, host: string, headers: Object): Promise<Array<Itinerary>> {
    const {
        searchDate, limit, wheelchairAccessible, ...rest
    } = searchParams

    const url = `${host}/graphql`

    const variables = {
        ...rest,
        dateTime: searchDate.toISOString(),
        date: toDateString(searchDate),
        numTripPatterns: limit,
        wheelchair: wheelchairAccessible,
    }

    const params = { query, variables }

    return api(url, params, headers).then(
        (response: Object) => response.data.trip.tripPatterns
    ).then(parseTrips)
}

export default getTripPatterns
