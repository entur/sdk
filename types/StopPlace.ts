import { MultilingualString } from './MultilingualString'
import { TransportMode, TransportSubmode } from './Mode'

import { Quay } from '../src/fields/Quay'

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
    quays?: Array<Quay>
}

type LimitationStatusType = 'FALSE' | 'TRUE' | 'PARTIAL' | 'UNKNOWN'

type WaitingRoomEquipment = {
    id: string
}

type ShelterEquipment = {
    id: string
}

type SanitaryEquipment = {
    id: string
    numberOfToilets: number
    gender: 'both' | 'femaleOnly' | 'maleOnly' | 'sameSexOnly'
}

type TicketingEquipment = {
    id: string
    ticketOffice: boolean
    ticketMachines: boolean
    numberOfMachines: number
}

type ParkingVehicle =
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

interface StopPlaceFacilitiesStopPlace {
    id: string
    name: MultilingualString
    accessibilityAssessment: {
        limitations: {
            wheelchairAccess: LimitationStatusType
            stepFreeAccess: LimitationStatusType
        }
    }
    placeEquipments: {
        waitingRoomEquipment?: Array<WaitingRoomEquipment>
        shelterEquipment?: Array<ShelterEquipment>
        sanitaryEquipment?: Array<SanitaryEquipment>
        ticketingEquipment?: Array<TicketingEquipment>
    }
}

interface StopPlaceFacilitiesParking {
    name: MultilingualString
    parentSiteRef: string
    totalCapacity?: number
    principalCapacity?: number
    parkingVehicleTypes?: Array<ParkingVehicle>
}

export interface StopPlaceFacilities {
    stopPlace: Array<StopPlaceFacilitiesStopPlace>
    parking: Array<StopPlaceFacilitiesParking>
}
