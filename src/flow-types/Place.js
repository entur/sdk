// @flow

import type { Quay } from './Quay'

export type Place = {
  name: string,
  latitude: number,
  longitude: number,
  quay: Quay,
}
