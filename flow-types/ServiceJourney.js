// @flow

import type { JourneyPattern } from './JourneyPattern'
import type { Notice } from './Notice'
import type { Situation } from './Situation'

export type ServiceJourney = {
    id: string,
    journeyPattern: JourneyPattern,
    notices: Array<Notice>,
    situations: Array<Situation>,
    privateCode?: string,
    linePublicCode?: string,
    wheelchairAccessible?: 'noInformation' | 'possible' | 'notPossible',
}
