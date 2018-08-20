// @flow

import type { EstimatedCall } from './EstimatedCall'
import type { JourneyPattern } from './JourneyPattern'
import type { Notice } from './Notice'
import type { Situation } from './Situation'

export type ServiceJourney = {
    id: string,
    publicCode: string,
    privateCode: string,
    estimatedCalls: Array<EstimatedCall>,
    journeyPattern: JourneyPattern,
    linePublicCode: string,
    notices: Array<Notice>,
    situations: Array<Situation>,
    wheelchairAccessible: 'noInformation' | 'possible' | 'notPossible'
}
