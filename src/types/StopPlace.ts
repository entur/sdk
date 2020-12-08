import { MultilingualString } from './MultilingualString'
import { TransportMode, TransportSubmode } from '../types/Mode'

import { Quay } from '../fields/Quay'

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

export type LimitationStatusType = 'FALSE' | 'TRUE' | 'PARTIAL' | 'UNKNOWN'

export type WaitingRoomEquipment = {
    id: string
}

export type ShelterEquipment = {
    id: string
}

export type SanitaryEquipment = {
    id: string
    numberOfToilets: number
    gender: 'both' | 'femaleOnly' | 'maleOnly' | 'sameSexOnly'
}

export type TicketingEquipment = {
    id: string
    ticketOffice: boolean
    ticketMachines: boolean
    numberOfMachines: number
}

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

export interface StopPlaceFacilitiesParking {
    name: MultilingualString
    parentSiteRef: string
    totalCapacity?: number
    principalCapacity?: number
    parkingVehicleTypes?: ParkingVehicle[]
}

export interface StopPlaceFacilities {
    stopPlace: StopPlaceFacilitiesStopPlace[]
    parking: StopPlaceFacilitiesParking[]
}
