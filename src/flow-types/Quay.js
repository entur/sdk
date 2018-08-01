// @flow

import type { Situation } from './Situation'

export type Quay = {
    id: string,
    publicCode: string,
    description: string,
    situations: Array<Situation>,
}
