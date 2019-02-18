// @flow
import type { Departure, LegDeparture } from '../../flow-types/Departures'
import type { Notice } from '../../flow-types/Notice'
import { uniqBy } from '../utils'

function getNoticesFromLeg(leg: LegDeparture): Array<Notice> {
    const notices = [
        ...leg.serviceJourney?.notices || [],
        ...leg.serviceJourney?.journeyPattern?.notices || [],
        ...leg.serviceJourney?.journeyPattern?.line?.notices || [],
        ...leg.fromEstimatedCall?.notices || [],
    ]
    return uniqBy(notices, notice => notice.text)
}

function getNotices(departure: Departure): Array<Notice> {
    const notices = [
        ...departure.notices || [],
        ...departure.serviceJourney?.notices || [],
        ...departure.serviceJourney?.journeyPattern?.notices || [],
        ...departure.serviceJourney?.journeyPattern?.line?.notices || [],
    ]
    return uniqBy(notices, notice => notice.text)
}


export function destinationMapper(departure: Departure): Departure {
    return {
        ...departure,
        notices: getNotices(departure),
    }
}

export function legToDepartureMapper(leg: LegDeparture): Departure {
    const { fromEstimatedCall } = leg

    return {
        date: fromEstimatedCall.date,
        forBoarding: fromEstimatedCall.forBoarding,
        requestStop: fromEstimatedCall.requestStop,
        forAlighting: fromEstimatedCall.forAlighting,
        destinationDisplay: fromEstimatedCall.destinationDisplay,
        notices: getNoticesFromLeg(leg),
        aimedDepartureTime: leg.aimedStartTime,
        expectedDepartureTime: leg.expectedStartTime,
        realtime: leg.realtime,
        situations: leg.situations,
        quay: leg.fromPlace.quay || { id: '', name: '' },
        destinationQuay: leg.toPlace.quay,
        serviceJourney: leg.serviceJourney,
    }
}
