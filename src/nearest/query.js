// @flow
import { VariableType } from 'json-to-graphql-query'

export const getNearestPlacesQuery = {
    query: {
        __variables: {
            latitude: 'Float!',
            longitude: 'Float!',
            maximumDistance: 'Int',
            maximumResults: 'Int',
            filterByPlaceTypes: '[FilterPlaceType]',
            filterByModes: '[Mode]',
            filterByInUse: 'Boolean',
            multiModalMode: 'MultiModalMode',
        },
        nearest: {
            __args: {
                latitude: new VariableType('latitude'),
                longitude: new VariableType('longitude'),
                maximumDistance: new VariableType('maximumDistance'),
                maximumResults: new VariableType('maximumResults'),
                filterByPlaceTypes: new VariableType('filterByPlaceTypes'),
                filterByModes: new VariableType('filterByModes'),
                filterByInUse: new VariableType('filterByInUse'),
                multiModalMode: new VariableType('multiModalMode'),
            },
            edges: {
                node: {
                    distance: true,
                    place: {
                        __typename: true,
                        id: true,
                        latitude: true,
                        longitude: true,
                    },
                },
            },
        },
    },
}
