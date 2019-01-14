// @flow
import type { Leg, Notice } from '../../flow-types'
import type { IntermediateEstimatedCall } from '../../flow-types/EstimatedCall'

function uniqBy<T>(arr: Array<T>, predicate: (T) => any): Array<T> {
    return [...arr.reduce((map, item) => {
        const key = predicate(item)

        if (!map.has(key)) {
            map.set(key, item)
        }

        return map
    }, new Map()).values()]
}


function getNoticesFromIntermediateEstimatedCalls(
    estimatedCalls?: Array<IntermediateEstimatedCall> = [],
): Array<Notice> {
    return estimatedCalls.reduce((notices, estimatedCall) => (
        estimatedCall.notices ? [...notices, ...estimatedCall.notices] : notices
    ), [])
}

function getNotices(leg: Leg): Array<Notice> {
    const notices = [
        ...getNoticesFromIntermediateEstimatedCalls(leg.intermediateEstimatedCalls),
        ...leg?.serviceJourney?.notices || [],
        ...leg?.serviceJourney?.journeyPattern?.notices || [],
        ...leg?.serviceJourney?.journeyPattern?.line?.notices || [],
        ...leg?.fromEstimatedCall?.notices || [],
        ...leg?.toEstimatedCall?.notices || [],
        ...leg?.line?.notices || [],
    ]
    return uniqBy(notices, notice => notice.text)
}

export function legMapper(leg: Leg): Leg {
    return {
        ...leg,
        notices: getNotices(leg),
    }
}
