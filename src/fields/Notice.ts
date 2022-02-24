/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface Notice {
    text: string
}

export const fragmentName = 'noticeFields'

const fragment = `
fragment ${fragmentName} on Notice {
    text
}
`

export const fragments = [fragment]
