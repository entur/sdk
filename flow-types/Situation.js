// @flow

import type { MultilingualString } from './MultilingualString'

type ValidityPeriod = { startTime: string, endTime: string }

export type ReportType = 'general' | 'incident' | null

export type Situation = {|
    situationNumber: string,
    summary: Array<MultilingualString>,
    description: Array<MultilingualString>,
    detail: Array<MultilingualString>,
    validityPeriod: ValidityPeriod,
    reportType: ReportType,
    infoLinks: Array<{
        uri: string,
        label: string,
    }>
|}
