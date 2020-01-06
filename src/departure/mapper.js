// @flow
import type { EstimatedCall } from '../fields/EstimatedCall'
import type { Leg } from '../fields/Leg'
import type { Notice } from '../fields/Notice'

import { uniqBy } from '../utils'

function getNoticesFromLeg(leg: Leg): Array<Notice> {
    const notices = [
        ...leg.serviceJourney?.notices || [],
        ...leg.serviceJourney?.journeyPattern?.notices || [],
        ...leg.serviceJourney?.journeyPattern?.line?.notices || [],
        ...leg.fromEstimatedCall?.notices || [],
    ]
    return uniqBy(notices, notice => notice.text)
}

function getNotices(departure: EstimatedCall): Array<Notice> {
    const notices = [
        ...departure.notices || [],
        ...departure.serviceJourney?.notices || [],
        ...departure.serviceJourney?.journeyPattern?.notices || [],
        ...departure.serviceJourney?.journeyPattern?.line?.notices || [],
    ]
    return uniqBy(notices, notice => notice.text)
}

export function destinationMapper(departure: EstimatedCall): EstimatedCall {
    return {
        ...departure,
        notices: getNotices(departure),
    }
}

export function legToDepartureMapper(leg: Leg): EstimatedCall | void {
    const { fromEstimatedCall } = leg

    if (!fromEstimatedCall) {
        return undefined
    }

    return {
        actualArrivalTime: fromEstimatedCall.actualArrivalTime,
        actualDepartureTime: fromEstimatedCall.actualDepartureTime,
        aimedArrivalTime: fromEstimatedCall.aimedArrivalTime,
        cancellation: fromEstimatedCall.cancellation,
        expectedArrivalTime: fromEstimatedCall.expectedArrivalTime,
        date: fromEstimatedCall.date,
        forBoarding: fromEstimatedCall.forBoarding,
        requestStop: fromEstimatedCall.requestStop,
        forAlighting: fromEstimatedCall.forAlighting,
        destinationDisplay: fromEstimatedCall.destinationDisplay,
        notices: getNoticesFromLeg(leg),
        aimedDepartureTime: leg.aimedStartTime,
        expectedDepartureTime: leg.expectedStartTime,
        realtime: leg.realtime,
        situations: leg.situations || [],
        quay: leg.fromPlace.quay,
        serviceJourney: leg.serviceJourney,
    }
}
