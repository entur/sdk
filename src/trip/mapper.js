// @flow
import type { Leg, Notice } from '../../flow-types'
import type { IntermediateEstimatedCall } from '../../flow-types/EstimatedCall'
import { uniqBy } from '../utils'

function getNoticesFromIntermediateEstimatedCalls(
    estimatedCalls?: Array<IntermediateEstimatedCall> = [],
): Array<Notice> {
    return estimatedCalls.reduce((notices, estimatedCall) => (
        estimatedCall.notices ? [...notices, ...estimatedCall.notices] : notices
    ), [])
}

export function getNotices(leg: Leg): Array<Notice> {
    const notices = [
        ...getNoticesFromIntermediateEstimatedCalls(leg.intermediateEstimatedCalls),
        ...leg.serviceJourney?.notices || [],
        ...leg.serviceJourney?.journeyPattern?.notices || [],
        ...leg.serviceJourney?.journeyPattern?.line?.notices || [],
        ...leg.fromEstimatedCall?.notices || [],
        ...leg.toEstimatedCall?.notices || [],
        ...leg.line?.notices || [],
    ]
    return uniqBy(notices, notice => notice.text)
}

export function legMapper(leg: Leg): Leg {
    return {
        ...leg,
        notices: getNotices(leg),
    }
}
