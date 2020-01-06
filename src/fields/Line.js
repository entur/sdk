// @flow
import type { TransportMode, TransportSubmode } from '../../flow-types/Mode'

import noticeFields, { type Notice } from './Notice'

type BookingMethod = 'callOffice' | 'online'

type BookingContact = {
  phone: string,
  url: string,
}

type BookingArrangement = {
  bookingAccess: boolean,
  bookingContact: BookingContact,
  latestBookingTime: string,
  bookingMethods?: Array<BookingMethod>,
  bookWhen?: string,
  minimumBookingPeriod?: string,
  bookingNote?: string,
  buyWhen: string,
}

const bookingArrangementsFields = {
    bookingMethods: true,
    bookingNote: true,
    minimumBookingPeriod: true,
    bookingContact: {
        phone: true,
        url: true,
    },
}

type FlexibleLineType =
    | 'corridorService'
    | 'mainRouteWithFlexibleEnds'
    | 'flexibleAreasOnly'
    | 'hailAndRideSections'
    | 'fixedStopAreaWide'
    | 'freeAreaAreaWide'
    | 'mixedFlexible'
    | 'mixedFlexibleAndFixed'
    | 'fixed'
    | 'other'

export type Line = {
    bookingArrangements?: BookingArrangement,
    description?: string,
    flexibleLineType?: FlexibleLineType,
    id: string,
    name: string,
    notices: Array<Notice>,
    publicCode: string,
    transportMode: TransportMode,
    transportSubmode: TransportSubmode,
}

export default {
    bookingArrangements: bookingArrangementsFields,
    description: true,
    flexibleLineType: true,
    id: true,
    name: true,
    notices: noticeFields,
    publicCode: true,
    transportMode: true,
    transportSubmode: true,
}
