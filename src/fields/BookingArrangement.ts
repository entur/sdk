type BookingMethod = 'callOffice' | 'online'

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

export const fragmentName = 'bookingArrangementFields'

const fragment = `
fragment ${fragmentName} on BookingArrangement {
    bookingContact {
        contactPerson
        email
        url
        phone
        furtherDetails
    }
    bookingAccess
    bookWhen
    latestBookingTime
    minimumBookingPeriod
    bookingNote
}
`

export const fragments = [fragment]
