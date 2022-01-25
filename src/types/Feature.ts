import { FeatureCategory } from '../constants/featureCategory'

/**
 * @deprecated Use the geocoder.autocomplete and geocoder.reverse methods instead and related types.
 */
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
        tariff_zones?: string[]
    }
}
