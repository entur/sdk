import { uniq } from '../utils'

import {
    fragmentName as quayFields,
    fragments as quayFragments,
    Quay,
} from './Quay'

import {
    fragmentName as bikeRentalStationFields,
    fragments as bikeRentalStationFragments,
    BikeRentalStation,
} from './BikeRentalStation'

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface Place {
    latitude: number
    longitude: number
    name: string
    quay?: Quay
    bikeRentalStation?: BikeRentalStation
}

export const fragmentName = 'placeFields'

export const fragment = `
fragment ${fragmentName} on Place {
    name
    latitude
    longitude
    quay {
        ...${quayFields}
    }
    bikeRentalStation {
        ...${bikeRentalStationFields}
    }
}`

export const fragments = uniq<string>([
    fragment,
    ...quayFragments,
    ...bikeRentalStationFragments,
])
