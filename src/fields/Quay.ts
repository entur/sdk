import { uniq } from '../utils'

import {
    fragmentName as situationFields,
    fragments as situationFragments,
    Situation,
} from './Situation'

import {
    fragmentName as stopPlaceFields,
    fragments as stopPlaceFragments,
    StopPlace,
} from './StopPlace'

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface Quay {
    id: string
    name: string
    description: string
    publicCode: string
    situations: Situation[]
    stopPlace: StopPlace
}

export const fragmentName = 'quayFields'

export const fragment = `
fragment ${fragmentName} on Quay {
    id
    name
    description
    publicCode
    situations {
        ...${situationFields}
    }
    stopPlace {
        ...${stopPlaceFields}
    }
}
`

export const fragments = uniq<string>([
    fragment,
    ...situationFragments,
    ...stopPlaceFragments,
])
