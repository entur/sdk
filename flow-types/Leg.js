// @flow

import type { Line } from './Line'
import type { Place } from './Place'
import type { Authority } from './Authority'
import type { Quay } from './Quay'
import type { ServiceJourney } from './ServiceJourney'
import type { Situation } from './Situation'
import type { PointsOnLink } from './PointsOnLink'
import type { IntermediateEstimatedCall } from './IntermediateEstimatedCall'
import type { LegMode } from './Mode'

export type Leg = {
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
    situations: Array<Situation>,
}
