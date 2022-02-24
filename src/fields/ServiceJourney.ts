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

import {
    fragmentName as bookingArrangementFields,
    fragments as bookingArrangementFragments,
    BookingArrangement,
} from './BookingArrangement'

interface JourneyPattern {
    line: Line
    notices?: Notice[]
}

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface ServiceJourney {
    id: string
    bookingArrangements?: BookingArrangement
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
    bookingArrangements {
        ...${bookingArrangementFields}
    }
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
    ...bookingArrangementFragments,
    ...noticeFragments,
    ...lineFragments,
])
