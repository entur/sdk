export interface StopPlace {
    id: string
    description?: string
    name: string
    latitude?: number
    longitude?: number
    tariffZones?: Array<{
        id: string
    }>
}

export const fragmentName = 'stopPlaceFields'

const fragment = `
fragment ${fragmentName} on StopPlace {
    id
    description
    name
    latitude
    longitude
    tariffZones {
        id
    }
}
`

export const fragments = [fragment]
