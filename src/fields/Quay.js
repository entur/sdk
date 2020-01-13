// @flow

import situationFields, { type Situation } from './Situation'

export type Quay = {|
    id: string,
    name: string,
    description: string,
    publicCode: string,
    situations: Array<Situation>,
    stopPlace: {
        id: string,
        description?: string,
    },
|}

export default {
    id: true,
    name: true,
    publicCode: true,
    description: true,
    situations: situationFields,
    stopPlace: {
        id: true,
        description: true,
    },
}
