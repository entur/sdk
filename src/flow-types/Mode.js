// @flow
export type TransportMode =
    'air' |
    'bus' |
    // 'cableway' |
    'water' |
    // 'funicular' |
    // 'lift' |
    'rail' |
    'metro' |
    'tram' // |
    // 'coach' |
    // 'unknown'


export type LegMode =
    TransportMode |
    'bicycle' |
    'coach' |
    'foot' // |
    // 'car' |
    // 'transit' |
    // 'car_park' |
    // 'car_pickup' |


export type TransportSubmode =
    'airportLinkRail' |
    'highSpeedPassengerService' |
    'highSpeedVehicleService' |
    'internationalCarFerry' |
    'localCarFerry' |
    'localPassengerFerry' |
    'nationalCarFerry' |
    'railReplacementBus' |
    'regionalCarFerry' |
    'touristRailway'
