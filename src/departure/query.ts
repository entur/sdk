import {
    fragmentName as legFields,
    fragments as legFragments,
} from '../fields/Leg'

import {
    fragmentName as estimatedCallFields,
    fragments as estimatedCallFragments,
} from '../fields/EstimatedCall'

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
            ...${estimatedCallFields}
        }
    }
}

${estimatedCallFragments.join('')}
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
            ...${estimatedCallFields}
        }
    }
}

${estimatedCallFragments.join('')}
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
                ...${legFields}
            }
        }
    }
}

${legFragments.join('')}
`

export const getDeparturesForServiceJourneyQuery = `
query(
    $id: String!,
    $date: Date,
) {
    serviceJourney(id: $id) {
        estimatedCalls(date: $date) {
            ...${estimatedCallFields}
        }
    }
}

${estimatedCallFragments.join('')}
`
