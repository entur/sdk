// @flow
import type { MultilingualString } from '../../flow-types/MultilingualString'

import lineFields, { type Line } from './Line'

type ReportType = 'general' | 'incident' | null

export type Situation = {|
    situationNumber: string,
    summary: Array<MultilingualString>,
    description: Array<MultilingualString>,
    detail: Array<MultilingualString>,
    lines: Array<Line>,
    validityPeriod: {
        startTime: string,
        endTime: string,
    },
    reportType: ReportType,
    infoLinks: Array<{
        uri: string,
        label: string,
    }>,
|}

export default {
    situationNumber: true,
    summary: {
        language: true,
        value: true,
    },
    description: {
        language: true,
        value: true,
    },
    detail: {
        language: true,
        value: true,
    },
    lines: lineFields,
    validityPeriod: {
        startTime: true,
        endTime: true,
    },
    reportType: true,
    infoLinks: {
        uri: true,
        label: true,
    },
}
