// @flow
import { VariableType } from 'json-to-graphql-query'

import { situationFields, quayFields } from '../trip/query'

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
        __args: {
            filterByInUse: new VariableType('filterByInUse'),
        },
        ...quayFields,
        situations: situationFields,
    },
}

export const getStopPlaceQuery = {
    query: {
        __variables: {
            id: 'String!',
            filterByInUse: 'Boolean',
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
            filterByInUse: 'Boolean',
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

export const getStopPlaceFacilitiesQuery = {
    query: {
        __variables: {
            id: 'String!',
        },
        stopPlace: {
            __args: {
                id: new VariableType('id'),
            },
            id: true,
            name: {
                lang: true,
                value: true,
            },
            accessibilityAssessment: {
                limitations: {
                    wheelchairAccess: true,
                    stepFreeAccess: true,
                },
            },
            placeEquipments: {
                waitingRoomEquipment: {
                    id: true,
                },
                shelterEquipment: {
                    id: true,
                },
                sanitaryEquipment: {
                    id: true,
                    numberOfToilets: true,
                    gender: true,
                },
                ticketingEquipment: {
                    id: true,
                    numberOfMachines: true,
                    ticketMachines: true,
                    ticketOffice: true,
                },
            },
        },
        parking: {
            __args: {
                stopPlaceId: new VariableType('id'),
            },
            name: {
                lang: true,
                value: true,
            },
            parentSiteRef: true,
            totalCapacity: true,
            principalCapacity: true,
            parkingVehicleTypes: true,
        },
    },
}

export const getQuaysForStopPlaceQuery = {
    query: {
        __variables: {
            id: 'String!',
            filterByInUse: 'Boolean',
        },
        stopPlace: {
            __args: {
                id: new VariableType('id'),
            },
            quays: {
                __args: {
                    filterByInUse: new VariableType('filterByInUse'),
                },
                ...quayFields,
            },
        },
    },
}
