// @flow
type LocationWithCoordinates = {
    name: string,
    coordinates: {
        latitude: number,
        longitude: number
    }
}

type LocationWithPlace = {
    name: string,
    place: string,
}

export type Location =
  | LocationWithPlace
  | LocationWithCoordinates
