import { TransportMode, TransportSubmode } from '../types/Mode'

import { uniq } from '../utils'

import {
    fragmentName as bookingArrangementFields,
    fragments as bookingArrangementFragments,
    BookingArrangement,
} from './BookingArrangement'

import {
    fragmentName as noticeFields,
    fragments as noticeFragments,
    Notice,
} from './Notice'

type FlexibleLineType =
    | 'corridorService'
    | 'mainRouteWithFlexibleEnds'
    | 'flexibleAreasOnly'
    | 'hailAndRideSections'
    | 'fixedStopAreaWide'
    | 'freeAreaAreaWide'
    | 'mixedFlexible'
    | 'mixedFlexibleAndFixed'
    | 'fixed'
    | 'other'

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export type Line = {
    /** @deprecated Use bookingArrangements on Leg or ServiceJourney instead. */
    bookingArrangements?: BookingArrangement
    description?: string
    flexibleLineType?: FlexibleLineType
    id: string
    name: string
    notices: Notice[]
    publicCode: string
    transportMode: TransportMode
    transportSubmode: TransportSubmode
}

export const fragmentName = 'lineFields'

export const fragment = `
fragment ${fragmentName} on Line {
    bookingArrangements {
        ...${bookingArrangementFields}
    }
    description
    flexibleLineType
    id
    name
    notices {
        ...${noticeFields}
    }
    publicCode
    transportMode
    transportSubmode
}
`

export const fragments = uniq<string>([
    fragment,
    ...bookingArrangementFragments,
    ...noticeFragments,
])
