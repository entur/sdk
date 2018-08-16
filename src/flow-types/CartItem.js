// @flow

import type { Traveler } from './Traveler'

export type CartItem = Traveler & {
  participants?: Array<string>,
  offerId: string,
  productSelectableIds: Array<string>
}
