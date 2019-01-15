// @flow
import { VariableType } from 'json-to-graphql-query'

import {
    noticeFields,
    situationFields,
    lineFields,
    quayFields,
    estimatedCallFields,
    intermediateEstimatedCallFields,
} from './queryHelper'

const journeyPatternFields = {
    line: {
        notices: noticeFields,
    },
    notices: noticeFields,
}

const serviceJourneyFields = {
    id: true,
    publicCode: true,
    transportSubmode: true,
    journeyPattern: journeyPatternFields,
    notices: noticeFields,
}

const placeFields = {
    name: true,
    latitude: true,
    longitude: true,
    quay: {
        ...quayFields,
        stopPlace: {
            id: true,
            name: true,
            description: true,
            tariffZones: { id: true },
        },
    },
}

const legFields = {
    mode: true,
    transportSubmode: true,
    aimedStartTime: true,
    aimedEndTime: true,
    expectedStartTime: true,
    expectedEndTime: true,
    realtime: true,
    distance: true,
    duration: true,
    ride: true,
    fromPlace: placeFields,
    toPlace: placeFields,
    serviceJourney: serviceJourneyFields,

    line: lineFields,
    toEstimatedCall: estimatedCallFields,
    fromEstimatedCall: estimatedCallFields,
    intermediateEstimatedCalls: intermediateEstimatedCallFields,

    pointsOnLink: {
        points: true,
        length: true,
    },
    authority: {
        id: true,
        name: true,
        url: true,
    },
    operator: {
        id: true,
        name: true,
        url: true,
    },
    situations: situationFields,
}

export const getTripPatternQuery = {
    query: {
        __variables: {
            numTripPatterns: 'Int!',
            from: 'Location!',
            to: 'Location!',
            dateTime: 'DateTime!',
            arriveBy: 'Boolean!',
            wheelchair: 'Boolean!',
            modes: '[Mode]!',
            transportSubmodes: '[TransportSubmodeFilter]',
            maxPreTransitWalkDistance: 'Float',
            walkSpeed: 'Float',
        },
        trip: {
            __args: {
                numTripPatterns: new VariableType('numTripPatterns'),
                from: new VariableType('from'),
                to: new VariableType('to'),
                dateTime: new VariableType('dateTime'),
                arriveBy: new VariableType('arriveBy'),
                wheelchair: new VariableType('wheelchair'),
                modes: new VariableType('modes'),
                transportSubmodes: new VariableType('transportSubmodes'),
                maxPreTransitWalkDistance: new VariableType('maxPreTransitWalkDistance'),
                walkSpeed: new VariableType('walkSpeed'),
            },
            tripPatterns: {
                startTime: true,
                endTime: true,
                duration: true,
                distance: true,
                walkDistance: true,
                legs: legFields,
            },
        },
    },
}

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
