// @flow

import situationFields, { type Situation } from './Situation'
import stopPlaceFields, { type StopPlace } from './StopPlace'

export type Quay = {|
    id: string,
    name: string,
    description: string,
    publicCode: string,
    situations: Array<Situation>,
    stopPlace: StopPlace,
|}

export default {
    id: true,
    name: true,
    publicCode: true,
    description: true,
    situations: situationFields,
    stopPlace: stopPlaceFields,
}
