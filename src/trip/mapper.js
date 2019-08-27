// @flow
import type { Authority, Leg, Notice } from '../../flow-types'
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

function authorityMapper(authority?: Authority): Authority | void {
    if (!authority) return undefined

    return {
        id: authority.id,
        name: authority.name,
        codeSpace: authority.id.split(':')[0],
        url: authority.url,
    }
}

export function legMapper(leg: Leg): Leg {
    return {
        ...leg,
        authority: authorityMapper(leg.authority),
        notices: getNotices(leg),
    }
}
