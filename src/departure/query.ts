import {
    fragmentName as quayFields,
    fragments as quayFragments,
} from '../fields/Quay'

import {
    fragmentName as serviceJourneyFields,
    fragments as serviceJourneyFragments,
} from '../fields/ServiceJourney'

import {
    fragmentName as departureFields,
    fragments as departureFragments,
} from '../fields/Departure'

import {
    fragmentName as situationFields,
    fragments as situationFragments,
} from '../fields/Situation'

import { uniq } from '../utils'

export const getDeparturesFromStopPlacesQuery = `
query(
    $ids: [String]!,
    $start: DateTime!,
    $timeRange: Int!,
    $limit: Int!,
    $limitPerLine: Int,
    $omitNonBoarding: Boolean!,
    $whiteListedLines: [String!],
    $whiteListedAuthorities: [String!],
    $whiteListedModes: [Mode],
    $includeCancelledTrips: Boolean!
) {
    stopPlaces(ids: $ids) {
        id
        estimatedCalls(
            startTime: $start,
            timeRange: $timeRange,
            numberOfDepartures: $limit,
            numberOfDeparturesPerLineAndDestinationDisplay: $limitPerLine,
            omitNonBoarding: $omitNonBoarding,
            whiteListed: {
                lines: $whiteListedLines,
                authorities: $whiteListedAuthorities,
            },
            whiteListedModes: $whiteListedModes,
            includeCancelledTrips: $includeCancelledTrips
        ) {
            ...${departureFields}
        }
    }
}

${departureFragments.join('')}
`

export const getDeparturesFromQuayQuery = `
query(
    $ids: [String]!,
    $start: DateTime!,
    $timeRange: Int!,
    $limit: Int!,
    $limitPerLine: Int,
    $omitNonBoarding: Boolean!,
    $includeCancelledTrips: Boolean!
) {
    quays(ids: $ids) {
        id
        estimatedCalls(
            startTime: $start,
            timeRange: $timeRange,
            numberOfDepartures: $limit,
            omitNonBoarding: $omitNonBoarding,
            includeCancelledTrips: $includeCancelledTrips,
            numberOfDeparturesPerLineAndDestinationDisplay: $limitPerLine
        ) {
            ...${departureFields}
        }
    }
}

${departureFragments.join('')}
`

export const getDeparturesBetweenStopPlacesQuery = `
query(
    $from: Location!,
    $to: Location!,
    $limit: Int!,
    $dateTime: DateTime!,
    $arriveBy: Boolean!,
    $modes: [Mode]!,
    $transportSubmodes: [TransportSubmodeFilter]
) {
    trip(
        from: $from,
        to: $to,
        numTripPatterns: $limit,
        dateTime: $dateTime,
        arriveBy: $arriveBy,
        modes: $modes,
        transportSubmodes: $transportSubmodes,
        wheelchair: false,
        maximumTransfers: 0
    ) {
        tripPatterns {
            legs {
                aimedStartTime
                expectedStartTime
                fromPlace {
                    quay {
                        ...${quayFields}
                    }
                }
                realtime
                serviceJourney {
                    ...${serviceJourneyFields}
                }
                situations {
                    ...${situationFields}
                }
                fromEstimatedCall {
                    ...${departureFields}
                }
            }
        }
    }
}

${uniq<string>([
    ...departureFragments,
    ...quayFragments,
    ...serviceJourneyFragments,
    ...situationFragments,
]).join('')}
`

export const getDeparturesForServiceJourneyQuery = `
query(
    $id: String!,
    $date: Date,
) {
    serviceJourney(id: $id) {
        estimatedCalls(date: $date) {
            ...${departureFields}
        }
    }
}

${departureFragments.join('')}
`
