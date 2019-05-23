// @flow
export type BookingMethod = 'callOffice' | 'online'

export type BookingContact = {
  phone: string,
  url: string,
}

export type BookingArrangement = {
  bookingAccess: boolean,
  bookingContact: BookingContact,
  latestBookingTime: string,
  bookingMethods?: Array<BookingMethod>,
  bookWhen?: string,
  minimumBookingPeriod?: string,
  bookingNote?: string,
  buyWhen: string,
}
