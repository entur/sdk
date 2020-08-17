export type BookingMethod = 'callOffice' | 'online'

export interface BookingContact {
    phone: string
    url: string
}

export interface BookingArrangement {
    bookingAccess: boolean
    bookingContact: BookingContact
    latestBookingTime: string
    bookingMethods?: BookingMethod[]
    bookWhen?: string
    minimumBookingPeriod?: string
    bookingNote?: string
    buyWhen: string
}
