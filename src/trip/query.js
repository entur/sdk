// @flow
import {
    fragmentName as legFields,
    fragments as legFragments,
} from '../fields/Leg'

const variables = {
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
    banned: 'InputBanned',
    whiteListed: 'InputWhiteListed',
}

const declaration = Object.keys(variables)
    .map(key => `$${key}: ${variables[key]}`)
    .join(',')

const invocation = Object.keys(variables)
    .map(key => `${key}: $${key}`)
    .join(',')

export const getTripPatternQuery = `
query (${declaration}) {
    trip(${invocation}) {
        tripPatterns {
            startTime
            endTime
            directDuration
            duration
            distance
            walkDistance
            legs {
                ...${legFields}
            }
        }
    }
}

${legFragments.join('')}
`
