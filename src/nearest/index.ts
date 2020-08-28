import { journeyPlannerQuery } from '../api'

import { getNearestPlacesQuery } from './query'

import { TransportMode } from '../types/Mode'
import { Coordinates } from '../types/Coordinates'
import { NearestPlace, TypeName } from './types'

import { getServiceConfig, ArgumentConfig } from '../config'
import { isTruthy } from '../utils'

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

function convertTypeNameToFilterPlaceType(
    typeName: TypeName,
): FilterPlaceType | undefined {
    switch (typeName) {
        case TypeName.BIKE_PARK:
            return 'bikePark'
        case TypeName.BIKE_RENTAL_STATION:
            return 'bicycleRent'
        case TypeName.CAR_PARK:
            return 'carPark'
        case TypeName.QUAY:
            return 'quay'
        case TypeName.STOP_PLACE:
            return 'stopPlace'
        default:
            return undefined
    }
}

type NearestParams = {
    maximumDistance?: number
    maximumResults?: number
    filterByPlaceTypes?: TypeName[]
    filterByModes?: TransportMode[]
    filterByInUse?: boolean
    multiModalMode?: 'parent' | 'child' | 'all'
}

type NearestData = {
    nearest?: {
        edges?: Array<{
            node: {
                distance: number
                place: {
                    id: string
                    __typename: TypeName
                    latitude: number
                    longitude: number
                }
            }
        }>
    }
}

export function createGetNearestPlaces(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getNearestPlaces(
        coordinates: Coordinates,
        params: NearestParams = {},
    ): Promise<NearestPlace[]> {
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
                .filter(isTruthy)
        }

        return journeyPlannerQuery<NearestData>(
            getNearestPlacesQuery,
            variables,
            config,
        ).then((data) =>
            (data?.nearest?.edges || []).map(({ node }) => {
                const { distance, place } = node

                return {
                    distance,
                    id: place.id,
                    type: place.__typename, // eslint-disable-line no-underscore-dangle
                    latitude: place.latitude,
                    longitude: place.longitude,
                }
            }),
        )
    }
}
