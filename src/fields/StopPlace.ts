export interface StopPlace {
    id: string
    description?: string
    name: string
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
    tariffZones {
        id
    }
}
`

export const fragments = [fragment]
