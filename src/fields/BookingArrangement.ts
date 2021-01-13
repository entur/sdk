export enum BookingMethod {
    CALL_DRIVER = 'callDriver',
    CALL_OFFICE = 'callOffice',
    ONLINE = 'online',
    OTHER = 'other',
    PHONE_AT_STOP = 'phoneAtStop',
    TEXT = 'text',
    NONE = 'none',
}

export enum BookWhen {
    ADVANCE_ONLY = 'advanceOnly',
    UNTIL_PREVIOUS_DAY = 'untilPreviousDay',
    DAY_OF_TRAVEL_ONLY = 'dayOfTravelOnly',
    ADVANCE_AND_DAY_OF_TRAVEL = 'advanceAndDayOfTravel',
    TIME_OF_TRAVEL_ONLY = 'timeOfTravelOnly',
    SUBSCRIPTION_CHARGE_MOMENT = 'subscriptionChargeMoment',
    OTHER = 'other',
}

export enum BuyWhen {
    ON_RESERVATION = 'onReservation',
    IN_ADVANCE = 'inAdvance',
    IN_ADVANCE_ONLY = 'inAdvanceOnly',
    BEFORE_BOARDING = 'beforeBoarding',
    BEFORE_BOARDING_ONLY = 'beforeBoardingOnly',
    ON_BOARDING = 'onBoarding',
    ON_BOARDING_ONLY = 'onBoardingOnly',
    AFTER_BOARDING = 'afterBoarding',
    ON_CHECK_IN = 'onCheckIn',
    ON_CHECK_OUT = 'onCheckOut',
    SUBSCRIPTION_ONLY = 'subscriptionOnly',
    OTHER = 'other',
}

export enum BookingAccess {
    PUBLIC_ACCESS = 'publicAccess',
    AUTHORISED_PUBLIC = 'authorisedPublic',
    STAFF = 'staff',
    OTHER = 'other',
}

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
