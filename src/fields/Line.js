// @flow
import type { TransportMode, TransportSubmode } from '../../flow-types/Mode'

import { uniq } from '../utils'

import {
    fragmentName as bookingArrangementFields,
    fragments as bookingArrangementFragments,
    type BookingArrangement,
} from './BookingArrangement'

import {
    fragmentName as noticeFields,
    fragments as noticeFragments,
    type Notice,
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

export type Line = {
    bookingArrangements?: BookingArrangement,
    description?: string,
    flexibleLineType?: FlexibleLineType,
    id: string,
    name: string,
    notices: Array<Notice>,
    publicCode: string,
    transportMode: TransportMode,
    transportSubmode: TransportSubmode,
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
