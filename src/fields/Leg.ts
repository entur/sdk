import { LegMode, TransportSubmode } from '../types/Mode'

import { uniq } from '../utils'

import {
    fragmentName as lineFields,
    fragments as lineFragments,
    Line,
} from './Line'

import {
    fragmentName as placeFields,
    fragments as placeFragments,
    Place,
} from './Place'

import {
    fragmentName as authorityFields,
    fragments as authorityFragments,
    Authority,
} from './Authority'

import {
    fragmentName as operatorFields,
    fragments as operatorFragments,
    Operator,
} from './Operator'

import {
    fragmentName as serviceJourneyFields,
    fragments as serviceJourneyFragments,
    ServiceJourney,
} from './ServiceJourney'

import {
    fragmentName as situationFields,
    fragments as situationFragments,
    Situation,
} from './Situation'

import {
    fragmentName as interchangeFields,
    fragments as interchangeFragments,
    Interchange,
} from './Interchange'

import {
    fragmentName as pointsOnLinkFields,
    fragments as pointsOnLinkFragments,
    PointsOnLink,
} from './PointsOnLink'

import {
    fragmentName as estimatedCallFields,
    fragments as estimatedCallFragments,
    EstimatedCall,
    IntermediateEstimatedCall,
} from './EstimatedCall'

import {
    fragmentName as bookingArrangementFields,
    fragments as bookingArrangementFragments,
    BookingArrangement,
} from './BookingArrangement'

import { Notice } from './Notice'

export interface Leg {
    /** The aimed date and time this leg ends. */
    aimedEndTime: string
    /** The aimed date and time this leg starts. */
    aimedStartTime: string
    /** For ride legs, the service authority used for this legs. For non-ride legs, null. */
    authority?: Authority
    /** The distance traveled while traversing the leg in meters. */
    distance: number
    /** This sums the direct durations of each leg. Be careful about using this, as it is not equal to the duration between startTime and endTime. See the directDuration documentation on Leg. */
    directDuration: number
    /** Duration of the trip, in seconds. */
    duration: number
    /** The expected, realtime adjusted date and time this leg ends. */
    expectedEndTime: string
    expectedStartTime: string
    /** EstimatedCall for the quay where the leg originates. */
    fromEstimatedCall?: EstimatedCall
    /** The Place where the leg originates. */
    fromPlace: Place
    interchangeFrom?: Interchange
    interchangeTo?: Interchange
    /** For ride legs, estimated calls for quays between the Place where the leg originates and the Place where the leg ends. For non-ride legs, empty list. */
    intermediateEstimatedCalls: IntermediateEstimatedCall[]
    /** For ride legs, the line. For non-ride legs, undefined. */
    line?: Line
    /** The mode of transport or access (e.g., foot) used when traversing this leg. */
    mode: LegMode
    notices?: Notice[] // from mapper
    /** For ride legs, the operator used for this legs. For non-ride legs, null. */
    operator?: Operator
    pointsOnLink?: PointsOnLink
    /** Whether there is real-time data about this leg or not */
    realtime: boolean
    ride: boolean
    rentedBike?: boolean
    /** For ride legs, the service journey. For non-ride legs, null. */
    serviceJourney: ServiceJourney
    /** All relevant situations for this leg */
    situations: Situation[]
    /** EstimatedCall for the quay where the leg ends. */
    toEstimatedCall?: EstimatedCall
    /** The Place where the leg ends. */
    toPlace: Place
    /** The transport sub mode (e.g., localBus or expressBus) used when traversing this leg. Null if leg is not a ride */
    transportSubmode?: TransportSubmode
    bookingArrangements?: BookingArrangement
}

export const fragmentName = 'legFields'

const fragment = `
fragment ${fragmentName} on Leg {
    aimedEndTime
    aimedStartTime
    authority {
        ...${authorityFields}
    }
    distance
    directDuration
    duration
    expectedEndTime
    expectedStartTime
    fromEstimatedCall {
        ...${estimatedCallFields}
    }
    fromPlace {
        ...${placeFields}
    }
    interchangeFrom {
        ...${interchangeFields}
    }
    interchangeTo {
        ...${interchangeFields}
    }
    intermediateEstimatedCalls {
        ...${estimatedCallFields}
    }
    line {
        ...${lineFields}
    }
    mode
    operator {
        ...${operatorFields}
    }
    pointsOnLink {
        ...${pointsOnLinkFields}
    }
    realtime
    ride
    rentedBike
    serviceJourney {
        ...${serviceJourneyFields}
    }
    situations {
        ...${situationFields}
    }
    toEstimatedCall {
        ...${estimatedCallFields}
    }
    toPlace {
        ...${placeFields}
    }
    transportSubmode
    bookingArrangements {
        ...${bookingArrangementFields}
    }
}
`

export const fragments = uniq<string>([
    fragment,
    ...lineFragments,
    ...placeFragments,
    ...authorityFragments,
    ...operatorFragments,
    ...serviceJourneyFragments,
    ...situationFragments,
    ...interchangeFragments,
    ...pointsOnLinkFragments,
    ...estimatedCallFragments,
    ...bookingArrangementFragments,
])
