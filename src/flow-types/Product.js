// @flow

import type { Price } from './Price'
import type { CartItem } from './CartItem'

export type Product = {
    id: string,
    name: string,
    prices: Array<Price>,
    serviceJourneyIds: Array<string>,
    totalPrice: number,
    offerId: string,
    offers?: Array<Object>, // DEPRECATED!
    cart: Array<CartItem>,
    validZones?: Array<string>,
    descriptions: Array<string>,
}
