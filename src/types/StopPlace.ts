import { MultilingualString } from './MultilingualString'
import { TransportMode, TransportSubmode } from '../types/Mode'

import { Quay } from '../fields/Quay'

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface StopPlaceDetails {
    id: string
    name: string
    description?: string
    latitude: number
    longitude: number
    wheelchairBoarding: 'noInformation' | 'possible' | 'notPossible'
    weighting:
        | 'preferredInterchange'
        | 'recommendedInterchange'
        | 'interchangeAllowed'
        | 'noInterchange'
    transportMode: TransportMode
    transportSubmode?: TransportSubmode
    quays?: Quay[]
}

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export type LimitationStatusType = 'FALSE' | 'TRUE' | 'PARTIAL' | 'UNKNOWN'

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export type WaitingRoomEquipment = {
    id: string
}

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export type ShelterEquipment = {
    id: string
}

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export type SanitaryEquipment = {
    id: string
    numberOfToilets: number
    gender: 'both' | 'femaleOnly' | 'maleOnly' | 'sameSexOnly'
}

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export type TicketingEquipment = {
    id: string
    ticketOffice: boolean
    ticketMachines: boolean
    numberOfMachines: number
}

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export type ParkingVehicle =
    | 'pedalCycle'
    | 'moped'
    | 'motorcycle'
    | 'motorcycleWithSidecar'
    | 'motorScooter'
    | 'twoWheeledVehicle'
    | 'threeWheeledVehicle'
    | 'car'
    | 'smallCar'
    | 'passengerCar'
    | 'largeCar'
    | 'fourWheelDrive'
    | 'taxi'
    | 'camperCar'
    | 'carWithTrailer'
    | 'carWithCaravan'
    | 'minibus'
    | 'bus'
    | 'van'
    | 'largeVan'
    | 'highSidedVehicle'
    | 'lightGoodsVehicle'
    | 'heavyGoodsVehicle'
    | 'truck'
    | 'agriculturalVehicle'
    | 'tanker'
    | 'tram'
    | 'articulatedVehicle'
    | 'vehicleWithTrailer'
    | 'lightGoodsVehicleWithTrailer'
    | 'heavyGoodsVehicleWithTrailer'
    | 'undefined'
    | 'other'
    | 'allPassengerVehicles'
    | 'all'

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface StopPlaceFacilitiesStopPlace {
    id: string
    name: MultilingualString
    accessibilityAssessment: {
        limitations: {
            wheelchairAccess: LimitationStatusType
            stepFreeAccess: LimitationStatusType
        }
    }
    placeEquipments: {
        waitingRoomEquipment?: WaitingRoomEquipment[]
        shelterEquipment?: ShelterEquipment[]
        sanitaryEquipment?: SanitaryEquipment[]
        ticketingEquipment?: TicketingEquipment[]
    }
}

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface StopPlaceFacilitiesParking {
    name: MultilingualString
    parentSiteRef: string
    totalCapacity?: number
    principalCapacity?: number
    parkingVehicleTypes?: ParkingVehicle[]
}

/**
 * @deprecated
 * The JourneyPlanner v2 queries and types are deprecated.
 * Write your own GraphQL queries for JourneyPlanner v3.
 * Write your own types or use those from JourneyPlannerTypes where applicable.
 */
export interface StopPlaceFacilities {
    stopPlace: StopPlaceFacilitiesStopPlace[]
    parking: StopPlaceFacilitiesParking[]
}
