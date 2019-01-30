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

export const getDeparturesForStopPlacesQuery = {
    query: {
        __variables: {
            ids: '[String]!',
            start: 'DateTime!',
            timeRange: 'Int!',
            limit: 'Int!',
            omitNonBoarding: 'Boolean!',
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
                    omitNonBoarding: new VariableType('omitNonBoarding'),
                },
                ...departureFields,
            },
        },
    },
}

export const getDeparturesForQuayQuery = {
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
