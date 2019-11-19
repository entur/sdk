// @flow

import type { Leg } from './Leg'

export type TripPattern = {
    distance: number,
    directDuration: number,
    duration: number,
    endTime: string,
    id?: string,
    legs: Array<Leg>,
    startTime: string,
    walkDistance: number
}
