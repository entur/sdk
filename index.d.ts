/**
 * Commons
 */

export interface Config {
    clientName: string;
    hosts?: {
        journeyPlanner?: string;
        geocoder?: string;
        nsr?: string;
    };
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface MultilingualString {
    lang: 'eng' | 'nob' | 'nno';
    language?: 'en' | 'nb' | 'nn' | 'no';
    value: string;
}

export interface Notice {
    text: string;
}

export type ReportType = "general" | "incident" | null;

export interface ServiceConfig {
    clientName: string;
    hosts: {
        journeyplanner: string;
        geocoder: string;
        nsr: string;
    };
}

interface ValidityPeriod {
    startTime: string;
    endTime: string;
}

interface InfoLink {
  uri: string;
  label: string;
}

export interface Situation {
    situationNumber: string;
    summary: Array<MultilingualString>;
    description: Array<MultilingualString>;
    detail: Array<MultilingualString>;
    validityPeriod: ValidityPeriod;
    reportType: ReportType;
    infoLinks: Array<InfoLink>;
}

/**
 * Bike rental
 */

export interface BikeRentalStation {
    id: string;
    name: string;
    bikesAvailable: number;
    spacesAvailable: number;
    longitude: number;
    latitude: number;
    networks: Array<string>;
}


/**
 * Geocoder
 */

export type Category =
    | "onstreetBus"
    | "onstreetTram"
    | "airport"
    | "railStation"
    | "metroStation"
    | "busStation"
    | "coachStation"
    | "tramStation"
    | "harbourPort"
    | "ferryPort"
    | "ferryStop"
    | "liftStation"
    | "vehicleRailInterchange"
    | "other"
    | "GroupOfStopPlaces"
    | "poi"
    | "Vegadresse"
    | "street"
    | "tettsteddel"
    | "bydel";

export interface GetFeaturesParams {
    "boundary.rect.min_lon"?: number;
    "boundary.rect.max_lon"?: number;
    "boundary.rect.min_lat"?: number;
    "boundary.rect.max_lat"?: number;
    "boundary.country"?: string;
    sources?: Array<string>;
    layers?: Array<string>;
    limit?: number;
}

export interface Feature {
    geometry: {
        coordinates: [number, number]; // longitude, latitude
        type: "Point";
    };
    properties: {
        id: string;
        name: string;
        label?: string;
        borough: string;
        accuracy: "point";
        layer: "venue" | "address";
        borough_gid: string;
        category: Array<Category>;
        country_gid: string;
        county: string;
        county_gid: string;
        gid: string;
        housenumber?: string;
        locality: string;
        locality_gid: string;
        postalcode: string;
        source: string;
        source_id: string;
        street: string;
    };
}

export interface Location {
    name?: string;
    place?: string;
    coordinates?: Coordinates;
}


/**
 * Trip
 */

export interface Authority {
    id: string;
    name: string;
    codeSpace: string;
    url?: string;
    description?: string;
}

export interface Operator {
    id: string;
    name: string;
    url?: string;
}

export interface Quay {
    id: string;
    name: string;
    description: string;
    publicCode: string;
    situations: Array<Situation>;
    stopPlace: {
        id: string;
        description?: string;
    };
}

export interface StopPlace {
    description?: string;
    id: string;
    name: string;
    tariffZones?: Array<{ id: string }>;
}

export interface Place {
    latitude: number;
    longitude: number;
    name?: string;
    quay?: Quay & { stopPlace: StopPlace };
}

export type TransportMode =
    | 'air'
    | 'bus'
    | 'cableway'
    | 'coach'
    | 'funicular'
    | 'lift'
    | 'metro'
    | 'rail'
    | 'tram'
    | 'unknown'
    | 'water'

// All valid values for the "mode" parameter to JourneyPlanner
export type QueryMode =
    | 'air'
    | 'bicycle'
    | 'bus'
    | 'cableway'
    | 'car'
    | 'car_dropoff'
    | 'car_park'
    | 'car_pickup'
    | 'coach'
    | 'foot'
    | 'funicular'
    | 'lift'
    | 'metro'
    | 'rail'
    | 'tram'
    | 'transit'
    | 'water'

export type LegMode = TransportMode | "bicycle" | "foot";

export type TransportSubmode =
    | "airportLinkRail"
    | "highSpeedPassengerService"
    | "highSpeedVehicleService"
    | "internationalCarFerry"
    | "localCarFerry"
    | "localPassengerFerry"
    | "nationalCarFerry"
    | "railReplacementBus"
    | "regionalCarFerry"
    | "touristRailway"
    | "airportLinkBus"
    | "cityTram";

export interface DestinationDisplay {
    frontText: string;
}

export interface EstimatedCall {
    actualArrivalTime?: string; // Only available AFTER arrival has taken place
    actualDepartureTime?: string; // Only available AFTER departure has taken place
    aimedArrivalTime: string;
    aimedDepartureTime: string;
    cancellation: boolean;
    date: string;
    destinationDisplay: DestinationDisplay;
    expectedArrivalTime: string;
    expectedDepartureTime: string;
    forAlighting: boolean;
    forBoarding: boolean;
    notices?: Array<Notice>;
    quay?: Quay;
    realtime: boolean;
    requestStop: boolean;
    serviceJourney: ServiceJourney;
    situations: Array<Situation>;
}

export type IntermediateEstimatedCall = EstimatedCall

export type Departure = EstimatedCall

export type BookingMethod = 'callOffice' | 'online';

export interface BookingContact {
    phone: string;
    url: string;
}

export interface BookingArrangement {
    bookingAccess: boolean;
    bookingContact: BookingContact;
    latestBookingTime: string;
    bookingMethods?: Array<BookingMethod>;
    bookWhen?: string;
    minimumBookingPeriod?: string;
    bookingNote?: string;
    buyWhen: string;
}

export interface Line {
    bookingArrangements?: BookingArrangement;
    description?: string;
    flexibleLineType?: FlexibleLineType;
    id: string;
    name: string;
    notices?: Array<Notice>;
    publicCode: string;
    transportMode: TransportMode;
    transportSubmode: TransportSubmode;
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
    guaranteed: boolean;
    staySeated: boolean;
}

export interface PointsOnLink {
  points: string;
  length: number;
}

export interface JourneyPattern {
    line: Line;
    notices?: Array<Notice>;
}

export interface ServiceJourney {
    id: string;
    journeyPattern?: JourneyPattern;
    notices?: Array<Notice>;
    publicCode?: string;
    transportSubmode?: TransportSubmode;
}

export interface Leg {
    aimedEndTime: string;
    aimedStartTime: string;
    authority?: Authority;
    distance: number;
    directDuration: number,
    duration: number;
    expectedEndTime: string;
    expectedStartTime: string;
    fromEstimatedCall?: EstimatedCall;
    fromPlace: Place;
    interchangeFrom?: Interchange,
    interchangeTo?: Interchange,
    intermediateEstimatedCalls: Array<IntermediateEstimatedCall>;
    line?: Line;
    mode: LegMode;
    notices?: Array<Notice>;
    operator?: Operator;
    pointsOnLink: PointsOnLink;
    realtime: boolean;
    ride: boolean;
    rentedBike?: boolean;
    serviceJourney: ServiceJourney;
    situations?: Array<Situation>;
    toEstimatedCall?: EstimatedCall;
    toPlace: Place;
    transportSubmode: TransportSubmode;
}

export interface TransportSubmodeParam {
    transportMode: TransportMode;
    transportSubmodes: Array<TransportSubmode>;
}

export interface GetTripPatternsParams {
    allowBikeRental?: boolean;
    arriveBy?: boolean;
    limit?: number;
    maxPreTransitWalkDistance?: number;
    modes?: Array<QueryMode>;
    searchDate?: Date;
    transportSubmodes?: Array<TransportSubmodeParam>;
    walkSpeed?: number;
    wheelchairAccessible?: boolean;
}

export interface TripPattern {
    distance: number;
    directDuration: number,
    duration: number;
    endTime: string;
    id?: string,
    legs: Array<Leg>;
    startTime: string;
    walkDistance: number;
}

export interface GetDeparturesParams {
    includeNonBoarding?: boolean;
    limit?: number;
    limitPerLine?: number;
    start?: Date;
    timeRange?: number;
    whiteListedLines?: Array<string>;
    whiteListedAuthorities?: Array<string>;
}

export interface GetDeparturesBetweenStopPlacesParams {
    limit?: number;
    start?: Date;
}

/**
 * Nearest
 */

export type TypeName =
    | 'BikePark'
    | 'BikeRentalStation'
    | 'CarPark'
    | 'Quay'
    | 'StopPlace'

export interface NearestPlace {
    id: string,
    type: TypeName,
    distance: number,
    latitude: number,
    longitude: number,
}

/**
 * Stop Place
 */

export interface DeparturesById {
    id: string;
    departures: Array<Departure>;
}

export interface StopPlaceDetails {
    id: string;
    name: string;
    description?: string;
    latitude: number;
    longitude: number;
    wheelchairBoarding: "noInformation" | "possible" | "notPossible";
    weighting: "preferredInterchange" | "recommendedInterchange" | "interchangeAllowed" | "noInterchange";
    transportMode: TransportMode;
    transportSubmode?: TransportSubmode;
    quays?: Array<Quay & { situations?: Situation[] }>;
}

export type LimitationStatusType = "FALSE" | "TRUE" | "PARTIAL" | "UNKNOWN";

export interface WaitingRoomEquipment {
    id: string;
}

export interface ShelterEquipment {
    id: string;
}

export interface SanitaryEquipment {
    id: string;
    numberOfToilets: number;
    gender: "both" | "femaleOnly" | "maleOnly" | "sameSexOnly";
}

export interface TicketingEquipment {
    id: string;
    ticketOffice: boolean;
    ticketMachines: boolean;
    numberOfMachines: number;
}

export type ParkingVehicle =
    | "pedalCycle"
    | "moped"
    | "motorcycle"
    | "motorcycleWithSidecar"
    | "motorScooter"
    | "twoWheeledVehicle"
    | "threeWheeledVehicle"
    | "car"
    | "smallCar"
    | "passengerCar"
    | "largeCar"
    | "fourWheelDrive"
    | "taxi"
    | "camperCar"
    | "carWithTrailer"
    | "carWithCaravan"
    | "minibus"
    | "bus"
    | "van"
    | "largeVan"
    | "highSidedVehicle"
    | "lightGoodsVehicle"
    | "heavyGoodsVehicle"
    | "truck"
    | "agriculturalVehicle"
    | "tanker"
    | "tram"
    | "articulatedVehicle"
    | "vehicleWithTrailer"
    | "lightGoodsVehicleWithTrailer"
    | "heavyGoodsVehicleWithTrailer"
    | "undefined"
    | "other"
    | "allPassengerVehicles"
    | "all";

export interface StopPlaceFacilitiesStopPlace {
    id: string;
    name: MultilingualString;
    accessibilityAssessment: {
        limitations: {
            wheelchairAccess: LimitationStatusType;
            stepFreeAccess: LimitationStatusType;
        }
    },
    placeEquipments: {
        waitingRoomEquipment?: Array<WaitingRoomEquipment>;
        shelterEquipment?: Array<ShelterEquipment>;
        sanitaryEquipment?: Array<SanitaryEquipment>;
        ticketingEquipment?: Array<TicketingEquipment>;
    }
}

export interface StopPlaceFacilitiesParking {
    name: MultilingualString;
    parentSiteRef: string;
    totalCapacity?: number;
    principalCapacity?: number;
    parkingVehicleTypes?: Array<ParkingVehicle>;
}

export interface StopPlaceFacilities {
    stopPlace: Array<StopPlaceFacilitiesStopPlace>;
    parking: Array<StopPlaceFacilitiesParking>;
}

export interface StopPlaceParams {
    filterByInUse?: boolean;
}

declare class EnturService {
  constructor(args: Config);

  journeyPlannerQuery<journeyPlannerResponse>(
      queryObj: Object | string,
      variables?: Object,
      ignoreFields?: Array<string>,
      config?: ServiceConfig,
  ): Promise<journeyPlannerResponse>;

  nsrQuery<nsrResponse>(
      queryObj: Object | string,
      variables?: Object,
      ignoreFields?: Array<string>,
      config?: ServiceConfig,
  ): Promise<nsrResponse>;

  getFeatures(
    query: string,
    coords?: Coordinates,
    params?: GetFeaturesParams,
  ): Promise<Feature[]>;

  getTripPatterns(
      from: Location,
      to: Location,
      params?: GetTripPatternsParams,
      ignoreFields?: Array<string>,
  ): Promise<TripPattern[]>;

  findTrips(
    from: string,
    to: string,
    date?: Date | string | number,
  ): Promise<TripPattern[]>;

  getDeparturesFromStopPlaces(
      stopPlaceIds: Array<string>,
      params?: GetDeparturesParams,
  ): Promise<Array<DeparturesById | void>>;

  getDeparturesFromStopPlace(
      stopPlaceId: string,
      params?: GetDeparturesParams,
  ): Promise<Departure[]>;

  getDeparturesFromQuays(
      quayIds: Array<string>,
      params?: GetDeparturesParams,
  ): Promise<Array<DeparturesById | undefined>>;

  getDeparturesBetweenStopPlaces(
      fromStopPlaceId: string,
      toStopPlaceId: string,
      params?: GetDeparturesBetweenStopPlacesParams,
  ): Promise<Departure[]>;

  getDeparturesForServiceJourney(
      id: string,
      date?: string,
  ): Promise<Departure[]>;

  getNearestPlaces(
      coordinates: Coordinates,
      params?: {
          maximumDistance?: number,
          maximumResults?: number,
          filterByPlaceTypes?: Array<TypeName>,
          filterByModes?: Array<TransportMode>,
          filterByInUse?: boolean,
          multiModalMode?: 'parent' | 'child' | 'all',
      },
  ): Promise<Array<NearestPlace>>;

  getStopPlace(
      id: string,
      params?: StopPlaceParams,
  ): Promise<StopPlaceDetails>;

  getStopPlaces(
      stopPlaceId: Array<string>,
      params?: StopPlaceParams,
  ): Promise<Array<StopPlaceDetails | undefined>>;

  getParentStopPlace(
    id: string,
    params?: StopPlaceParams,
): Promise<StopPlaceDetails | null>;

  getStopPlacesByPosition(
    coordinates: Coordinates,
    distance?: number,
  ): Promise<StopPlace[]>;

  getStopPlaceFacilities(stopPlaceId: string): Promise<StopPlaceFacilities>;

  getQuaysForStopPlace(
      stopPlaceId: string,
      params?: StopPlaceParams,
  ): Promise<Quay[]>;

  getBikeRentalStation(stationId: string): Promise<BikeRentalStation>;

  getBikeRentalStations(stationIds: Array<string>): Promise<Array<BikeRentalStation | undefined>>;

  getBikeRentalStationsByPosition(
    coordinates: Coordinates,
    distance?: number,
  ): Promise<BikeRentalStation[]>;
}

export default EnturService;

/**
 * Constants
 */

// Any for of public transportation
export var AIR: 'air';
export var BICYCLE: 'bicycle';
export var BUS: 'bus';
export var CABLEWAY: 'cableway';
export var CAR: 'car';
export var COACH: 'coach';
export var WATER: 'water';
export var FUNICULAR: 'funicular';
export var LIFT: 'lift';
export var RAIL: 'rail';
export var METRO: 'metro';
export var TRAM: 'tram';
export var TRANSIT: 'transit';
export var FOOT: 'foot';

// Combine with foot and transit for park and ride.
export var CAR_PARK: 'car_park';

// Combine with foot and transit for ride and kiss
export var CAR_PICKUP: 'car_pickup';

export var AIRPORT_LINK_RAIL: 'airportLinkRail';
export var HIGH_SPEED_PASSENGER_SERVICE: 'highSpeedPassengerService';
export var HIGH_SPEED_VEHICLE_SERVICE: 'highSpeedVehicleService';
export var INTERNATIONAL_CAR_FERRY: 'internationalCarFerry';
export var LOCAL_CAR_FERRY: 'localCarFerry';
export var LOCAL_PASSENGER_FERRY: 'localPassengerFerry';
export var NATIONAL_CAR_FERRY: 'nationalCarFerry';
export var RAIL_REPLACEMENT_BUS: 'railReplacementBus';
export var REGIONAL_CAR_FERRY: 'regionalCarFerry';
export var TOURIST_RAILWAY: 'touristRailway';
export var AIRPORT_LINK_BUS: 'airportLinkBus';

export var TransportMode: {
    BUS: 'bus',
    TRAM: 'tram',
    RAIL: 'rail',
    METRO: 'metro',
    WATER: 'water',
    AIR: 'air',
    COACH: 'coach',
    CAR: 'car',
};

export var LegMode: {
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
};

export var TransportSubmode: {
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
    CITY_TRAM: 'cityTram',
};

export var ONSTREET_BUS: 'onstreetBus';
export var ONSTREET_TRAM: 'onstreetTram';
export var AIRPORT: 'airport';
export var RAIL_STATION: 'railStation';
export var METRO_STATION: 'metroStation';
export var BUS_STATION: 'busStation';
export var COACH_STATION: 'coachStation';
export var TRAM_STATION: 'tramStation';
export var HARBOUR_PORT: 'harbourPort';
export var FERRY_PORT: 'ferryPort';
export var FERRY_STOP: 'ferryStop';
export var LIFT_STATION: 'liftStation';
export var VEHICLE_RAIL_INTERCHANGE: 'vehicleRailInterchange';
export var GROUP_OF_STOPP_LACES: 'GroupOfStopPlaces';
export var POI: 'poi';
export var VEGADRESSE: 'Vegadresse';
export var STREET: 'street';
export var TETTSTEDDEL: 'tettsteddel';
export var BYDEL: 'bydel';
export var OTHER: 'other';

export var FeatureCategory: {
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
};

/**
 * Utils
 */

export function convertFeatureToLocation(feature: Feature): Location;
export function convertLocationToPosition(feature: Feature): Location;
export function convertPositionToBbox(coordinates: Coordinates, distance: number): {
    minLng: number,
    minLat: number,
    maxLng: number,
    maxLat: number,
};

export function throttler<T, U>(
  queryHandler: (T) => Promise<U>,
  queries: T[]
): Promise<U[]>;

export function isAir(mode: string): boolean;
export function isBicycle(mode: string): boolean;
export function isBus(mode: string): boolean;
export function isCableway(mode: string): boolean;
export function isCar(mode: string): boolean;
export function isCoach(mode: string): boolean;
export function isWater(mode: string): boolean;
export function isFunicular(mode: string): boolean;
export function isLift(mode: string): boolean;
export function isRail(mode: string): boolean;
export function isMetro(mode: string): boolean;
export function isTram(mode: string): boolean;
export function isTransit(mode: string): boolean;
export function isFoot(mode: string): boolean;
export function isCarPark(mode: string): boolean;
export function isCarPickup(mode: string): boolean;
