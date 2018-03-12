// @flow

import type { Leg } from './Leg'
import type { Offer } from './Offer'

export type Itinerary = {
    duration: number,
    endTime: number,
    fares: Array<{
        type: string,
        cents: number,
        currency: string,
    }>,
    legs: Array<Leg>,
    offers?: Array<Offer>,
    startTime: number,
    timeDividerText?: string,
    tripId: string,
    waitingTime: number,
    walkDistance: number,
}
