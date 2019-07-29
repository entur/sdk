// @flow
import { VariableType } from 'json-to-graphql-query'

export const noticeFields = {
    text: true,
}

export const situationFields = {
    situationNumber: true,
    summary: { value: true },
    description: { value: true },
    detail: { value: true },
    validityPeriod: {
        startTime: true,
        endTime: true,
    },
    reportType: true,
    infoLinks: {
        uri: true,
        label: true,
    },
}

export const bookingArrangementsFields = {
    bookingMethods: true,
    bookingNote: true,
    minimumBookingPeriod: true,
    bookingContact: {
        phone: true,
        url: true,
    },
}

export const lineFields = {
    id: true,
    name: true,
    publicCode: true,
    notices: noticeFields,
    bookingArrangements: bookingArrangementsFields,
}

export const quayFields = {
    id: true,
    name: true,
    publicCode: true,
    description: true,
}

export const estimatedCallFields = {
    date: true,
    forBoarding: true,
    requestStop: true,
    forAlighting: true,
    situations: situationFields,
    destinationDisplay: { frontText: true },
    notices: noticeFields,
}

export const intermediateEstimatedCallFields = {
    ...estimatedCallFields,
    quay: quayFields,
    cancellation: true,
    actualDepartureTime: true,
    actualArrivalTime: true,
    aimedDepartureTime: true,
    aimedArrivalTime: true,
    expectedDepartureTime: true,
    expectedArrivalTime: true,
}

const journeyPatternFields = {
    line: {
        notices: noticeFields,
    },
    notices: noticeFields,
}

export const serviceJourneyFields = {
    id: true,
    publicCode: true,
    transportSubmode: true,
    journeyPattern: journeyPatternFields,
    notices: noticeFields,
}

const interchangeFields = {
    staySeated: true,
    guaranteed: true,
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
    rentedBike: true,
    fromPlace: placeFields,
    toPlace: placeFields,
    serviceJourney: serviceJourneyFields,

    line: lineFields,
    toEstimatedCall: estimatedCallFields,
    fromEstimatedCall: estimatedCallFields,

    interchangeFrom: interchangeFields,
    interchangeTo: interchangeFields,

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
