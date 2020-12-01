export enum TransportMode {
    AIR = 'air',
    BUS = 'bus',
    CABLEWAY = 'cableway',
    CAR = 'car',
    COACH = 'coach',
    FUNICULAR = 'funicular',
    LIFT = 'lift',
    METRO = 'metro',
    RAIL = 'rail',
    TRAM = 'tram',
    UNKNOWN = 'unknown',
    WATER = 'water',
}

export enum TransportSubmode {
    AIRPORT_LINK_BUS = 'airportLinkBus',
    AIRPORT_LINK_RAIL = 'airportLinkRail',
    CITY_TRAM = 'cityTram',
    DOMESTIC_FLIGHT = 'domesticFlight',
    EXPRESS_BUS = 'expressBus',
    FUNICULAR = 'funicular',
    HELICOPTER_SERVICE = 'helicopterService',
    HIGH_SPEED_PASSENGER_SERVICE = 'highSpeedPassengerService',
    HIGH_SPEED_VEHICLE_SERVICE = 'highSpeedVehicleService',
    INTERNATIONAL = 'international',
    INTERNATIONAL_CAR_FERRY = 'internationalCarFerry',
    INTERNATIONAL_COACH = 'internationalCoach',
    INTERNATIONAL_FLIGHT = 'internationalFlight',
    INTERNATIONAL_PASSENGER_FERRY = 'internationalPassengerFerry',
    INTERREGIONAL_RAIL = 'interregionalRail',
    LOCAL = 'local',
    LOCAL_BUS = 'localBus',
    LOCAL_CAR_FERRY = 'localCarFerry',
    LOCAL_PASSENGER_FERRY = 'localPassengerFerry',
    LOCAL_TRAM = 'localTram',
    LONG_DISTANCE = 'longDistance',
    METRO = 'metro',
    NATIONAL_CAR_FERRY = 'nationalCarFerry',
    NATIONAL_COACH = 'nationalCoach',
    NIGHT_BUS = 'nightBus',
    NIGHT_RAIL = 'nightRail',
    RAIL_REPLACEMENT_BUS = 'railReplacementBus',
    REGIONAL_BUS = 'regionalBus',
    REGIONAL_CAR_FERRY = 'regionalCarFerry',
    REGIONAL_RAIL = 'regionalRail',
    SCHOOL_BUS = 'schoolBus',
    SHUTTLE_BUS = 'shuttleBus',
    SIGHTSEEING_BUS = 'sightseeingBus',
    SIGHTSEEING_SERVICE = 'sightseeingService',
    TELECABIN = 'telecabin',
    TOURIST_RAILWAY = 'touristRailway',
}

export enum LegMode {
    AIR = 'air',
    BICYCLE = 'bicycle',
    BUS = 'bus',
    CABLEWAY = 'cableway',
    CAR = 'car',
    COACH = 'coach',
    FOOT = 'foot',
    FUNICULAR = 'funicular',
    LIFT = 'lift',
    METRO = 'metro',
    RAIL = 'rail',
    TRAM = 'tram',
    UNKNOWN = 'unknown',
    WATER = 'water',
}

/**
 * All valid values for the "mode" parameter to JourneyPlanner
 */
export enum QueryMode {
    AIR = 'air',
    BICYCLE = 'bicycle',
    BUS = 'bus',
    CABLEWAY = 'cableway',
    CAR = 'car',
    CAR_DROPOFF = 'car_dropoff',
    CAR_PARK = 'car_park',
    CAR_PICKUP = 'car_pickup',
    COACH = 'coach',
    FOOT = 'foot',
    FUNICULAR = 'funicular',
    LIFT = 'lift',
    METRO = 'metro',
    RAIL = 'rail',
    TRAM = 'tram',
    TRANSIT = 'transit',
    WATER = 'water',
}

/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const AIR = QueryMode.AIR
/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const BICYCLE = QueryMode.BICYCLE
/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const BUS = QueryMode.BUS
/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const CABLEWAY = QueryMode.CABLEWAY
/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const CAR = QueryMode.CAR
/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const COACH = QueryMode.COACH
/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const WATER = QueryMode.WATER
/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const FUNICULAR = QueryMode.FUNICULAR
/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const LIFT = QueryMode.LIFT
/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const RAIL = QueryMode.RAIL
/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const METRO = QueryMode.METRO
/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const TRAM = QueryMode.TRAM
/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const FOOT = QueryMode.FOOT
/** @deprecated Use QueryMode, LegMode or TransportMode enum instead */
export const TRANSIT = QueryMode.TRANSIT

/** @deprecated Use QueryMode.CAR_PARK enum instead */
export const CAR_PARK = QueryMode.CAR_PARK
/** @deprecated Use QueryMode.CAR_PICKUP enum instead */
export const CAR_PICKUP = QueryMode.CAR_PICKUP
/** @deprecated Use QueryMode.CAR_DROPOFF enum instead */
export const CAR_DROPOFF = QueryMode.CAR_DROPOFF

/** @deprecated Use TransportSubmode.AIRPORT_LINK_RAIL instead */
export const AIRPORT_LINK_RAIL = TransportSubmode.AIRPORT_LINK_RAIL
/** @deprecated Use TransportSubmode.HIGH_SPEED_PASSENGER_SERVICE instead */
export const HIGH_SPEED_PASSENGER_SERVICE =
    TransportSubmode.HIGH_SPEED_PASSENGER_SERVICE
/** @deprecated Use TransportSubmode.HIGH_SPEED_VEHICLE_SERVICE instead */
export const HIGH_SPEED_VEHICLE_SERVICE =
    TransportSubmode.HIGH_SPEED_VEHICLE_SERVICE
/** @deprecated Use TransportSubmode.INTERNATIONAL_CAR_FERRY instead */
export const INTERNATIONAL_CAR_FERRY = TransportSubmode.INTERNATIONAL_CAR_FERRY
/** @deprecated Use TransportSubmode.LOCAL_CAR_FERRY instead */
export const LOCAL_CAR_FERRY = TransportSubmode.LOCAL_CAR_FERRY
/** @deprecated Use TransportSubmode.LOCAL_PASSENGER_FERRY instead */
export const LOCAL_PASSENGER_FERRY = TransportSubmode.LOCAL_PASSENGER_FERRY
/** @deprecated Use TransportSubmode.NATIONAL_CAR_FERRY instead */
export const NATIONAL_CAR_FERRY = TransportSubmode.NATIONAL_CAR_FERRY
/** @deprecated Use TransportSubmode.RAIL_REPLACEMENT_BUS instead */
export const RAIL_REPLACEMENT_BUS = TransportSubmode.RAIL_REPLACEMENT_BUS
/** @deprecated Use TransportSubmode.REGIONAL_CAR_FERRY instead */
export const REGIONAL_CAR_FERRY = TransportSubmode.REGIONAL_CAR_FERRY
/** @deprecated Use TransportSubmode.TOURIST_RAILWAY instead */
export const TOURIST_RAILWAY = TransportSubmode.TOURIST_RAILWAY
/** @deprecated Use TransportSubmode.AIRPORT_LINK_BUS instead */
export const AIRPORT_LINK_BUS = TransportSubmode.AIRPORT_LINK_BUS
/** @deprecated Use TransportSubmode.CITY_TRAM instead */
export const CITY_TRAM = TransportSubmode.CITY_TRAM

/** @deprecated Implement your own equality check */
export const isAir = (mode: string): boolean => mode === AIR
/** @deprecated Implement your own equality check */
export const isBicycle = (mode: string): boolean => mode === BICYCLE
/** @deprecated Implement your own equality check */
export const isBus = (mode: string): boolean => mode === BUS
/** @deprecated Implement your own equality check */
export const isCableway = (mode: string): boolean => mode === CABLEWAY
/** @deprecated Implement your own equality check */
export const isCar = (mode: string): boolean => mode === CAR
/** @deprecated Implement your own equality check */
export const isCoach = (mode: string): boolean => mode === COACH
/** @deprecated Implement your own equality check */
export const isWater = (mode: string): boolean => mode === WATER
/** @deprecated Implement your own equality check */
export const isFunicular = (mode: string): boolean => mode === FUNICULAR
/** @deprecated Implement your own equality check */
export const isLift = (mode: string): boolean => mode === LIFT
/** @deprecated Implement your own equality check */
export const isRail = (mode: string): boolean => mode === RAIL
/** @deprecated Implement your own equality check */
export const isMetro = (mode: string): boolean => mode === METRO
/** @deprecated Implement your own equality check */
export const isTram = (mode: string): boolean => mode === TRAM
/** @deprecated Implement your own equality check */
export const isTransit = (mode: string): boolean => mode === TRANSIT
/** @deprecated Implement your own equality check */
export const isFoot = (mode: string): boolean => mode === FOOT
/** @deprecated Implement your own equality check */
export const isCarPark = (mode: string): boolean => mode === CAR_PARK
/** @deprecated Implement your own equality check */
export const isCarPickup = (mode: string): boolean => mode === CAR_PICKUP
