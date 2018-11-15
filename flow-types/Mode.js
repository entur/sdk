// @flow
export type TransportMode =
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


export type LegMode =
    | TransportMode
    | 'bicycle'
    | 'foot'
    // | 'transit'
    // | 'car_park'
    // | 'car_pickup'


export type TransportSubmode =
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
