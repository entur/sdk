// @flow

import type { Product } from './Product'
import type { Authority } from './Authority'
import type { Operator } from './Operator'

export type Offer = {
    ids: Array<string>,
    products: Array<Product>,
    serviceJourneyIds: Array<string>,
    tripPatternId: string,
    authority: Authority,
    operator?: Operator,
    fromPlace: string,
    startTime: string,
    authority: Authority,
    mode: string,
    toPlace: string,
    endTime: string,
    ticketUnavailable: boolean,
    notYetAvailable?: boolean,
}
