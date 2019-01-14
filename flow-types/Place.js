// @flow

import type { Quay } from './Quay'
import type { StopPlace } from './StopPlace'

export type Place = {
  latitude: number,
  longitude: number,
  name: string,
  quay?: Quay & {
      stopPlace: StopPlace
  },
}
