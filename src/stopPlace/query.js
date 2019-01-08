// @flow
import { VariableType } from 'json-to-graphql-query'

import { situationFields } from '../trip/queryHelper'

const quayFields = {
    id: true,
    publicCode: true,
    description: true,
}

const stopPlaceFields = {
    id: true,
    name: true,
    description: true,
    latitude: true,
    longitude: true,
    wheelchairBoarding: true,
    weighting: true,
    transportMode: true,
    transportSubmode: true,
    quays: {
        ...quayFields,
        situations: situationFields,
    },
}

export const getStopPlaceQuery = {
    query: {
        __variables: {
            id: 'String!',
        },
        stopPlace: {
            __args: {
                id: new VariableType('id'),
            },
            ...stopPlaceFields,
        },
    },
}

export const getStopPlacesByBboxQuery = {
    query: {
        __variables: {
            minLat: 'Float',
            minLng: 'Float',
            maxLng: 'Float',
            maxLat: 'Float',
        },
        stopPlacesByBbox: {
            __args: {
                minimumLatitude: new VariableType('minLat'),
                minimumLongitude: new VariableType('minLng'),
                maximumLatitude: new VariableType('maxLat'),
                maximumLongitude: new VariableType('maxLng'),
            },
            ...stopPlaceFields,
        },
    },
}
