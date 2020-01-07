// @flow

import serviceJourneyFields, { type ServiceJourney } from './ServiceJourney'
import noticeFields, { type Notice } from './Notice'
import quayFields, { type Quay } from './Quay'
import situationFields, { type Situation } from './Situation'

export type EstimatedCall = {|
    actualArrivalTime?: string, // Only available AFTER arrival has taken place
    actualDepartureTime?: string, // Only available AFTER departure has taken place
    aimedArrivalTime: string,
    aimedDepartureTime: string,
    cancellation: boolean,
    date: string,
    destinationDisplay: {
        frontText: string,
    },
    expectedArrivalTime?: string, // Only available BEFORE arrival has taken place
    expectedDepartureTime?: string, // Only available BEFORE departure has taken place
    forAlighting: boolean,
    forBoarding: boolean,
    notices?: Array<Notice>,
    quay?: Quay,
    realtime: boolean,
    requestStop: boolean,
    serviceJourney: ServiceJourney,
    situations: Array<Situation>,
|}

export type IntermediateEstimatedCall = EstimatedCall

export default {
    actualArrivalTime: true,
    actualDepartureTime: true,
    aimedArrivalTime: true,
    aimedDepartureTime: true,
    cancellation: true,
    date: true,
    destinationDisplay: {
        frontText: true,
    },
    expectedDepartureTime: true,
    expectedArrivalTime: true,
    forAlighting: true,
    forBoarding: true,
    notices: noticeFields,
    quay: quayFields,
    realtime: true,
    requestStop: true,
    serviceJourney: serviceJourneyFields,
    situations: situationFields,
}
