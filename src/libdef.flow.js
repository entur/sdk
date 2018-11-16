// @flow
/* eslint-disable max-len */

type $entur$sdk$Longitude = number
type $entur$sdk$Latitude = number

type $entur$sdk$Coordinates = {
    latitude: $entur$sdk$Latitude,
    longitude: $entur$sdk$Longitude,
}

type $entur$sdk$Location = {
    name: string,
    place?: string,
    coordinates?: $entur$sdk$Coordinates,
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
    // | 'unknown'

type $entur$sdk$LegMode =
    | $entur$sdk$TransportMode
    | 'bicycle'
    | 'foot'
    | 'car'
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

type $entur$sdk$Config = {
    clientName: string,
    hosts?: {
        journeyPlanner?: string,
        geocoder?: string,
    }
}

type $entur$sdk$Notice = {|
    text: string,
|}

type $entur$sdk$TripPatternsQuery = {
    searchDate: Date,
    from: $entur$sdk$Location,
    to: $entur$sdk$Location,
    arriveBy?: boolean,
    modes?: Array<$entur$sdk$LegMode>,
    limit?: number,
    wheelchairAccessible?: boolean,
}

type $entur$sdk$MultilingualString = {
    lang: string,
    value: string,
}

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

type $entur$sdk$ValidityPeriod = { startTime: string, endTime: string }

type $entur$sdk$ReportType = 'general' | 'incident' | null

type $entur$sdk$Situation = {|
    situationNumber: string,
    summary: Array<$entur$sdk$MultilingualString>,
    description: Array<$entur$sdk$MultilingualString>,
    detail: Array<$entur$sdk$MultilingualString>,
    validityPeriod: $entur$sdk$ValidityPeriod,
    reportType: $entur$sdk$ReportType,
|}

type $entur$sdk$Quay = {
  id: string,
  name: string,
  description?: string,
  publicCode: string,
  situations?: Array<$entur$sdk$Situation>,
}

type $entur$sdk$Place = {
  name: string,
  latitude: number,
  longitude: number,
  quay: $entur$sdk$Quay,
}

type $entur$sdk$IntermediateEstimatedCall = {
    quay: { id: string, name: string },
    forAlighting?: boolean,
    forBoarding?: boolean,
    aimedDepartureTime: string,
    expectedDepartureTime?: string, // Only available BEFORE departure has taken place
    actualDepartureTime?: string // Only available AFTER departure has taken place
}

type $entur$sdk$Line = {
    id: string,
    publicCode: string,
    name: string,
    transportMode: $entur$sdk$LegMode,
    transportSubmode: $entur$sdk$TransportSubmode,
    description?: string,
    notices?: Array<$entur$sdk$Notice>,
    presentation: {
        colour: string,
        textColour: string
    }
}

type $entur$sdk$PointsOnLink = {
    points: string,
    length: number,
}

type $entur$sdk$DestinationDisplay = {
    frontText: string
}

type $entur$sdk$JourneyPattern = {
    id: string,
    line: $entur$sdk$Line,
    name: string,
    notices: Array<$entur$sdk$Notice>,
}

type $entur$sdk$ServiceJourney = {
    id: string,
    journeyPattern: $entur$sdk$JourneyPattern,
    notices: Array<$entur$sdk$Notice>,
    situations: Array<$entur$sdk$Situation>,
    privateCode?: string,
    linePublicCode?: string,
    wheelchairAccessible?: 'noInformation' | 'possible' | 'notPossible',
}

type $entur$sdk$EstimatedCall = {
    realtime: boolean,
    quay: $entur$sdk$Quay,
    forAlighting?: boolean,
    forBoarding?: boolean,
    aimedDepartureTime: string,
    expectedDepartureTime: string,
    destinationDisplay?: $entur$sdk$DestinationDisplay,
    serviceJourney: $entur$sdk$ServiceJourney,
    intermediateEstimatedCalls: Array<$entur$sdk$IntermediateEstimatedCall>,
    situations: Array<$entur$sdk$Situation>,
    notices?: Array<$entur$sdk$Notice>,
}

type $entur$sdk$Leg = {
    aimedEndTime: string,
    aimedStartTime: string,
    authority?: $entur$sdk$Authority,
    operator?: $entur$sdk$Operator,
    distance?: number,
    duration?: number,
    fromPlace: $entur$sdk$Place,
    toPlace: $entur$sdk$Place,
    intermediateEstimatedCalls: Array<$entur$sdk$IntermediateEstimatedCall>,
    intermediateQuays: Array<$entur$sdk$Quay>,
    line?: $entur$sdk$Line,
    mode: $entur$sdk$LegMode,
    pointsOnLink: $entur$sdk$PointsOnLink,
    realtime: boolean,
    ride: boolean,
    serviceJourney: $entur$sdk$ServiceJourney,
    expectedEndTime?: string,
    expectedStartTime?: string,
    situations: Array<$entur$sdk$Situation>,
}

type $entur$sdk$TripPattern = {
    duration: number,
    endTime: string,
    legs: Array<$entur$sdk$Leg>,
    startTime: string,
    waitingTime: number,
    walkDistance: number
}

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

type $entur$sdk$Feature = {
    geometry: {
        coordinates: [$entur$sdk$Longitude, $entur$sdk$Latitude],
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
        id: string,
        locality: string,
        locality_gid: string,
        name: string,
        postalcode: string,
        source: string,
        source_id: string,
        street: string,
    }
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

type $entur$sdk$BikeRentalStation = {
    id: string,
    name: string,
    bikesAvailable: number,
    spacesAvailable: number,
    longitude: number,
    latitude: number,
}

declare module '@entur/sdk' {
    declare export default class EnturService {
        constructor(config?: $entur$sdk$Config): EnturService;

        getFeatures(
            query: string,
            coords?: $entur$sdk$Coordinates,
            params?: Object
        ): Promise<Array<$entur$sdk$Feature>>,

        getTripPatterns(
            query: $entur$sdk$TripPatternsQuery
        ): Promise<Array<$entur$sdk$TripPattern>>,

        findTrips(from: string, to: string, date?: Date | string | number): Promise<Array<$entur$sdk$TripPattern>>,

        getStopPlaceDepartures(stopPlaceId: string, params?: {
            startTime?: string,
            range?: number,
            departures?: number,
            includeNonBoarding?: boolean,
        }): Promise<Array<$entur$sdk$EstimatedCall>>,

        getStopPlaceDepartures(stopPlaceIds: Array<string>, params?: {
            startTime?: string,
            range?: number,
            departures?: number,
            includeNonBoarding?: boolean,
        }): Promise<Array<{ id: string, departures: Array<$entur$sdk$EstimatedCall>}>>,

        getStopPlace(id: string): Promise<$entur$sdk$StopPlace>,

        getStopPlacesByPosition(
            coordinates: $entur$sdk$Coordinates,
            distance?: number
        ): Promise<Array<$entur$sdk$StopPlace>>,

        getBikeRentalStation(id: string): Promise<$entur$sdk$BikeRentalStation>,

        getBikeRentalStations(
            coordinates: $entur$sdk$Coordinates,
            distance?: number
        ): Promise<Array<$entur$sdk$BikeRentalStation>>,
    }

    // Constants

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

    // Utils
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
