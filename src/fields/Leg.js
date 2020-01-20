// @flow
import type { LegMode, TransportSubmode } from '../../flow-types/Mode'

import lineFields, { type Line } from './Line'
import placeFields, { type Place } from './Place'
import authorityFields, { type Authority } from './Authority'
import operatorFields, { type Operator } from './Operator'
import serviceJourneyFields, { type ServiceJourney } from './ServiceJourney'
import situationFields, { type Situation } from './Situation'
import { type Notice } from './Notice'
import interchangeFields, { type Interchange } from './Interchange'
import pointsOnLinkFields, { type PointsOnLink } from './PointsOnLink'
import estimatedCallFields, { type EstimatedCall, type IntermediateEstimatedCall } from './EstimatedCall'

export type Leg = {|
    aimedEndTime: string,
    aimedStartTime: string,
    authority?: Authority,
    distance: number,
    directDuration: number,
    duration: number,
    expectedEndTime: string,
    expectedStartTime: string,
    fromEstimatedCall?: EstimatedCall,
    fromPlace: Place,
    interchangeFrom?: Interchange,
    interchangeTo?: Interchange,
    intermediateEstimatedCalls: Array<IntermediateEstimatedCall>,
    line?: Line,
    mode: LegMode,
    notices?: Array<Notice>, // from mapper
    operator?: Operator,
    pointsOnLink?: PointsOnLink,
    realtime: boolean,
    ride: boolean,
    rentedBike?: boolean,
    serviceJourney: ServiceJourney,
    situations: Array<Situation>,
    toEstimatedCall?: EstimatedCall,
    toPlace: Place,
    transportSubmode: TransportSubmode,
|}

export default {
    aimedEndTime: true,
    aimedStartTime: true,
    authority: authorityFields,
    distance: true,
    directDuration: true,
    duration: true,
    expectedEndTime: true,
    expectedStartTime: true,
    fromEstimatedCall: estimatedCallFields,
    fromPlace: placeFields,
    interchangeFrom: interchangeFields,
    interchangeTo: interchangeFields,
    intermediateEstimatedCalls: estimatedCallFields,
    line: lineFields,
    mode: true,
    operator: operatorFields,
    pointsOnLink: pointsOnLinkFields,
    realtime: true,
    ride: true,
    rentedBike: true,
    serviceJourney: serviceJourneyFields,
    situations: situationFields,
    toEstimatedCall: estimatedCallFields,
    toPlace: placeFields,
    transportSubmode: true,
}
