// @flow

type $entur$sdk$Longitude = number
type $entur$sdk$Latitude = number

type $entur$sdk$Coordinates = {
    latitude: $entur$sdk$Latitude,
    longitude: $entur$sdk$Longitude,
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
    // | 'car'
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
    from: Location,
    to: Location,
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

        getFeatures(query: string): Promise<Array<$entur$sdk$Feature>>,

        getTripPatterns(
            query: $entur$sdk$TripPatternsQuery
        ): Promise<Array<$entur$sdk$TripPattern>>,

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

    // Utils
    declare export function convertFeatureToLocation(feature: $entur$sdk$Feature): Location
    declare export function convertLocationToPosition(feature: $entur$sdk$Feature): Location
    declare export function convertPositionToBbox(coordinates: Coordinates, distance: number): {
        minLng: number,
        minLat: number,
        maxLng: number,
        maxLat: number,
    }
}
