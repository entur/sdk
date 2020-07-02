import { LegMode, TransportSubmode } from '../../types/Mode'

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

import { Notice } from './Notice'

export interface Leg {
    aimedEndTime: string
    aimedStartTime: string
    authority?: Authority
    distance: number
    directDuration: number
    duration: number
    expectedEndTime: string
    expectedStartTime: string
    fromEstimatedCall?: EstimatedCall
    fromPlace: Place
    interchangeFrom?: Interchange
    interchangeTo?: Interchange
    intermediateEstimatedCalls: IntermediateEstimatedCall[]
    line?: Line
    mode: LegMode
    notices?: Notice[] // from mapper
    operator?: Operator
    pointsOnLink?: PointsOnLink
    realtime: boolean
    ride: boolean
    rentedBike?: boolean
    serviceJourney: ServiceJourney
    situations: Situation[]
    toEstimatedCall?: EstimatedCall
    toPlace: Place
    transportSubmode: TransportSubmode
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
])
