// @flow

import type { Notice } from './Notice'
import type { LegMode, TransportSubmode } from './Mode'

export type Line = {
    id: string,
    publicCode: string,
    name: string,
    transportMode: LegMode,
    transportSubmode: TransportSubmode,
    description?: string,
    notices?: Array<Notice>,
    presentation: {
        colour: string,
        textColour: string
    }
}
