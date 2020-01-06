// @flow

import type { TransportSubmode } from '../../flow-types/Mode'

import noticeFields, { type Notice } from './Notice'
import lineFields, { type Line } from './Line'

type JourneyPattern = {|
    line: Line,
    notices?: Array<Notice>,
|}

export type ServiceJourney = {|
    id: string,
    journeyPattern?: JourneyPattern,
    notices?: Array<Notice>,
    publicCode?: string,
    transportSubmode?: TransportSubmode,
|}

export default {
    id: true,
    journeyPattern: {
        line: lineFields,
        notices: noticeFields,
    },
    notices: noticeFields,
    publicCode: true,
    transportSubmode: true,
}
