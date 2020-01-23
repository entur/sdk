// @flow
import { uniq } from '../utils'

import {
    fragmentName as quayFields,
    fragments as quayFragments,
    type Quay,
} from './Quay'

import {
    fragmentName as bikeRentalStationFields,
    fragments as bikeRentalStationFragments,
    type BikeRentalStation,
} from './BikeRentalStation'

export type Place = {|
    latitude: number,
    longitude: number,
    name: string,
    quay?: Quay,
    bikeRentalStation?: BikeRentalStation,
|}

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
