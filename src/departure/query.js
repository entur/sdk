// @flow
import { VariableType } from 'json-to-graphql-query'

import {
    situationFields,
    lineFields,
    quayFields,
    estimatedCallFields,
    serviceJourneyFields,
} from '../trip/query'


const departureFields = {
    ...estimatedCallFields,
    aimedDepartureTime: true,
    expectedDepartureTime: true,
    realtime: true,
    situations: situationFields,
    cancellation: true,
    quay: quayFields,
    serviceJourney: {
        ...serviceJourneyFields,
        line: {
            ...lineFields,
            transportMode: true,
            description: true,
        },
    },
}

export const getDeparturesFromStopPlacesQuery = {
    query: {
        __variables: {
            ids: '[String]!',
            start: 'DateTime!',
            timeRange: 'Int!',
            limit: 'Int!',
            limitPerLine: 'Int',
            omitNonBoarding: 'Boolean!',
            whiteListedLines: '[String!]',
            whiteListedAuthorities: '[String!]',
            whiteListedModes: '[Mode]',
        },
        stopPlaces: {
            __args: {
                ids: new VariableType('ids'),
            },
            id: true,
            estimatedCalls: {
                __args: {
                    startTime: new VariableType('start'),
                    timeRange: new VariableType('timeRange'),
                    numberOfDepartures: new VariableType('limit'),
                    numberOfDeparturesPerLineAndDestinationDisplay: new VariableType('limitPerLine'),
                    omitNonBoarding: new VariableType('omitNonBoarding'),
                    whiteListed: {
                        lines: new VariableType('whiteListedLines'),
                        authorities: new VariableType('whiteListedAuthorities'),
                    },
                    whiteListedModes: new VariableType('whiteListedModes'),
                },
                ...departureFields,
            },
        },
    },
}

export const getDeparturesFromQuayQuery = {
    query: {
        __variables: {
            ids: '[String]!',
            start: 'DateTime!',
            timeRange: 'Int!',
            limit: 'Int!',
            omitNonBoarding: 'Boolean!',
        },
        quays: {
            __args: {
                ids: new VariableType('ids'),
            },
            id: true,
            estimatedCalls: {
                __args: {
                    startTime: new VariableType('start'),
                    timeRange: new VariableType('timeRange'),
                    numberOfDepartures: new VariableType('limit'),
                    omitNonBoarding: new VariableType('omitNonBoarding'),
                },
                ...departureFields,
            },
        },
    },
}

export const getDeparturesBetweenStopPlacesQuery = {
    query: {
        __variables: {
            from: 'Location!',
            to: 'Location!',
            limit: 'Int!',
            dateTime: 'DateTime!',
            arriveBy: 'Boolean!',
            modes: '[Mode]!',
            transportSubmodes: '[TransportSubmodeFilter]',

        },
        trip: {
            __args: {
                from: new VariableType('from'),
                to: new VariableType('to'),
                numTripPatterns: new VariableType('limit'),
                dateTime: new VariableType('dateTime'),
                arriveBy: new VariableType('arriveBy'),
                modes: new VariableType('modes'),
                transportSubmodes: new VariableType('transportSubmodes'),
                wheelchair: false,
                maximumTransfers: 0,
            },

            tripPatterns: {
                legs: {
                    aimedStartTime: true,
                    expectedStartTime: true,
                    realtime: true,
                    fromEstimatedCall: estimatedCallFields,
                    situations: situationFields,
                    fromPlace: {
                        quay: quayFields,
                    },
                    toPlace: {
                        quay: quayFields,
                    },
                    serviceJourney: {
                        ...serviceJourneyFields,
                        line: {
                            ...lineFields,
                            transportMode: true,
                            description: true,
                        },
                    },
                },
            },
        },
    },
}
