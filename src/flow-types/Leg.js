// @flow

import type { Alert } from './Alert'
import type { Trip } from './Trip'
import type { Place } from './Place'

export type LegMode = 'WALK' | 'BUS' | 'TRAM' | 'RAIL' | 'SUBWAY' | 'FERRY' | 'AIRPLANE'

export type IntermediateStoptime = {
    stop: {
        gtfsId: string,
        name: string,
        parentStation?: {
            gtfsId: string,
        },
    },
    dropoffType: string,
    pickupType: string,
    realtimeArrival: number,
    realtimeDeparture: number,
    scheduledArrival: number,
    scheduledDeparture: number,
    serviceDay?: number,
}

export type Leg = {
    agency: {
        gtfsId: string,
        id: string,
        name: string,
    },
    arrivalDelay?: number,
    departureDelay?: number,
    distance?: number,
    duration?: number,
    from: Place,
    intermediateStoptimes: Array<IntermediateStoptime>,
    legGeometry: {
        points: string,
        length: number,
    },
    mode: LegMode,
    realTime: boolean,
    route: {
        alerts: Array<Alert>,
        shortName: string,
        longName?: string,
    },
    startTime: number,
    endTime: number,
    to: Place,
    transitLeg: boolean,
    trip: Trip,
}
