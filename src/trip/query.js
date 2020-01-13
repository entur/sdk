// @flow
import { VariableType } from 'json-to-graphql-query'

import legFields from '../fields/Leg'

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
            allowBikeRental: 'Boolean',
            useFlex: 'Boolean',
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
                allowBikeRental: new VariableType('allowBikeRental'),
                useFlex: new VariableType('useFlex'),
            },
            tripPatterns: {
                startTime: true,
                endTime: true,
                directDuration: true,
                duration: true,
                distance: true,
                walkDistance: true,
                legs: legFields,
            },
        },
    },
}
