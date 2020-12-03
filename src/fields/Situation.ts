import { MultilingualString } from '../types/MultilingualString'

import { uniq } from '../utils'

import {
    fragmentName as lineFields,
    fragments as lineFragments,
    Line,
} from './Line'

export type ReportType = 'general' | 'incident' | null

export interface ValidityPeriod {
    startTime: string
    endTime: string
}

export interface InfoLink {
    uri: string
    label: string
}

export interface Situation {
    situationNumber: string
    summary: MultilingualString[]
    description: MultilingualString[]
    advice: MultilingualString[]
    lines: Line[]
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
