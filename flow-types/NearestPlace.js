// @flow

export type TypeName =
    | 'BikePark'
    | 'BikeRentalStation'
    | 'CarPark'
    | 'Quay'
    | 'StopPlace'

export type NearestPlace = {
    id: string,
    type: TypeName,
    distance: number,
    latitude: number,
    longitude: number,
}
