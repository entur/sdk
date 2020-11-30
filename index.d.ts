/**
 * Commons
 */

export interface Config {
    clientName: string
    hosts?: {
        journeyPlanner?: string
        geocoder?: string
        nsr?: string
        scooters?: string
    }
    headers?: { [key: string]: string }
    fetch?: (url: string, init?: Record<string, any>) => Promise<any>
}

export interface OverrideConfig {
    clientName?: string
    hosts?: {
        journeyPlanner?: string
        geocoder?: string
        nsr?: string
        scooters?: string
    }
    headers?: { [key: string]: string }
    fetch?: (url: string, init?: Record<string, any>) => Promise<any>
}

export interface Coordinates {
    latitude: number
    longitude: number
}

export interface MultilingualString {
    lang: 'eng' | 'nob' | 'nno'
    language?: 'en' | 'nb' | 'nn' | 'no'
    value: string
}

export interface Notice {
    text: string
}

export type ReportType = 'general' | 'incident' | null

export interface ServiceConfig {
    clientName: string
    hosts: {
        journeyPlanner: string
        geocoder: string
        nsr: string
        scooters: string
    }
    headers: { [key: string]: string }
}

interface ValidityPeriod {
    startTime: string
    endTime: string
}

interface InfoLink {
    uri: string
    label: string
}

export interface Situation {
    situationNumber: string
    summary: MultilingualString[]
    description: MultilingualString[]
    advice: MultilingualString[]
    lines: Line[]
    validityPeriod: ValidityPeriod
    reportType: ReportType
    infoLinks: InfoLink[]
}

/**
 * Bike rental
 */

export interface BikeRentalStation {
    id: string
    name: string
    bikesAvailable?: number
    spacesAvailable?: number
    longitude: number
    latitude: number
    networks: string[]
}

/**
 * Scooters
 */

export enum ScooterOperator {
    VOI = 'voi',
    TIER = 'tier',
    ZVIPP = 'zvipp',
    LIME = 'lime',
}

export type BatteryScooter = {
    id: string
    lat: number
    lon: number
    code?: string
    operator: ScooterOperator.VOI | ScooterOperator.TIER | ScooterOperator.ZVIPP
    battery: number
    rental_uris?: {
        android: string
        ios: string
    }
}

export enum BatteryLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export type BatteryLevelScooter = {
    id: string
    lat: number
    lon: number
    code?: string
    operator: ScooterOperator.LIME
    batteryLevel: BatteryLevel
    rental_uris?: {
        android: string
        ios: string
    }
}

export type Scooter = BatteryScooter | BatteryLevelScooter

/**
 * Geocoder
 */

/** @deprecated Use FeatureCategory enum instead  */
export type Category =
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

declare enum County {
    // Norway:
    Oslo = 'KVE:TopographicPlace:03',
    Rogaland = 'KVE:TopographicPlace:11',
    MoreOgRomsdal = 'KVE:TopographicPlace:15',
    Nordland = 'KVE:TopographicPlace:18',
    Svalbard = 'KVE:TopographicPlace:21',
    JanMayen = 'KVE:TopographicPlace:22',
    Viken = 'KVE:TopographicPlace:30',
    Innlandet = 'KVE:TopographicPlace:34',
    VestfoldOgTelemark = 'KVE:TopographicPlace:38',
    Agder = 'KVE:TopographicPlace:42',
    Vestland = 'KVE:TopographicPlace:46',
    Trondelag = 'KVE:TopographicPlace:50',
    TromsOgFinnmark = 'KVE:TopographicPlace:54',

    // Sweden:
    StockholmsLan = 'LAN:TopographicPlace:01',
    UppsalaLan = 'LAN:TopographicPlace:03',
    SodermanlandsLan = 'LAN:TopographicPlace:04',
    OstergotlandsLan = 'LAN:TopographicPlace:05',
    JonkopingsLan = 'LAN:TopographicPlace:06',
    KronobergsLan = 'LAN:TopographicPlace:07',
    KalmarLan = 'LAN:TopographicPlace:08',
    GotlandsLan = 'LAN:TopographicPlace:09',
    BlekingeLan = 'LAN:TopographicPlace:10',
    SkaneLan = 'LAN:TopographicPlace:12',
    HallandsLan = 'LAN:TopographicPlace:13',
    VastraGotalandsLan = 'LAN:TopographicPlace:14',
    VarmlandsLan = 'LAN:TopographicPlace:17',
    OrebroLan = 'LAN:TopographicPlace:18',
    VastmanlandsLan = 'LAN:TopographicPlace:19',
    DalarnasLan = 'LAN:TopographicPlace:20',
    GavleborgsLan = 'LAN:TopographicPlace:21',
    VasternorrlandsLan = 'LAN:TopographicPlace:22',
    JamtlandsLan = 'LAN:TopographicPlace:23',
    VasterbottensLan = 'LAN:TopographicPlace:24',
    NorrbottensLan = 'LAN:TopographicPlace:25',
}

export interface GetFeaturesParams {
    /** @deprecated Use `boundary` object instead */
    'boundary.rect.min_lon'?: number
    /** @deprecated Use `boundary` object instead */
    'boundary.rect.max_lon'?: number
    /** @deprecated Use `boundary` object instead */
    'boundary.rect.min_lat'?: number
    /** @deprecated Use `boundary` object instead */
    'boundary.rect.max_lat'?: number
    /** @deprecated Use `boundary` object instead */
    'boundary.country'?: string
    /** @deprecated Use `boundary` object instead */
    'boundary.county_ids'?: string
    /** @deprecated Use `boundary` object instead */
    'boundary.locality_ids'?: string
    boundary?: {
        rect?: {
            minLat: number
            minLon: number
            maxLat: number
            maxLon: number
        }
        country?: string
        countyIds?: County[]
        localityIds?: string[]
    }
    sources?: string[]
    layers?: string[]
    limit?: number
}

export interface GetFeaturesReverseParam {
    radius?: number
    size?: number
    layers?: string[]
}

export interface Feature {
    geometry: {
        coordinates: [number, number] // longitude, latitude
        type: 'Point'
    }
    properties: {
        id: string
        name: string
        label?: string
        borough: string
        accuracy: 'point'
        layer: 'venue' | 'address'
        borough_gid: string
        category: FeatureCategory[]
        country_gid: string
        county: string
        county_gid: string
        gid: string
        housenumber?: string
        locality: string
        locality_gid: string
        postalcode: string
        source: string
        source_id: string
        street: string
    }
}

export interface Location {
    name?: string
    place?: string
    coordinates?: Coordinates
}

/**
 * Trip
 */

export interface Authority {
    id: string
    name: string
    codeSpace: string
    url?: string
    description?: string
}

export interface Operator {
    id: string
    name: string
    url?: string
}

export interface StopPlace {
    description?: string
    id: string
    name: string
    latitude?: number
    longitude?: number
    tariffZones?: Array<{
        id: string
    }>
}

export interface Quay {
    id: string
    name: string
    description: string
    publicCode: string
    situations: Situation[]
    stopPlace: StopPlace
}

export interface Place {
    latitude: number
    longitude: number
    name?: string
    quay?: Quay
    bikeRentalStation?: BikeRentalStation
}

export declare enum TransportMode {
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

export declare enum TransportSubmode {
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

/**
 * The possible modes that can be returned on a Leg
 */
export declare enum LegMode {
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
export declare enum QueryMode {
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

export interface DestinationDisplay {
    frontText: string
}

export interface EstimatedCall {
    actualArrivalTime?: string // Only available AFTER arrival has taken place
    actualDepartureTime?: string // Only available AFTER departure has taken place
    aimedArrivalTime: string
    aimedDepartureTime: string
    cancellation: boolean
    date: string
    destinationDisplay: DestinationDisplay
    expectedArrivalTime: string
    expectedDepartureTime: string
    forAlighting: boolean
    forBoarding: boolean
    notices?: Notice[]
    predictionInaccurate: boolean
    quay?: Quay
    realtime: boolean
    requestStop: boolean
    serviceJourney: ServiceJourney
    situations: Situation[]
}

export type IntermediateEstimatedCall = EstimatedCall

export type Departure = EstimatedCall

export type BookingMethod = 'callOffice' | 'online'

export interface BookingContact {
    phone: string
    url: string
}

export interface BookingArrangement {
    bookingAccess: boolean
    bookingContact: BookingContact
    latestBookingTime: string
    bookingMethods?: BookingMethod[]
    bookWhen?: string
    minimumBookingPeriod?: string
    bookingNote?: string
    buyWhen: string
}

export interface Line {
    bookingArrangements?: BookingArrangement
    description?: string
    flexibleLineType?: FlexibleLineType
    id: string
    name: string
    notices?: Notice[]
    publicCode: string
    transportMode: TransportMode
    transportSubmode: TransportSubmode
}

export type FlexibleLineType =
    | 'corridorService'
    | 'mainRouteWithFlexibleEnds'
    | 'flexibleAreasOnly'
    | 'hailAndRideSections'
    | 'fixedStopAreaWide'
    | 'freeAreaAreaWide'
    | 'mixedFlexible'
    | 'mixedFlexibleAndFixed'
    | 'fixed'
    | 'other'

export interface Interchange {
    guaranteed: boolean
    staySeated: boolean
    FromServiceJourney?: {
        id: string
    }
    ToServiceJourney?: {
        id: string
    }
}

export interface PointsOnLink {
    points: string
    length: number
}

export interface JourneyPattern {
    line: Line
    notices?: Notice[]
}

export interface ServiceJourney {
    id: string
    journeyPattern?: JourneyPattern
    notices?: Notice[]
    publicCode?: string
    privateCode?: string
    transportSubmode?: TransportSubmode
}

export interface Leg {
    aimedEndTime: string
    aimedStartTime: string
    authority?: Authority
    distance: number
    directDuration: number
    duration: number
    expectedEndTime: string
    expectedStartTime: string
    fromEstimatedCall?: EstimatedCall
    fromPlace: Place
    interchangeFrom?: Interchange
    interchangeTo?: Interchange
    intermediateEstimatedCalls: IntermediateEstimatedCall[]
    line?: Line
    mode: LegMode
    notices?: Notice[]
    operator?: Operator
    pointsOnLink: PointsOnLink
    realtime: boolean
    ride: boolean
    rentedBike?: boolean
    serviceJourney: ServiceJourney
    situations: Situation[]
    toEstimatedCall?: EstimatedCall
    toPlace: Place
    transportSubmode: TransportSubmode
}

export interface TransportSubmodeParam {
    transportMode: TransportMode
    transportSubmodes: TransportSubmode[]
}

export interface InputBanned {
    lines?: string[]
    authorities?: string[]
    organisations?: string[]
    quays?: string[]
    quaysHard?: string[]
    serviceJourneys?: string[]
}

export interface InputWhiteListed {
    lines?: string[]
    authorities?: string[]
    organisations?: string[]
}

export interface GetTripPatternsParams {
    from: Location
    to: Location
    allowBikeRental?: boolean
    arriveBy?: boolean
    limit?: number
    maxPreTransitWalkDistance?: number
    modes?: QueryMode[]
    searchDate?: Date
    transportSubmodes?: TransportSubmodeParam[]
    useFlex?: boolean
    walkSpeed?: number
    minimumTransferTime?: number
    wheelchairAccessible?: boolean
    banned?: InputBanned
    whiteListed?: InputWhiteListed
}

export interface TripPattern {
    distance: number
    directDuration: number
    duration: number
    /** @deprecated Use expectedEndTime instead */
    endTime: string
    expectedEndTime: string
    expectedStartTime: string
    id?: string
    legs: Leg[]
    /** @deprecated Use expectedStartTime instead */
    startTime: string
    walkDistance: number
}

export interface GetDeparturesParams {
    includeCancelledTrips?: boolean
    includeNonBoarding?: boolean
    limit?: number
    limitPerLine?: number
    start?: Date
    timeRange?: number
    whiteListedAuthorities?: string[]
    whiteListedLines?: string[]
    whiteListedModes?: QueryMode[]
}

export interface GetDeparturesBetweenStopPlacesParams {
    limit?: number
    start?: Date
}

/**
 * Nearest
 */

declare enum TypeName {
    BIKE_PARK = 'BikePark',
    BIKE_RENTAL_STATION = 'BikeRentalStation',
    CAR_PARK = 'CarPark',
    QUAY = 'Quay',
    STOP_PLACE = 'StopPlace',
}

export interface NearestPlace {
    id: string
    type: TypeName
    distance: number
    latitude: number
    longitude: number
}

/**
 * Stop Place
 */

export interface DeparturesById {
    id: string
    departures: Departure[]
}

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
    quays?: Array<Quay & { situations?: Situation[] }>
}

export type LimitationStatusType = 'FALSE' | 'TRUE' | 'PARTIAL' | 'UNKNOWN'

export interface WaitingRoomEquipment {
    id: string
}

export interface ShelterEquipment {
    id: string
}

export interface SanitaryEquipment {
    id: string
    numberOfToilets: number
    gender: 'both' | 'femaleOnly' | 'maleOnly' | 'sameSexOnly'
}

export interface TicketingEquipment {
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

export interface StopPlaceParams {
    filterByInUse?: boolean
}

export interface EnturService {
    journeyPlannerQuery: <journeyPlannerResponse>(
        queryObj: string,
        variables?: Record<string, any>,
        config?: ServiceConfig,
    ) => Promise<journeyPlannerResponse>

    queryJourneyPlanner: <journeyPlannerResponse>(
        queryObj: string,
        variables?: Record<string, any>,
    ) => Promise<journeyPlannerResponse>

    nsrQuery: <nsrResponse>(
        queryObj: string,
        variables?: Record<string, any>,
        config?: ServiceConfig,
    ) => Promise<nsrResponse>

    queryNsr: <nsrResponse>(
        queryObj: string,
        variables?: Record<string, any>,
    ) => Promise<nsrResponse>

    getFeatures: (
        query: string,
        coords?: Coordinates,
        params?: GetFeaturesParams,
    ) => Promise<Feature[]>

    getFeaturesReverse: (
        coords: Coordinates,
        params?: GetFeaturesReverseParam,
    ) => Promise<Feature[]>

    getTripPatterns: (
        params: GetTripPatternsParams,
        overrideConfig?: OverrideConfig,
    ) => Promise<TripPattern[]>

    findTrips: (
        from: string,
        to: string,
        date?: Date | string | number,
    ) => Promise<TripPattern[]>

    getDeparturesFromStopPlaces: (
        stopPlaceIds: string[],
        params?: GetDeparturesParams,
    ) => Promise<Array<DeparturesById | undefined>>

    getDeparturesFromStopPlace: (
        stopPlaceId: string,
        params?: GetDeparturesParams,
    ) => Promise<Departure[]>

    getDeparturesFromQuays: (
        quayIds: string[],
        params?: GetDeparturesParams,
    ) => Promise<Array<DeparturesById | undefined>>

    getDeparturesBetweenStopPlaces: (
        fromStopPlaceId: string,
        toStopPlaceId: string,
        params?: GetDeparturesBetweenStopPlacesParams,
    ) => Promise<Departure[]>

    getDeparturesForServiceJourney: (
        id: string,
        date?: string,
    ) => Promise<Departure[]>

    getNearestPlaces: (
        coordinates: Coordinates,
        params?: {
            maximumDistance?: number
            maximumResults?: number
            filterByPlaceTypes?: TypeName[]
            filterByModes?: TransportMode[]
            filterByInUse?: boolean
            multiModalMode?: 'parent' | 'child' | 'all'
        },
    ) => Promise<NearestPlace[]>

    getStopPlace: (
        id: string,
        params?: StopPlaceParams,
    ) => Promise<StopPlaceDetails>

    getStopPlaces: (
        stopPlaceId: string[],
        params?: StopPlaceParams,
    ) => Promise<Array<StopPlaceDetails | undefined>>

    getParentStopPlace: (
        id: string,
        params?: StopPlaceParams,
    ) => Promise<StopPlaceDetails | null>

    getStopPlacesByPosition: (
        coordinates: Coordinates,
        distance?: number,
    ) => Promise<StopPlaceDetails[]>

    getStopPlaceFacilities: (
        stopPlaceId: string,
    ) => Promise<StopPlaceFacilities>

    getQuaysForStopPlace: (
        stopPlaceId: string,
        params?: StopPlaceParams,
    ) => Promise<Quay[]>

    getBikeRentalStation: (stationId: string) => Promise<BikeRentalStation>

    getBikeRentalStations: (
        stationIds: string[],
    ) => Promise<Array<BikeRentalStation | undefined>>

    getBikeRentalStationsByPosition: (
        coordinates: Coordinates,
        distance?: number,
    ) => Promise<BikeRentalStation[]>

    getScootersByPosition: (params: {
        latitude: number
        longitude: number
        distance?: number
        limit?: number
        operators?: ScooterOperator[]
    }) => Promise<Scooter[]>
}

export default function createEnturService(config: Config): EnturService

/**
 * Constants
 */

// Any for of public transportation
/** @deprecated Use QueryMode.AIR instead */
export var AIR: 'air'
/** @deprecated Use QueryMode.BICYCLE instead */
export var BICYCLE: 'bicycle'
/** @deprecated Use QueryMode.BUS instead */
export var BUS: 'bus'
/** @deprecated Use QueryMode.CABLEWAY instead */
export var CABLEWAY: 'cableway'
/** @deprecated Use QueryMode.CAR instead */
export var CAR: 'car'
/** @deprecated Use QueryMode.COACH instead */
export var COACH: 'coach'
/** @deprecated Use QueryMode.WATER instead */
export var WATER: 'water'
/** @deprecated Use QueryMode.FUNICULAR instead */
export var FUNICULAR: 'funicular'
/** @deprecated Use QueryMode.LIFT instead */
export var LIFT: 'lift'
/** @deprecated Use QueryMode.RAIL instead */
export var RAIL: 'rail'
/** @deprecated Use QueryMode.METRO instead */
export var METRO: 'metro'
/** @deprecated Use QueryMode.TRAM instead */
export var TRAM: 'tram'
/** @deprecated Use QueryMode.TRANSIT instead */
export var TRANSIT: 'transit'
/** @deprecated Use QueryMode.FOOT instead */
export var FOOT: 'foot'

// Combine with foot and transit for park and ride.
/** @deprecated Use QueryMode.CAR_PARK instead */
export var CAR_PARK: 'car_park'

// Combine with foot and transit for ride and kiss
/** @deprecated Use QueryMode.CAR_PICKUP instead */
export var CAR_PICKUP: 'car_pickup'

/** @deprecated Use TransportSubmode.AIRPORT_LINK_RAIL instead */
export var AIRPORT_LINK_RAIL: 'airportLinkRail'
/** @deprecated Use TransportSubmode.HIGH_SPEED_PASSENGER_SERVICE instead */
export var HIGH_SPEED_PASSENGER_SERVICE: 'highSpeedPassengerService'
/** @deprecated Use TransportSubmode.HIGH_SPEED_VEHICLE_SERVICE instead */
export var HIGH_SPEED_VEHICLE_SERVICE: 'highSpeedVehicleService'
/** @deprecated Use TransportSubmode.INTERNATIONAL_CAR_FERRY instead */
export var INTERNATIONAL_CAR_FERRY: 'internationalCarFerry'
/** @deprecated Use TransportSubmode.LOCAL_CAR_FERRY instead */
export var LOCAL_CAR_FERRY: 'localCarFerry'
/** @deprecated Use TransportSubmode.LOCAL_PASSENGER_FERRY instead */
export var LOCAL_PASSENGER_FERRY: 'localPassengerFerry'
/** @deprecated Use TransportSubmode.NATIONAL_CAR_FERRY instead */
export var NATIONAL_CAR_FERRY: 'nationalCarFerry'
/** @deprecated Use TransportSubmode.RAIL_REPLACEMENT_BUS instead */
export var RAIL_REPLACEMENT_BUS: 'railReplacementBus'
/** @deprecated Use TransportSubmode.REGIONAL_CAR_FERRY instead */
export var REGIONAL_CAR_FERRY: 'regionalCarFerry'
/** @deprecated Use TransportSubmode.TOURIST_RAILWAY instead */
export var TOURIST_RAILWAY: 'touristRailway'
/** @deprecated Use TransportSubmode.AIRPORT_LINK_BUS instead */
export var AIRPORT_LINK_BUS: 'airportLinkBus'

declare enum FeatureCategory {
    ONSTREET_BUS = 'onstreetBus',
    ONSTREET_TRAM = 'onstreetTram',
    AIRPORT = 'airport',
    RAIL_STATION = 'railStation',
    METRO_STATION = 'metroStation',
    BUS_STATION = 'busStation',
    COACH_STATION = 'coachStation',
    TRAM_STATION = 'tramStation',
    HARBOUR_PORT = 'harbourPort',
    FERRY_PORT = 'ferryPort',
    FERRY_STOP = 'ferryStop',
    LIFT_STATION = 'liftStation',
    VEHICLE_RAIL_INTERCHANGE = 'vehicleRailInterchange',
    GROUP_OF_STOP_PLACES = 'GroupOfStopPlaces',
    POI = 'poi',
    VEGADRESSE = 'Vegadresse',
    STREET = 'street',
    TETTSTEDDEL = 'tettsteddel',
    BYDEL = 'bydel',
    OTHER = 'other',
}

/**
 * Utils
 */

export function getTripPatternsQuery(
    params: GetTripPatternsParams,
): { query: string; variables?: Record<string, any> }

export function convertFeatureToLocation(feature: Feature): Location
export function convertLocationToPosition(feature: Feature): Location
export function convertPositionToBbox(
    coordinates: Coordinates,
    distance: number,
): {
    minLng: number
    minLat: number
    maxLng: number
    maxLat: number
}

export function throttler<T, U>(
    func: (arg: T) => Promise<U>,
    args: T[],
): Promise<U[]>

export function journeyPlannerQuery<T>(
    queryObj: string,
    variables: object,
    config: ServiceConfig,
): Promise<T>
export function nsrQuery<T>(
    queryObj: string,
    variables: object,
    config: ServiceConfig,
): Promise<T>

/** @deprecated Implement your own equality check */
export function isAir(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isBicycle(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isBus(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isCableway(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isCar(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isCoach(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isWater(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isFunicular(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isLift(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isRail(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isMetro(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isTram(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isTransit(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isFoot(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isCarPark(mode: string): boolean
/** @deprecated Implement your own equality check */
export function isCarPickup(mode: string): boolean

export function isBatteryScooter(scooter: Scooter): scooter is BatteryScooter
export function isBatteryLevelScooter(
    scooter: Scooter,
): scooter is BatteryLevelScooter
