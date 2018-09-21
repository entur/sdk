// @flow

import type { Line } from './Line'
import type { Notice } from './Notice'

export type JourneyPattern = {
    id: string,
    line: Line,
    name: string,
    notices: Array<Notice>,
}
