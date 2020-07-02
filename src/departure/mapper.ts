import { EstimatedCall } from '../fields/EstimatedCall'
import { Leg } from '../fields/Leg'
import { Notice } from '../fields/Notice'

import { uniqBy } from '../utils'

function getNoticesFromLeg(leg: Leg): Notice[] {
    const notices = [
        ...(leg.serviceJourney?.notices || []),
        ...(leg.serviceJourney?.journeyPattern?.notices || []),
        ...(leg.serviceJourney?.journeyPattern?.line?.notices || []),
        ...(leg.fromEstimatedCall?.notices || []),
    ]
    return uniqBy(notices, (notice) => notice.text)
}

function getNotices(departure: EstimatedCall): Notice[] {
    const notices = [
        ...(departure.notices || []),
        ...(departure.serviceJourney?.notices || []),
        ...(departure.serviceJourney?.journeyPattern?.notices || []),
        ...(departure.serviceJourney?.journeyPattern?.line?.notices || []),
    ]
    return uniqBy(notices, (notice) => notice.text)
}

export function destinationMapper(departure: EstimatedCall): EstimatedCall {
    return {
        ...departure,
        notices: getNotices(departure),
    }
}

export function legToDepartureMapper(leg: Leg): EstimatedCall | undefined {
    const { fromEstimatedCall } = leg

    if (!fromEstimatedCall) return undefined

    return {
        actualArrivalTime: fromEstimatedCall.actualArrivalTime,
        actualDepartureTime: fromEstimatedCall.actualDepartureTime,
        aimedArrivalTime: fromEstimatedCall.aimedArrivalTime,
        aimedDepartureTime: leg.aimedStartTime,
        cancellation: fromEstimatedCall.cancellation,
        date: fromEstimatedCall.date,
        destinationDisplay: fromEstimatedCall.destinationDisplay,
        expectedArrivalTime: fromEstimatedCall.expectedArrivalTime,
        expectedDepartureTime: leg.expectedStartTime,
        forAlighting: fromEstimatedCall.forAlighting,
        forBoarding: fromEstimatedCall.forBoarding,
        notices: getNoticesFromLeg(leg),
        predictionInaccurate: fromEstimatedCall.predictionInaccurate,
        quay: leg.fromPlace.quay,
        realtime: leg.realtime,
        requestStop: fromEstimatedCall.requestStop,
        serviceJourney: leg.serviceJourney,
        situations: leg.situations || [],
    }
}
