import { MultilingualString } from '../types/MultilingualString'

import { uniq } from '../utils'

import {
    fragmentName as lineFields,
    fragments as lineFragments,
    Line,
} from './Line'

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export type ReportType = 'general' | 'incident' | null

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface ValidityPeriod {
    startTime: string
    endTime: string
}

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface InfoLink {
    uri: string
    label: string
}

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface Situation {
    situationNumber: string
    summary: MultilingualString[]
    description: MultilingualString[]
    advice: MultilingualString[]
    /**
     * @deprecated lines will be removed from Situation in a future major version.
     */
    lines?: Line[]
    validityPeriod: ValidityPeriod
    reportType: ReportType
    infoLinks: InfoLink[]
}

export const fragmentName = 'situationFields'

const fragment = `
fragment ${fragmentName} on PtSituationElement {
    situationNumber
    summary {
        language
        value
    }
    description {
        language
        value
    }
    advice {
        language
        value
    }
    lines {
        ...${lineFields}
    }
    validityPeriod {
        startTime
        endTime
    }
    reportType
    infoLinks {
        uri
        label
    }
}
`

export const fragments = uniq<string>([fragment, ...lineFragments])
