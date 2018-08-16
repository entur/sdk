// @flow

import type { Leg } from './Leg'

export type TripPattern = {
    duration: number,
    endTime: string,
    legs: Array<Leg>,
    startTime: string,
    waitingTime: number,
    walkDistance: number
}
