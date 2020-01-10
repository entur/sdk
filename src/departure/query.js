// @flow
import { VariableType } from 'json-to-graphql-query'

import legFields from '../fields/Leg'
import estimatedCallFields from '../fields/EstimatedCall'

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
                ...estimatedCallFields,
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
                ...estimatedCallFields,
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
                legs: legFields,
            },
        },
    },
}

export const getDeparturesForServiceJourneyQuery = {
    query: {
        __variables: {
            id: 'String!',
            date: 'Date',
        },
        serviceJourney: {
            __args: {
                id: new VariableType('id'),
            },
            estimatedCalls: {
                __args: {
                    date: new VariableType('date'),
                },
                ...estimatedCallFields,
            },
        },
    },
}
