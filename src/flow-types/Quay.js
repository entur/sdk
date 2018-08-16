// @flow

import type { Situation } from './Situation'

export type Quay = {
  id: string,
  name: string,
  description?: string,
  // stopPlace?: {
  //   id: string,
  //   name: string,
  //   description?: string,
  // },
  publicCode: string,
  situations?: Array<Situation>,
}
