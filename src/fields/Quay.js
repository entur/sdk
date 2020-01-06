// @flow

import situationFields, { type Situation } from './Situation'

export type Quay = {|
  id: string,
  name: string,
  description: string,
  publicCode: string,
  situations: Array<Situation>,
|}

export default {
    id: true,
    name: true,
    publicCode: true,
    description: true,
    situations: situationFields,
}
