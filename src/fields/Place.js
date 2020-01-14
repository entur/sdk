// @flow
import quayFields, { type Quay } from './Quay'
import bikeRentalStationFields, { type BikeRentalStation } from './BikeRentalStation'

export type Place = {|
    latitude: number,
    longitude: number,
    name: string,
    quay?: Quay,
    bikeRentalStation?: BikeRentalStation,
|}

export default {
    name: true,
    latitude: true,
    longitude: true,
    quay: quayFields,
    bikeRentalStation: bikeRentalStationFields,
}
