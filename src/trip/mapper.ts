import { IntermediateEstimatedCall } from '../fields/EstimatedCall'

import { Authority } from '../fields/Authority'
import { Leg } from '../fields/Leg'
import { Notice } from '../fields/Notice'

import { uniqBy } from '../utils'

function getNoticesFromIntermediateEstimatedCalls(
    estimatedCalls: IntermediateEstimatedCall[],
): Notice[] {
    if (!estimatedCalls?.length) return []
    return estimatedCalls
        .flatMap(({ notices }) => notices || [])
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

function authorityMapper(authority?: Authority): Authority | undefined {
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
