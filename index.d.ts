export interface Config {
    clientName: string,
    hosts?: {
        journeyPlanner?: string,
        geocoder?: string,
    }
}

export interface ServiceConfig {
    clientName: string,
    hosts: {
        journeyplanner: string,
        geocoder: string,
    },
}

export interface Alert {
  id?: string;
  alertDescriptionText: string;
  alertHeaderText: string;
  effectiveStartDate: number;
  effectiveEndDate: number;
}

export interface Authority {
  id: string;
  name: string;
  url?: string;
}

export interface BikeRentalStation {
  id: string;
  name: string;
  bikesAvailable: number;
  spacesAvailable: number;
  longitude: number;
  latitude: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface DestinationDisplay {
  frontText: string;
}

export interface EstimatedCall {
  realtime: boolean;
  quay: Quay;
  forAlighting?: boolean;
  forBoarding?: boolean;
  aimedDepartureTime: string;
  expectedDepartureTime: string;
  destinationDisplay?: DestinationDisplay;
  serviceJourney: ServiceJourney;
  intermediateEstimatedCalls: Array<IntermediateEstimatedCall>;
  situations: Array<Situation>;
  notices?: Array<Notice>;
}

type Latitude = number;
type Longitude = number;

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

export interface Feature {
  geometry: {
    coordinates: [Longitude, Latitude];
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

export interface IntermediateEstimatedCall {
  quay: { id: string; name: string };
  forAlighting?: boolean;
  forBoarding?: boolean;
  aimedDepartureTime: string;
  expectedDepartureTime?: string; // Only available BEFORE departure has taken place
  actualDepartureTime?: string; // Only available AFTER departure has taken place
}

export interface JourneyPattern {
  id: string;
  line: Line;
  name: string;
  notices: Array<Notice>;
}

export interface Leg {
  aimedEndTime: string;
  aimedStartTime: string;
  authority?: Authority;
  distance?: number;
  duration?: number;
  fromPlace: Place;
  toPlace: Place;
  intermediateEstimatedCalls: Array<IntermediateEstimatedCall>;
  intermediateQuays: Array<Quay>;
  line?: Line;
  mode: LegMode;
  operator?: Operator;
  pointsOnLink: PointsOnLink;
  realtime: boolean;
  ride: boolean;
  serviceJourney: ServiceJourney;
  expectedEndTime?: string;
  expectedStartTime?: string;
  situations: Array<Situation>;
}

export interface Line {
  id: string;
  publicCode: string;
  name: string;
  transportMode: LegMode;
  transportSubmode: TransportSubmode;
  description?: string;
  notices?: Array<Notice>;
  presentation: {
    colour: string;
    textColour: string;
  };
}

export interface Location {
  name: string;
  place?: string;
  coordinates?: Coordinates;
}

export type TransportMode =
  | "air"
  | "bus"
  // | 'cableway'
  | "water"
  // | 'funicular'
  // | 'lift'
  | "rail"
  | "metro"
  | "tram"
  | "coach"
  | "car";
// | 'unknown'

export type LegMode = TransportMode | "bicycle" | "foot";
// | 'transit'
// | 'car_park'
// | 'car_pickup'

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

export interface MultilingualString {
  lang: string;
  value: string;
}

export interface Notice {
  text: string;
}

export interface Operator {
  id: string;
  name: string;
  url?: string;
}

export interface Place {
  name: string;
  latitude: number;
  longitude: number;
  quay: Quay;
}

export interface PointsOnLink {
  points: string;
  length: number;
}

export interface Price {
  amount: string;
  taxAmount: string;
  taxRate: string;
  currency: string;
}

export interface Quay {
  id: string;
  name: string;
  description?: string;
  publicCode: string;
  situations?: Array<Situation>;
}

export interface ServiceJourney {
  id: string;
  journeyPattern: JourneyPattern;
  notices: Array<Notice>;
  situations: Array<Situation>;
  privateCode?: string;
  linePublicCode?: string;
  transportSubmode?: TransportSubmode,
  wheelchairAccessible?: "noInformation" | "possible" | "notPossible";
}

interface ValidityPeriod {
  startTime: string;
  endTime: string;
}

export type ReportType = "general" | "incident" | null;

export interface Situation {
  situationNumber: string;
  summary: Array<MultilingualString>;
  description: Array<MultilingualString>;
  detail: Array<MultilingualString>;
  validityPeriod: ValidityPeriod;
  reportType: ReportType;
}

export interface StopPlace {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  wheelchairBoarding: boolean;
  weighting: any;
  transportMode: Array<string>;
  transportSubmode: string;
  quays: Array<Quay>;
}

export interface TripPattern {
  duration: number;
  endTime: string;
  legs: Array<Leg>;
  startTime: string;
  waitingTime: number;
  walkDistance: number;
}

export interface TripPatternsQuery {
  searchDate: Date;
  from: Location;
  to: Location;
  arriveBy?: boolean;
  modes?: LegMode[];
  limit?: number;
  wheelchairAccessible?: boolean;
}

export interface GetFeaturesQuery {
  layers: string;
}

export interface GetStopPlaceDeparturesParams {
  startTime?: string;
  timeRange?: number;
  departures?: number;
  includeNonBoarding?: boolean;
}

declare class EnturService {
  constructor(args: Config);
  journeyPlannerQuery<journeyPlannerResponse>(
      queryObj: Object | string,
      variables?: Object,
      ignoreFields?: Array<string>,
      config?: ServiceConfig,
  ): Promise<journeyPlannerResponse>;
  findTrips(
    from: string,
    to: string,
    date?: Date | string | number
  ): Promise<TripPattern[]>;
  getBikeRentalStation(stationId: string): Promise<BikeRentalStation>;
  getBikeRentalStations(
    coordinates: Coordinates,
    distance?: number
  ): Promise<BikeRentalStation[]>;
  getFeatures(
    query: string,
    coords?: Coordinates,
    params?: GetFeaturesQuery
  ): Promise<Feature[]>;
  getStopPlace(id: string): Promise<StopPlace>;
  getStopPlaceDepartures(
    stopPlaceId: string,
    params?: GetStopPlaceDeparturesParams
  ): Promise<EstimatedCall[]>;
  getStopPlaceDepartures(
    stopPlaceIds: string[],
    params?: GetStopPlaceDeparturesParams
  ): Promise<Array<{ id: string; departures: EstimatedCall[] }>>;
  getStopPlacesByPosition(
    coordinates: Coordinates,
    distance?: number
  ): Promise<StopPlace[]>;
  getTripPatterns(query: TripPatternsQuery): Promise<Array<TripPattern>>;
}

export function throttler<T, U>(
  queryHandler: (T) => Promise<U>,
  queries: T[]
): Promise<U[]>;

export default EnturService;
