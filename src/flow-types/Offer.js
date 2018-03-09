// @flow

import type { Product } from './Product'

export type Offer = {
    id: string,
    idsOfTravelers: Array<string>,
    idsOfLegs: Array<string>,
    prices: Array<{
            amount: string,
            taxAmount: string,
            taxRate: string,
            currency: string,
        }>,
    product: Product,
}
