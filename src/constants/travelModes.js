// @flow

// Any for of public transportation
export const AIR = 'air'
export const BICYCLE = 'bicycle'
export const BUS = 'bus'
export const CABLEWAY = 'cableway'
export const CAR = 'car'
export const COACH = 'coach'
export const WATER = 'water'
export const FUNICULAR = 'funicular'
export const LIFT = 'lift'
export const RAIL = 'rail'
export const METRO = 'metro'
export const TRAM = 'tram'
export const TRANSIT = 'transit'
export const FOOT = 'foot'

// Combine with foot and transit for park and ride.
export const CAR_PARK = 'car_park'

// Combine with foot and transit for ride and kiss
export const CAR_PICKUP = 'car_pickup'

export const AIRPORT_LINK_RAIL = 'airportLinkRail'
export const HIGH_SPEED_PASSENGER_SERVICE = 'highSpeedPassengerService'
export const HIGH_SPEED_VEHICLE_SERVICE = 'highSpeedVehicleService'
export const INTERNATIONAL_CAR_FERRY = 'internationalCarFerry'
export const LOCAL_CAR_FERRY = 'localCarFerry'
export const LOCAL_PASSENGER_FERRY = 'localPassengerFerry'
export const NATIONAL_CAR_FERRY = 'nationalCarFerry'
export const RAIL_REPLACEMENT_BUS = 'railReplacementBus'
export const REGIONAL_CAR_FERRY = 'regionalCarFerry'
export const TOURIST_RAILWAY = 'touristRailway'


export const TransportMode = {
    BUS,
    TRAM,
    RAIL,
    METRO,
    WATER,
    AIR,
    COACH,
}

export const LegMode = {
    ...TransportMode,
    FOOT,
    BICYCLE,
}

export const TransportSubmode = {
    AIRPORT_LINK_RAIL,
    HIGH_SPEED_PASSENGER_SERVICE,
    HIGH_SPEED_VEHICLE_SERVICE,
    INTERNATIONAL_CAR_FERRY,
    LOCAL_CAR_FERRY,
    LOCAL_PASSENGER_FERRY,
    NATIONAL_CAR_FERRY,
    RAIL_REPLACEMENT_BUS,
    REGIONAL_CAR_FERRY,
    TOURIST_RAILWAY,
}

export const isAir = (mode: string): boolean => mode === AIR
export const isBicycle = (mode: string): boolean => mode === BICYCLE
export const isBus = (mode: string): boolean => mode === BUS
export const isCableway = (mode: string): boolean => mode === CABLEWAY
export const isCar = (mode: string): boolean => mode === CAR
export const isCoach = (mode: string): boolean => mode === COACH
export const isWater = (mode: string): boolean => mode === WATER
export const isFunicular = (mode: string): boolean => mode === FUNICULAR
export const isLift = (mode: string): boolean => mode === LIFT
export const isRail = (mode: string): boolean => mode === RAIL
export const isMetro = (mode: string): boolean => mode === METRO
export const isTram = (mode: string): boolean => mode === TRAM
export const isTransit = (mode: string): boolean => mode === TRANSIT
export const isFoot = (mode: string): boolean => mode === FOOT
export const isCarPark = (mode: string): boolean => mode === CAR_PARK
export const isCarPickup = (mode: string): boolean => mode === CAR_PICKUP
