/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface Operator {
    id: string
    name: string
    url?: string
}

export const fragmentName = 'operatorFields'

const fragment = `
fragment ${fragmentName} on Operator {
    id
    name
    url
}
`

export const fragments = [fragment]
