import { uniq } from '../utils'

import {
    fragmentName as noticeFields,
    fragments as noticeFragments,
    Notice,
} from './Notice'

import {
    fragmentName as quayFields,
    fragments as quayFragments,
    Quay,
} from './Quay'

import {
    fragmentName as serviceJourneyFields,
    fragments as serviceJourneyFragments,
    ServiceJourney,
} from './ServiceJourney'

import {
    fragmentName as bookingArrangementFields,
    fragments as bookingArrangementFragments,
    BookingArrangement,
} from './BookingArrangement'

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface EstimatedCall {
    actualArrivalTime?: string // Only available AFTER arrival has taken place
    actualDepartureTime?: string // Only available AFTER departure has taken place
    aimedArrivalTime: string
    aimedDepartureTime: string
    /** @deprecated Use bookingArrangements on Leg or ServiceJourney instead. */
    bookingArrangements?: BookingArrangement
    cancellation: boolean
    date: string
    destinationDisplay: {
        frontText: string
    }
    expectedArrivalTime: string
    expectedDepartureTime: string
    forAlighting: boolean
    forBoarding: boolean
    notices?: Notice[]
    predictionInaccurate: boolean
    quay?: Quay
    realtime: boolean
    requestStop: boolean
    serviceJourney: ServiceJourney
}

export type IntermediateEstimatedCall = EstimatedCall

export const fragmentName = 'estimatedCallFields'

const fragment = `
fragment ${fragmentName} on EstimatedCall {
    actualArrivalTime
    actualDepartureTime
    aimedArrivalTime
    aimedDepartureTime
    bookingArrangements {
        ...${bookingArrangementFields}
    }
    cancellation
    date
    destinationDisplay {
        frontText
    }
    expectedDepartureTime
    expectedArrivalTime
    forAlighting
    forBoarding
    notices {
        ...${noticeFields}
    }
    predictionInaccurate
    quay {
        ...${quayFields}
    }
    realtime
    requestStop
    serviceJourney {
        ...${serviceJourneyFields}
    }
}`

export const fragments = uniq<string>([
    fragment,
    ...bookingArrangementFragments,
    ...noticeFragments,
    ...quayFragments,
    ...serviceJourneyFragments,
])
