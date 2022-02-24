/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export type PointsOnLink = {
    points: string
    length: number
}

export const fragmentName = 'pointsOnLinkFields'

const fragment = `
fragment ${fragmentName} on PointsOnLink {
    points
    length
}
`

export const fragments = [fragment]
