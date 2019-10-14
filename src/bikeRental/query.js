// @flow
import { VariableType } from 'json-to-graphql-query'

const bikeRentalStationFields = {
    id: true,
    name: true,
    bikesAvailable: true,
    spacesAvailable: true,
    longitude: true,
    latitude: true,
    networks: true,
}

export const getBikeRentalStationQuery = {
    query: {
        __variables: {
            id: 'String!',
        },
        bikeRentalStation: {
            __args: {
                id: new VariableType('id'),
            },
            ...bikeRentalStationFields,
        },
    },
}

export const getBikeRentalStationsQuery = {
    query: {
        bikeRentalStations: {
            ...bikeRentalStationFields,
        },
    },
}

export const getBikeRentalStationsByPositionQuery = {
    query: {
        __variables: {
            minLat: 'Float',
            minLng: 'Float',
            maxLat: 'Float',
            maxLng: 'Float',
        },
        bikeRentalStationsByBbox: {
            __args: {
                minimumLatitude: new VariableType('minLat'),
                minimumLongitude: new VariableType('minLng'),
                maximumLatitude: new VariableType('maxLat'),
                maximumLongitude: new VariableType('maxLng'),
            },
            ...bikeRentalStationFields,
        },
    },
}
