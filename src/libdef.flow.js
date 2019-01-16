// @flow
/* eslint-disable max-len */

/**
 * Commons
 */

type $entur$sdk$Config = {
    clientName: string,
    hosts?: {
        journeyPlanner?: string,
        geocoder?: string,
        nsr?: string,
    }
}

type $entur$sdk$Coordinates = {
    latitude: number,
    longitude: number,
}

type $entur$sdk$MultilingualString = {
    lang: string,
    value: string,
}

type $entur$sdk$Notice = {|
    text: string,
|}

type $entur$sdk$ReportType = 'general' | 'incident' | null

type $entur$sdk$ServiceConfig = {
    clientName: string,
    hosts: {
        journeyplanner: string,
        geocoder: string,
        nsr: string,
    },
}

type $entur$sdk$ValidityPeriod = { startTime: string, endTime: string }

type $entur$sdk$Situation = {|
    situationNumber: string,
    summary: Array<$entur$sdk$MultilingualString>,
    description: Array<$entur$sdk$MultilingualString>,
    detail: Array<$entur$sdk$MultilingualString>,
    validityPeriod: $entur$sdk$ValidityPeriod,
    reportType: $entur$sdk$ReportType,
|}


/**
 * Bike rental
 */

type $entur$sdk$BikeRentalStation = {
     id: string,
     name: string,
     bikesAvailable: number,
     spacesAvailable: number,
     longitude: number,
     latitude: number,
 }


/**
 * Geocoder
 */

type $entur$sdk$Category =
    | 'onstreetBus'
    | 'onstreetTram'
    | 'airport'
    | 'railStation'
    | 'metroStation'
    | 'busStation'
    | 'coachStation'
    | 'tramStation'
    | 'harbourPort'
    | 'ferryPort'
    | 'ferryStop'
    | 'liftStation'
    | 'vehicleRailInterchange'
    | 'other'
    | 'GroupOfStopPlaces'
    | 'poi'
    | 'Vegadresse'
    | 'street'
    | 'tettsteddel'
    | 'bydel'

type $entur$sdk$GetFeaturesParams = {
    'boundary.rect.min_lon'?: number,
    'boundary.rect.max_lon'?: number,
    'boundary.rect.min_lat'?: number,
    'boundary.rect.max_lat'?: number,
    'boundary.country'?: string,
    sources?: Array<string>,
    layers?: Array<string>,
    limit?: number,
}

type $entur$sdk$Feature = {
    geometry: {
        coordinates: [number, number], // longitude, latitude
        type: 'Point',
    },
    properties: {
        id: string,
        name: string,
        label?: string,
        borough: string,
        accuracy: 'point',
        layer: 'venue' | 'address',
        borough_gid: string,
        category: Array<$entur$sdk$Category>,
        country_gid: string,
        county: string,
        county_gid: string,
        gid: string,
        housenumber?: string,
        locality: string,
        locality_gid: string,
        postalcode: string,
        source: string,
        source_id: string,
        street: string,
    }
}

type $entur$sdk$Location = {
    name: string,
    place?: string,
    coordinates?: $entur$sdk$Coordinates,
}


/**
 * Trip
 */

type $entur$sdk$Authority = {
    id: string,
    name: string,
    url?: string,
}

type $entur$sdk$Operator = {
    id: string,
    name: string,
    url?: string,
}

type $entur$sdk$Quay = {
    id: string,
    name: string,
    description?: string,
    publicCode?: string,
}

type $entur$sdk$StopPlace = {
    id: string,
    name: string,
    latitude: number,
    longitude: number,
    description: string,
    wheelchairBoarding: boolean,
    weighting: any,
    transportMode: Array<string>,
    transportSubmode: string,
    quays: Array<$entur$sdk$Quay>,
}

type $entur$sdk$Place = {
    latitude: number,
    longitude: number,
    name: string,
    quay?: $entur$sdk$Quay & {
        stopPlace: $entur$sdk$StopPlace
    },
}

type $entur$sdk$TransportMode =
    | 'air'
    | 'bus'
    // | 'cableway'
    | 'water'
    // | 'funicular'
    // | 'lift'
    | 'rail'
    | 'metro'
    | 'tram'
    | 'coach'
    | 'car'
    // | 'unknown'

type $entur$sdk$LegMode =
    | $entur$sdk$TransportMode
    | 'bicycle'
    | 'foot'
    // | 'transit'
    // | 'car_park'
    // | 'car_pickup'

type $entur$sdk$TransportSubmode =
    | 'airportLinkRail'
    | 'highSpeedPassengerService'
    | 'highSpeedVehicleService'
    | 'internationalCarFerry'
    | 'localCarFerry'
    | 'localPassengerFerry'
    | 'nationalCarFerry'
    | 'railReplacementBus'
    | 'regionalCarFerry'
    | 'touristRailway'
    | 'airportLinkBus'
    | 'cityTram'

type $entur$sdk$DestinationDisplay = {
    frontText: string
}

type $entur$sdk$EstimatedCall = {
    date: string,
    destinationDisplay: $entur$sdk$DestinationDisplay,
    forAlighting: boolean,
    forBoarding: boolean,
    notices?: Array<$entur$sdk$Notice>,
    requestStop: boolean
}

type $entur$sdk$IntermediateEstimatedCall = {
    actualArrivalTime?: string, // Only available AFTER arrival has taken place
    actualDepartureTime?: string, // Only available AFTER departure has taken place
    aimedArrivalTime: string,
    aimedDepartureTime: string,
    cancellation: boolean,
    date: string,
    destinationDisplay: $entur$sdk$DestinationDisplay,
    expectedArrivalTime?: string, // Only available BEFORE arrival has taken place
    expectedDepartureTime?: string, // Only available BEFORE departure has taken place
    forAlighting: boolean,
    forBoarding: boolean,
    notices?: Array<$entur$sdk$Notice>,
    quay?: $entur$sdk$Quay,
    requestStop: boolean
}

type $entur$sdk$Line = {
    id: string,
    name: string,
    notices?: Array<$entur$sdk$Notice>,
    publicCode: string,
}

type $entur$sdk$PointsOnLink = {
    points: string,
    length: number,
}

type $entur$sdk$JourneyPattern = {
    line: {
        notices?: Array<$entur$sdk$Notice>,
    },
    notices?: Array<$entur$sdk$Notice>,
}

type $entur$sdk$ServiceJourney = {
    id: string,
    journeyPattern?: $entur$sdk$JourneyPattern,
    notices?: Array<$entur$sdk$Notice>,
    publicCode?: string,
    transportSubmode?: $entur$sdk$TransportSubmode,
}

type $entur$sdk$Leg = {
    aimedEndTime: string,
    aimedStartTime: string,
    authority?: $entur$sdk$Authority,
    distance: number,
    duration: number,
    expectedEndTime: string,
    expectedStartTime: string,
    fromEstimatedCall?: $entur$sdk$EstimatedCall,
    fromPlace: $entur$sdk$Place,
    intermediateEstimatedCalls: Array<$entur$sdk$IntermediateEstimatedCall>,
    line?: $entur$sdk$Line,
    mode: $entur$sdk$LegMode,
    notices?: Array<$entur$sdk$Notice>,
    operator?: $entur$sdk$Operator,
    pointsOnLink: $entur$sdk$PointsOnLink,
    realtime: boolean,
    ride: boolean,
    serviceJourney: $entur$sdk$ServiceJourney,
    situations?: Array<$entur$sdk$Situation>,
    toEstimatedCall?: $entur$sdk$EstimatedCall,
    toPlace: $entur$sdk$Place,
    transportSubmode: $entur$sdk$TransportSubmode,
}

type $entur$sdk$TransportSubmodeParam = {
    transportMode: $entur$sdk$TransportMode,
    transportSubmodes: Array<$entur$sdk$TransportSubmode>,
}

type $entur$sdk$GetTripPatternsParams = {
    searchDate?: Date,
    arriveBy?: boolean,
    modes?: Array<$entur$sdk$LegMode>,
    transportSubmodes?: Array<$entur$sdk$TransportSubmodeParam>,
    limit?: number,
    wheelchairAccessible?: boolean,
}

type $entur$sdk$TripPattern = {
    distance: number,
    duration: number,
    endTime: string,
    legs: Array<$entur$sdk$Leg>,
    startTime: string,
    walkDistance: number,
}

type $entur$sdk$Departure = {
    date: string,
    forBoarding: boolean,
    requestStop: boolean,
    forAlighting: boolean,
    destinationDisplay: $entur$sdk$DestinationDisplay,
    notices?: Array<$entur$sdk$Notice>,
    aimedDepartureTime: string,
    expectedDepartureTime: string,
    realtime: boolean,
    situations?: Array<$entur$sdk$Situation>,
    quay: $entur$sdk$Quay,
    serviceJourney: $entur$sdk$ServiceJourney & {
        line: $entur$sdk$Line & {
            transportMode: $entur$sdk$TransportMode,
            description?: string
        }
    }
}

type $entur$sdk$QuayDepartures = {
    id: string,
    estimatedCalls: Array<$entur$sdk$Departure>
}

type $entur$sdk$StopPlaceDepartures = {
    id: string,
    estimatedCalls: Array<$entur$sdk$Departure>
}

type $entur$sdk$GetDeparturesParams = {
    includeNonBoarding?: boolean,
    limit?: number,
    departures?: number, // deprecated
    timeRange?: number,
}


/**
 * Stop Place
 */

type $entur$sdk$StopPlaceDetails = {
    id: string,
    name: string,
    description?: string,
    latitude: number,
    longitude: number,
    wheelchairBoarding: 'noInformation' | 'possible' | 'notPossible',
    weighting: 'preferredInterchange' | 'recommendedInterchange' | 'interchangeAllowed' | 'noInterchange',
    transportMode: $entur$sdk$TransportMode,
    transportSubmode?: $entur$sdk$TransportSubmode,
    quays?: Array<$entur$sdk$Quay & { situations?: Array<$entur$sdk$Situation> }>
}

type $entur$sdk$LimitationStatusType = 'FALSE' | 'TRUE' | 'PARTIAL' | 'UNKNOWN'

type $entur$sdk$WaitingRoomEquipment = {
    id: string,
}

type $entur$sdk$ShelterEquipment = {
    id: string,
}

type $entur$sdk$SanitaryEquipment = {
    id: string,
    numberOfToilets: number,
    gender: 'both' | 'femaleOnly' | 'maleOnly' | 'sameSexOnly',
}

type $entur$sdk$TicketingEquipment = {
    id: string,
    ticketOffice: boolean,
    ticketMachines: boolean,
    numberOfMachines: number,
}

type $entur$sdk$ParkingVehicle =
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

type $entur$sdk$StopPlaceFacilitiesStopPlace = {
    id: string,
    name: $entur$sdk$MultilingualString,
    accessibilityAssessment: {
        limitations: {
            wheelchairAccess: $entur$sdk$LimitationStatusType,
            stepFreeAccess: $entur$sdk$LimitationStatusType,
        }
    },
    placeEquipments: {
        waitingRoomEquipment?: Array<$entur$sdk$WaitingRoomEquipment>,
        shelterEquipment?: Array<$entur$sdk$ShelterEquipment>,
        sanitaryEquipment?: Array<$entur$sdk$SanitaryEquipment>,
        ticketingEquipment?: Array<$entur$sdk$TicketingEquipment>,
    }
}

type $entur$sdk$StopPlaceFacilitiesParking = {
    name: $entur$sdk$MultilingualString,
    parentSiteRef: string,
    totalCapacity?: number,
    principalCapacity?: number,
    parkingVehicleTypes?: Array<$entur$sdk$ParkingVehicle>
}

type $entur$sdk$StopPlaceFacilities = {
    stopPlace: Array<$entur$sdk$StopPlaceFacilitiesStopPlace>,
    parking: Array<$entur$sdk$StopPlaceFacilitiesParking>,
}

type $entur$sdk$GetQuaysForStopPlaceParams = {
    filterByInUse?: boolean
}

declare module '@entur/sdk' {
    declare export default class EnturService {
        constructor(config?: $entur$sdk$Config): EnturService;

        journeyPlannerQuery<$entur$sdk$journeyPlannerResponse>(
            queryObj: Object | string,
            variables?: Object,
            ignoreFields?: Array<string>,
            config?: $entur$sdk$ServiceConfig,
        ): Promise<$entur$sdk$journeyPlannerResponse>,

        nsrQuery<$entur$sdk$nsrResponse>(
            queryObj: Object | string,
            variables?: Object,
            ignoreFields?: Array<string>,
            config?: $entur$sdk$ServiceConfig,
        ): Promise<$entur$sdk$nsrResponse>,

        getFeatures(
            query: string,
            coords?: $entur$sdk$Coordinates,
            params?: $entur$sdk$GetFeaturesParams,
        ): Promise<Array<$entur$sdk$Feature>>,

        getTripPatterns(
            from: $entur$sdk$Location,
            to: $entur$sdk$Location,
            params?: $entur$sdk$GetTripPatternsParams,
            ignoreFields?: Array<string>,
        ): Promise<Array<$entur$sdk$TripPattern>>,

        findTrips(
            from: string,
            to: string,
            date?: Date | string | number
        ): Promise<Array<$entur$sdk$TripPattern>>,

        getDeparturesForStopPlaces(
            stopPlaceIds: Array<string>,
            params?: $entur$sdk$GetDeparturesParams,
        ): Promise<Array<$entur$sdk$StopPlaceDepartures>>,

        getDeparturesForStopPlace(
            stopPlaceId: string,
            params?: $entur$sdk$GetDeparturesParams,
        ): Promise<Array<$entur$sdk$Departure>>,

        getDeparturesForQuays(
            quayIds: Array<string>,
            params?: $entur$sdk$GetDeparturesParams,
        ): Promise<Array<$entur$sdk$QuayDepartures>>,

        getStopPlace(stopPlaceId: string): Promise<$entur$sdk$StopPlaceDetails>,

        getStopPlacesByPosition(
            coordinates: $entur$sdk$Coordinates,
            distance?: number
        ): Promise<Array<$entur$sdk$StopPlaceDetails>>,

        getStopPlaceFacilities(stopPlaceId: string): Promise<$entur$sdk$StopPlaceFacilities>,

        getQuaysForStopPlace(
            stopPlaceId: string,
            params?: $entur$sdk$GetQuaysForStopPlaceParams,
        ): Promise<Array<$entur$sdk$Quay>>,

        getBikeRentalStation(stationId: string): Promise<$entur$sdk$BikeRentalStation>,

        getBikeRentalStationsByPosition(
            coordinates: $entur$sdk$Coordinates,
            distance?: number
        ): Promise<Array<$entur$sdk$BikeRentalStation>>,
    }

    /**
     * Constants
     */

    // Any for of public transportation
    declare export var AIR: 'air'
    declare export var BICYCLE: 'bicycle'
    declare export var BUS: 'bus'
    declare export var CABLEWAY: 'cableway'
    declare export var CAR: 'car'
    declare export var COACH: 'coach'
    declare export var WATER: 'water'
    declare export var FUNICULAR: 'funicular'
    declare export var LIFT: 'lift'
    declare export var RAIL: 'rail'
    declare export var METRO: 'metro'
    declare export var TRAM: 'tram'
    declare export var TRANSIT: 'transit'
    declare export var FOOT: 'foot'

    // Combine with foot and transit for park and ride.
    declare export var CAR_PARK: 'car_park'

    // Combine with foot and transit for ride and kiss
    declare export var CAR_PICKUP: 'car_pickup'

    declare export var AIRPORT_LINK_RAIL: 'airportLinkRail'
    declare export var HIGH_SPEED_PASSENGER_SERVICE: 'highSpeedPassengerService'
    declare export var HIGH_SPEED_VEHICLE_SERVICE: 'highSpeedVehicleService'
    declare export var INTERNATIONAL_CAR_FERRY: 'internationalCarFerry'
    declare export var LOCAL_CAR_FERRY: 'localCarFerry'
    declare export var LOCAL_PASSENGER_FERRY: 'localPassengerFerry'
    declare export var NATIONAL_CAR_FERRY: 'nationalCarFerry'
    declare export var RAIL_REPLACEMENT_BUS: 'railReplacementBus'
    declare export var REGIONAL_CAR_FERRY: 'regionalCarFerry'
    declare export var TOURIST_RAILWAY: 'touristRailway'
    declare export var AIRPORT_LINK_BUS: 'airportLinkBus'

    declare export var TransportMode: {
        BUS: 'bus',
        TRAM: 'tram',
        RAIL: 'rail',
        METRO: 'metro',
        WATER: 'water',
        AIR: 'air',
        COACH: 'coach',
        CAR: 'car',
    }

    declare export var LegMode: {
        BUS: 'bus',
        TRAM: 'tram',
        RAIL: 'rail',
        METRO: 'metro',
        WATER: 'water',
        AIR: 'air',
        COACH: 'coach',
        CAR: 'car',
        FOOT: 'foot',
        BICYCLE: 'bicycle',
    }

    declare export var TransportSubmode: {
        AIRPORT_LINK_RAIL: 'airportLinkRail',
        HIGH_SPEED_PASSENGER_SERVICE: 'highSpeedPassengerService',
        HIGH_SPEED_VEHICLE_SERVICE: 'highSpeedVehicleService',
        INTERNATIONAL_CAR_FERRY: 'internationalCarFerry',
        LOCAL_CAR_FERRY: 'localCarFerry',
        LOCAL_PASSENGER_FERRY: 'localPassengerFerry',
        NATIONAL_CAR_FERRY: 'nationalCarFerry',
        RAIL_REPLACEMENT_BUS: 'railReplacementBus',
        REGIONAL_CAR_FERRY: 'regionalCarFerry',
        TOURIST_RAILWAY: 'touristRailway',
        AIRPORT_LINK_BUS: 'airportLinkBus',
    }

    declare export var ONSTREET_BUS: 'onstreetBus'
    declare export var ONSTREET_TRAM: 'onstreetTram'
    declare export var AIRPORT: 'airport'
    declare export var RAIL_STATION: 'railStation'
    declare export var METRO_STATION: 'metroStation'
    declare export var BUS_STATION: 'busStation'
    declare export var COACH_STATION: 'coachStation'
    declare export var TRAM_STATION: 'tramStation'
    declare export var HARBOUR_PORT: 'harbourPort'
    declare export var FERRY_PORT: 'ferryPort'
    declare export var FERRY_STOP: 'ferryStop'
    declare export var LIFT_STATION: 'liftStation'
    declare export var VEHICLE_RAIL_INTERCHANGE: 'vehicleRailInterchange'
    declare export var GROUP_OF_STOPP_LACES: 'GroupOfStopPlaces'
    declare export var POI: 'poi'
    declare export var VEGADRESSE: 'Vegadresse'
    declare export var STREET: 'street'
    declare export var TETTSTEDDEL: 'tettsteddel'
    declare export var BYDEL: 'bydel'
    declare export var OTHER: 'other'

    declare export var FeatureCategory: {
        ONSTREET_BUS: 'onstreetBus',
        ONSTREET_TRAM: 'onstreetTram',
        AIRPORT: 'airport',
        RAIL_STATION: 'railStation',
        METRO_STATION: 'metroStation',
        BUS_STATION: 'busStation',
        COACH_STATION: 'coachStation',
        TRAM_STATION: 'tramStation',
        HARBOUR_PORT: 'harbourPort',
        FERRY_PORT: 'ferryPort',
        FERRY_STOP: 'ferryStop',
        LIFT_STATION: 'liftStation',
        VEHICLE_RAIL_INTERCHANGE: 'vehicleRailInterchange',
        GROUP_OF_STOPP_LACES: 'GroupOfStopPlaces',
        POI: 'poi',
        VEGADRESSE: 'Vegadresse',
        STREET: 'street',
        TETTSTEDDEL: 'tettsteddel',
        BYDEL: 'bydel',
        OTHER: 'other',
    }

    /**
     * Utils
     */

    declare export function convertFeatureToLocation(feature: $entur$sdk$Feature): $entur$sdk$Location
    declare export function convertLocationToPosition(feature: $entur$sdk$Feature): $entur$sdk$Location
    declare export function convertPositionToBbox(coordinates: Coordinates, distance: number): {
        minLng: number,
        minLat: number,
        maxLng: number,
        maxLat: number,
    }

    declare export function throttler(func: Function, args: Array<any>): Array<any>

    declare export function isAir(mode: string): boolean
    declare export function isBicycle(mode: string): boolean
    declare export function isBus(mode: string): boolean
    declare export function isCableway(mode: string): boolean
    declare export function isCar(mode: string): boolean
    declare export function isCoach(mode: string): boolean
    declare export function isWater(mode: string): boolean
    declare export function isFunicular(mode: string): boolean
    declare export function isLift(mode: string): boolean
    declare export function isRail(mode: string): boolean
    declare export function isMetro(mode: string): boolean
    declare export function isTram(mode: string): boolean
    declare export function isTransit(mode: string): boolean
    declare export function isFoot(mode: string): boolean
    declare export function isCarPark(mode: string): boolean
    declare export function isCarPickup(mode: string): boolean
}
