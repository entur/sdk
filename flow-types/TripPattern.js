// @flow

import type { Leg } from './Leg'

export type TripPattern = {
    distance: number,
    duration: number,
    endTime: string,
    legs: Array<Leg>,
    startTime: string,
    walkDistance: number
}
