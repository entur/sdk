// @flow

import type { JourneyPattern } from './JourneyPattern'
import type { Notice } from './Notice'
import type { Situation } from './Situation'
import type { TransportSubmode } from './Mode'

export type ServiceJourney = {
    id: string,
    journeyPattern: JourneyPattern,
    notices: Array<Notice>,
    situations: Array<Situation>,
    privateCode?: string,
    linePublicCode?: string,
    transportSubmode?: TransportSubmode,
    wheelchairAccessible?: 'noInformation' | 'possible' | 'notPossible',
}
