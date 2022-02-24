/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface Interchange {
    guaranteed: boolean
    staySeated: boolean
    FromServiceJourney?: {
        id: string
    }
    ToServiceJourney?: {
        id: string
    }
}

export const fragmentName = 'interchangeFields'

const fragment = `
fragment ${fragmentName} on Interchange {
    guaranteed
    staySeated
    FromServiceJourney {
        id
    }
    ToServiceJourney {
        id
    }
}
`

export const fragments = [fragment]
