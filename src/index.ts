import 'regenerator-runtime/runtime'

import createEnturClient from './client'
export type { EnturClient, EnturService } from './client'

export {
    convertFeatureToLocation,
    convertPositionToBbox,
    throttler,
} from './utils'

export * as JourneyPlannerTypes from './journeyPlanner/types'

export * as GeocoderTypes from './geocoder/types'
export type { GeocoderClient } from './geocoder'

export * as MobilityTypes from './mobility/types'
export type { MobilityClient } from './mobility'

export * as NsrTypes from './nsr/types'
export type { NsrClient } from './nsr'

export { TypeName } from './nearest/types'
export type { NearestPlace } from './nearest/types'

export { getTripPatternsQuery } from './trip'
export type {
    TripPattern,
    GetTripPatternsParams,
    InputWhiteListed,
    InputBanned,
    TransportSubmodeParam,
} from './trip'

export * from './constants/featureCategory'

export { journeyPlannerQuery, nsrQuery } from './api'

export type { DeparturesById } from './departure'
export { County } from './geocoderLegacy/countyIds'
export type {
    GetFeaturesParams,
    GetFeaturesReverseParam,
} from './geocoderLegacy'

export default createEnturClient

export type { Authority } from './fields/Authority'
export type { BikeRentalStation } from './fields/BikeRentalStation'
export type {
    BookingMethod,
    BookingContact,
    BookingAccess,
    BookingArrangement,
    BookWhen,
} from './fields/BookingArrangement'
export type { Departure } from './fields/Departure'
export type {
    EstimatedCall,
    IntermediateEstimatedCall,
} from './fields/EstimatedCall'
export type { Interchange } from './fields/Interchange'
export type { Leg } from './fields/Leg'
export type { Line } from './fields/Line'
export type { Notice } from './fields/Notice'
export type { Operator } from './fields/Operator'
export type { Place } from './fields/Place'
export type { PointsOnLink } from './fields/PointsOnLink'
export type { Quay } from './fields/Quay'
export type { ServiceJourney } from './fields/ServiceJourney'
export type {
    Situation,
    ReportType,
    ValidityPeriod,
    InfoLink,
} from './fields/Situation'
export type { StopPlace } from './fields/StopPlace'

export type { Coordinates } from './types/Coordinates'
export type { DestinationDisplay } from './types/DestinationDisplay'
export type { Feature } from './types/Feature'
export type { FlexibleLineType } from './types/FlexibleLineType'
export * from './types/Mode'
export type { Location } from './types/Location'
export type { MultilingualString } from './types/MultilingualString'
export type {
    StopPlaceDetails,
    LimitationStatusType,
    WaitingRoomEquipment,
    ShelterEquipment,
    SanitaryEquipment,
    TicketingEquipment,
    StopPlaceFacilitiesStopPlace,
    StopPlaceFacilitiesParking,
    ParkingVehicle,
    StopPlaceFacilities,
} from './types/StopPlace'
