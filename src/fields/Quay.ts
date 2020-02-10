import { uniq } from '../utils'

import {
    fragmentName as situationFields,
    fragments as situationFragments,
    Situation,
} from './Situation'

import {
    fragmentName as stopPlaceFields,
    fragments as stopPlaceFragments,
    StopPlace,
} from './StopPlace'

export interface Quay {
    id: string
    name: string
    description: string
    publicCode: string
    situations: Array<Situation>
    stopPlace: StopPlace
}

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
