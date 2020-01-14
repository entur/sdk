// @flow

export type BikeRentalStation = {
    id: string,
    name: string,
    networks: Array<string>,
    spacesAvailable?: number,
    bikesAvailable?: number,
    longitude: number,
    latitude: number,
}

export default {
    id: true,
    name: true,
    networks: true,
    bikesAvailable: true,
    spacesAvailable: true,
    longitude: true,
    latitude: true,
}
