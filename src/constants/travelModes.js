// Any for of public transportation
export const AIR = 'air'
export const BICYCLE = 'bicycle'
export const BUS = 'bus'
export const CABLEWAY = 'cableway'
export const CAR = 'car'
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


export const isAir = mode => mode === AIR
export const isBicycle = mode => mode === BICYCLE
export const isBus = mode => mode === BUS
export const isCableway = mode => mode === CABLEWAY
export const isCar = mode => mode === CAR
export const isWater = mode => mode === WATER
export const isFunicular = mode => mode === FUNICULAR
export const isLift = mode => mode === LIFT
export const isRail = mode => mode === RAIL
export const isMetro = mode => mode === METRO
export const isTram = mode => mode === TRAM
export const isTransit = mode => mode === TRANSIT
export const isFoot = mode => mode === FOOT
export const isCarPark = mode => mode === CAR_PARK
export const isCarPickup = mode => mode === CAR_PICKUP
