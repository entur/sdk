// @flow
import type { Situation } from './Situation'
import type { Notice } from './Notice'
import type { DestinationDisplay } from './DestinationDisplay'
import type { Place } from './Place'
import type { EstimatedCall } from './EstimatedCall'
import type { Quay } from './Quay'
import type { TransportMode } from './Mode'
import type { Line } from './Line'
import type { ServiceJourney } from './ServiceJourney'

export type Departure = {
    date: string,
    destinationQuay?: Quay,
    forBoarding: boolean,
    requestStop: boolean,
    forAlighting: boolean,
    destinationDisplay: DestinationDisplay,
    notices?: Array<Notice>,
    aimedDepartureTime: string,
    expectedDepartureTime: string,
    realtime: boolean,
    situations?: Array<Situation>,
    cancellation?: boolean,
    quay: Quay,
    serviceJourney: ServiceJourney & {
        line: Line & {
            transportMode: TransportMode,
            description?: string,
        }
    }
}

export type LegDeparture = {
    aimedStartTime: string,
    expectedStartTime: string,
    fromEstimatedCall: EstimatedCall,
    fromPlace: Place,
    realtime: boolean,
    serviceJourney: ServiceJourney & {
        line: Line & {
            transportMode: TransportMode,
            description?: string,
        }
    },
    situations?: Array<Situation>,
    toPlace: Place,
}

export type StopPlaceDepartures = {
    id: string,
    departures: Array<Departure>
}

export type QuayDepartures = {
    id: string,
    departures: Array<Departure>
}
