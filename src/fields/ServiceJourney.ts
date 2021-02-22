import { uniq } from '../utils'

import { TransportSubmode } from '../types/Mode'

import {
    fragmentName as noticeFields,
    fragments as noticeFragments,
    Notice,
} from './Notice'

import {
    fragmentName as lineFields,
    fragments as lineFragments,
    Line,
} from './Line'

interface JourneyPattern {
    line: Line
    notices?: Notice[]
}

export interface ServiceJourney {
    id: string
    journeyPattern?: JourneyPattern
    notices?: Notice[]
    publicCode?: string
    privateCode?: string
    transportSubmode?: TransportSubmode
}

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
    privateCode
    transportSubmode
}
`

export const fragments = uniq<string>([
    fragment,
    ...noticeFragments,
    ...lineFragments,
])
