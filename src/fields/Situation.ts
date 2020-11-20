import { MultilingualString } from '../types/MultilingualString'

import { uniq } from '../utils'

import {
    fragmentName as lineFields,
    fragments as lineFragments,
    Line,
} from './Line'

type ReportType = 'general' | 'incident' | null

export interface Situation {
    situationNumber: string
    summary: MultilingualString[]
    description: MultilingualString[]
    advice: MultilingualString[]
    lines: Line[]
    validityPeriod: {
        startTime: string
        endTime: string
    }
    reportType: ReportType
    infoLinks: Array<{
        uri: string
        label: string
    }>
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
