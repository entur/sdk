// @flow

import { uniq } from '../utils'

import {
    fragmentName as situationFields,
    fragments as situationFragments,
    type Situation,
} from './Situation'

import {
    fragmentName as stopPlaceFields,
    fragments as stopPlaceFragments,
    type StopPlace,
} from './StopPlace'

export type Quay = {|
    id: string,
    name: string,
    description: string,
    publicCode: string,
    situations: Array<Situation>,
    stopPlace: StopPlace,
|}

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
