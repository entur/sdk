/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
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
