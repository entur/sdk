export interface BikeRentalStation {
    id: string
    name: string
    networks: string[]
    spacesAvailable?: number
    bikesAvailable?: number
    longitude: number
    latitude: number
}

export const fragmentName = 'bikeRentalStationFields'

const fragment = `
fragment ${fragmentName} on BikeRentalStation {
    id
    name
    networks
    bikesAvailable
    spacesAvailable
    longitude
    latitude
}`

export const fragments = [fragment]
