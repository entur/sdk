// @flow
import { uniq } from '../utils'

import type { TransportSubmode } from '../../flow-types/Mode'

import {
    fragmentName as noticeFields,
    fragments as noticeFragments,
    type Notice,
} from './Notice'

import {
    fragmentName as lineFields,
    fragments as lineFragments,
    type Line,
} from './Line'

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

export const fragmentName = 'serviceJourneyFields'

export const fragment = `
fragment ${fragmentName} on ServiceJourney {
    id
    journeyPattern {
        line {
            ...${lineFields}
        }
        notices {
            ...${noticeFields}
        }
    }
    notices {
        ...${noticeFields}
    }
    publicCode
    transportSubmode
}
`

export const fragments = uniq<string>([
    fragment,
    ...noticeFragments,
    ...lineFragments,
])
