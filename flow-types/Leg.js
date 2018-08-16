// @flow

// import type { DestinationDisplay } from './DestinationDisplay'
import type { Line } from './Line'
import type { Place } from './Place'
import type { Authority } from './Authority'
import type { Quay } from './Quay'
// import type { Operator } from './Operator'
import type { ServiceJourney } from './ServiceJourney'
// import type { Situation } from './Situation'
import type { PointsOnLink } from './PointsOnLink'
import type { IntermediateEstimatedCall } from './IntermediateEstimatedCall'
import type { LegMode } from './Mode'

export type Leg = {
    // id?: string,
    aimedEndTime: string,
    aimedStartTime: string,
    authority?: Authority,
    distance?: number,
    duration?: number,
    fromPlace: Place,
    toPlace: Place,
    intermediateEstimatedCalls: Array<IntermediateEstimatedCall>,
    intermediateQuays: Array<Quay>,
    line?: Line,
    mode: LegMode,
    pointsOnLink: PointsOnLink,
    realtime: boolean,
    ride: boolean,
    serviceJourney: ServiceJourney,
    expectedEndTime?: string,
    expectedStartTime?: string,

    // operator?: Operator,
    // situations: Array<Situation>,
    // fromEstimatedCall: ?{
    //     destinationDisplay: DestinationDisplay
    // },
}
