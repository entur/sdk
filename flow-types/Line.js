// @flow

import type { BookingArrangement } from './BookingArrangement'
import type { Notice } from './Notice'
import type { FlexibleLineType } from './FlexibleLineType'

export type Line = {
    id: string,
    name: string,
    notices?: Array<Notice>,
    publicCode: string,
    bookingArrangements?: BookingArrangement,
    flexibleLineType?: FlexibleLineType,
}
