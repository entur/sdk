type BookingMethod =
    | 'callDriver'
    | 'callOffice'
    | 'online'
    | 'other'
    | 'phoneAtStop'
    | 'text'
    | 'none'

type BookWhen =
    | 'advanceOnly'
    | 'untilPreviousDay'
    | 'dayOfTravelOnly'
    | 'advanceAndDayOfTravel'
    | 'timeOfTravelOnly'
    | 'subscriptionChargeMoment'
    | 'other'

type BuyWhen =
    | 'onReservation'
    | 'inAdvance'
    | 'inAdvanceOnly'
    | 'beforeBoarding'
    | 'beforeBoardingOnly'
    | 'onBoarding'
    | 'onBoardingOnly'
    | 'afterBoarding'
    | 'onCheckIn'
    | 'onCheckOut'
    | 'subscriptionOnly'
    | 'other'

type BookingAccess = 'publicAccess' | 'authorisedPublic' | 'staff' | 'other'

export interface BookingContact {
    contactPerson?: string
    email?: string
    furtherDetails?: string
    phone?: string
    url?: string
}

export interface BookingArrangement {
    bookingAccess?: BookingAccess
    bookingContact?: BookingContact
    bookingMethods?: BookingMethod[]
    bookingNote?: string
    bookWhen?: BookWhen
    buyWhen?: BuyWhen[]
    latestBookingTime?: string
    minimumBookingPeriod?: string
}

export const fragmentName = 'bookingArrangementFields'

const fragment = `
fragment ${fragmentName} on BookingArrangement {
    bookingAccess
    bookingContact {
        contactPerson
        email
        url
        phone
        furtherDetails
    }
    bookingMethods
    bookingNote
    bookWhen
    buyWhen
    latestBookingTime
    minimumBookingPeriod
}
`

export const fragments = [fragment]
