// @flow
import type { Line } from './Line'
import type { Place } from './Place'
import type { Authority } from './Authority'
import type { Operator } from './Operator'
import type { ServiceJourney } from './ServiceJourney'
import type { Situation } from './Situation'
import type { Notice } from './Notice'
import type { PointsOnLink } from './PointsOnLink'
import type {
    EstimatedCall,
    IntermediateEstimatedCall,
} from './EstimatedCall'
import type { LegMode, TransportSubmode } from './Mode'

export type Leg = {
    aimedEndTime: string,
    aimedStartTime: string,
    authority?: Authority,
    distance: number,
    duration: number,
    expectedEndTime: string,
    expectedStartTime: string,
    fromEstimatedCall?: EstimatedCall,
    fromPlace: Place,
    intermediateEstimatedCalls?: Array<IntermediateEstimatedCall>,
    line?: Line,
    mode: LegMode,
    notices?: Array<Notice>,
    operator?: Operator,
    pointsOnLink?: PointsOnLink,
    realtime: boolean,
    ride: boolean,
    serviceJourney: ServiceJourney,
    situations?: Array<Situation>,
    toEstimatedCall?: EstimatedCall,
    toPlace: Place,
    transportSubmode: TransportSubmode,
}
