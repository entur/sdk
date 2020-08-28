export enum TypeName {
    BIKE_PARK = 'BikePark',
    BIKE_RENTAL_STATION = 'BikeRentalStation',
    CAR_PARK = 'CarPark',
    QUAY = 'Quay',
    STOP_PLACE = 'StopPlace',
}

export interface NearestPlace {
    id: string
    type: TypeName
    distance: number
    latitude: number
    longitude: number
}
