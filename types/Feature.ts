/* eslint-disable camelcase */
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

export type Feature = {
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
        category: Array<Category>
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
