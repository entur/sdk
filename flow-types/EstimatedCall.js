// @flow
import type { Notice } from './Notice'
import type { Quay } from './Quay'
import type { Situation } from './Situation'

export type DestinationDisplay = {
    frontText: string,
}

export type IntermediateEstimatedCall = {
    actualArrivalTime?: string, // Only available AFTER arrival has taken place
    actualDepartureTime?: string, // Only available AFTER departure has taken place
    aimedArrivalTime: string,
    aimedDepartureTime: string,
    cancellation: boolean,
    date: string,
    destinationDisplay: DestinationDisplay,
    expectedArrivalTime?: string, // Only available BEFORE arrival has taken place
    expectedDepartureTime?: string, // Only available BEFORE departure has taken place
    forAlighting: boolean,
    forBoarding: boolean,
    situations: Array<Situation>,
    notices?: Array<Notice>,
    quay?: Quay,
    requestStop: boolean
}

export type EstimatedCall = {
    date: string,
    destinationDisplay: DestinationDisplay,
    forAlighting: boolean,
    forBoarding: boolean,
    situations: Array<Situation>,
    notices?: Array<Notice>,
    requestStop: boolean
}
