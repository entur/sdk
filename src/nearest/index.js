// @flow
import { journeyPlannerQuery } from '../api'

import { getNearestPlacesQuery } from './query'

import type {
    TransportMode, Coordinates, TypeName, NearestPlace,
} from '../../flow-types'

type FilterPlaceType =
    | 'bicycleRent'
    | 'bikePark'
    | 'carPark'
    | 'quay'
    | 'stopPlace'

const ALL_PLACE_TYPES = [
    'bicycleRent',
    'bikePark',
    'carPark',
    'quay',
    'stopPlace',
]

function convertTypeNameToFilterPlaceType(typeName: TypeName): FilterPlaceType | void {
    switch (typeName) {
        case 'BikePark': return 'bikePark'
        case 'BikeRentalStation': return 'bicycleRent'
        case 'CarPark': return 'carPark'
        case 'Quay': return 'quay'
        case 'StopPlace': return 'stopPlace'
        default: return undefined
    }
}

type NearestParams = {
    maximumDistance?: number,
    maximumResults?: number,
    filterByPlaceTypes?: Array<TypeName>,
    filterByModes?: Array<TransportMode>,
    filterByInUse?: boolean,
    multiModalMode?: 'parent' | 'child' | 'all',
}

export function getNearestPlaces(
    coordinates: Coordinates,
    params?: NearestParams = {},
): Promise<Array<NearestPlace>> {
    const { latitude, longitude } = coordinates

    const {
        maximumDistance = 2000,
        maximumResults = 20,
        filterByInUse = false,
        filterByModes,
        filterByPlaceTypes = ALL_PLACE_TYPES,
        multiModalMode = 'parent',
    } = params

    const variables = {
        latitude,
        longitude,
        maximumDistance,
        maximumResults,
        filterByInUse,
        filterByModes,
        filterByPlaceTypes,
        multiModalMode,
    }

    if (params.filterByPlaceTypes) {
        variables.filterByPlaceTypes = params.filterByPlaceTypes
            .map(convertTypeNameToFilterPlaceType)
            .filter(Boolean)
    }

    return journeyPlannerQuery(getNearestPlacesQuery, variables, this.config)
        .then((data: Object = {}) => (data?.nearest.edges || []).map(({ node }) => {
            const { distance, place } = node

            return {
                distance,
                id: place.id,
                type: place.__typename, // eslint-disable-line no-underscore-dangle
                latitude: place.latitude,
                longitude: place.longitude,
            }
        }))
}
