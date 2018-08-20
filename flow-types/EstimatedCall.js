// @flow

import type { DestinationDisplay } from './DestinationDisplay'
import type { Quay } from './Quay'
import type { IntermediateEstimatedCall } from './IntermediateEstimatedCall'
import type { ServiceJourney } from './ServiceJourney'
import type { Situation } from './Situation'
import type { Notice } from './Notice'

export type EstimatedCall = {
    realtime: boolean,
    quay: Quay,
    forAlighting?: boolean,
    forBoarding?: boolean,
    aimedDepartureTime: string,
    expectedDepartureTime: string,
    destinationDisplay?: DestinationDisplay,
    serviceJourney: ServiceJourney,
    intermediateEstimatedCalls: Array<IntermediateEstimatedCall>,
    situations: Array<Situation>,
    notices?: Array<Notice>,
}
