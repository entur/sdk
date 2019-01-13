// @flow

import type { Notice } from './Notice'
import type { TransportSubmode } from './Mode'

export type JourneyPattern = {
    line: {
        notices?: Array<Notice>,
    },
    notices?: Array<Notice>,
}

export type ServiceJourney = {
    id: string,
    journeyPattern?: JourneyPattern,
    notices?: Array<Notice>,
    publicCode?: string,
    transportSubmode?: TransportSubmode,
}
