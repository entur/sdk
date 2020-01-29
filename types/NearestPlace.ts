export type TypeName =
    | 'BikePark'
    | 'BikeRentalStation'
    | 'CarPark'
    | 'Quay'
    | 'StopPlace'

export interface NearestPlace {
    id: string;
    type: TypeName;
    distance: number;
    latitude: number;
    longitude: number;
}
