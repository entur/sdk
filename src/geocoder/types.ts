export interface Location {
    /**
     * The accuracy field gives information on the accuracy of the latitude/longitude point returned with the given result. This value is a property of the result itself and won't change based on the query.
     * There are currently two possible values for the accuracy field: point and centroid.
     *
     * `point` results are generally addresses, venues, or interpolated addresses. A point result means the record represents a record that can reasonably be represented by a single latitude/longitude point.
     * `centroid` results, on the other hand, are records that represent a larger area, such as a city or country. Pelias cannot currently return results with geometries made of polygons or lines, so all such records are estimated with a centroid.
     */
    accuracy?: 'point' | 'centroid'
    /**
     * A local administrative boundary
     */
    borough: string
    borough_gid: string
    /**
     * A sub-type within layers.
     */
    category: string[]
    /**
     * Country abbreviation as ISO 3166-1 alpha-3 code.
     */
    country_a: string
    country_gid: string
    /**
     * Name of county (fylke)
     *
     * @example "Nordland"
     */
    county: string
    /**
     * ID of county (prefixed with "whosonfirst:county")
     *
     * @example "whosonfirst:county:KVE:TopographicPlace:18"
     */
    county_gid: string
    /**
     * This is a general score computed to calculate how likely result is what was asked for. It's meant to be a combination of all the information available to Pelias. It's not super sophisticated, and results may not be sorted in confidence-score order. In that case results returned first should be trusted more. Confidence scores are floating point numbers ranging from 0.0 to 1.0.
     * Confidence scores are calculated differently for different endpoints:
     * For reverse geocoding it's based on distance from the reverse geocoded point. The progression of confidence scores is as follows:
     * distance             confidence score
     * less than 1 meter    1.0
     * 1 - 10 meters 	    0.9
     * 11 - 100 meters 	    0.8
     * 101 - 250 meters     0.7
     * 251 - 1000 meters    0.6
     */
    confidence?: number
    /**
     * For reverse geocoding: The feature's distance in kilometers from the circle's midpoint.
     */
    distance?: number
    gid: string
    housenumber?: string
    id: string
    /**
     * The label is a human-friendly representation of the place, with the most
     * complete details, that is ready to be displayed to an end user.
     * Examples of a label include a business or venue name with its locality,
     * a complete mailing address, or a locality with region and country names.
     * The label field attempts to use a format that is right for the region of
     * the result.
     */
    label?: string
    /**
     * The type of record is referred to as its layer. Due to limitations in
     * Pelias the definitions of layers has been re-defined and limited to the
     * following two layers:
     *
     * - venue: Stops
     * - address: POI, streets, addresses, stop groups
     */
    layer: 'venue' | 'address'
    /**
     * Name of municipality (kommune)
     *
     * @example "Oslo"
     */
    locality: string
    /**
     * ID of county (prefixed with "whosonfirst:locality")
     *
     * @example "whosonfirst:locality:KVE:TopographicPlace:0301"
     */
    locality_gid: string
    /**
     * The name is a short description of the location, such as a
     * business name, a locality name, or part of an address, depending
     * on what is being searched for and what is returned.
     *
     * For address searches, the housenumber and street properties are brought
     * together under the name property in the local standard format.
     * This saves you from having to reassemble the address yourself, including
     * to determine whether the numbers should be placed before or after the
     * street name.
     */
    name: string
    postalcode: string
    source: string
    source_id: string
    street: string
    tariff_zones?: string[]
}

export interface Boundary {
    /**
     * A bounding box to get features within. Features that are outside this box will not be returned.
     */
    rect?: {
        minLat: number
        minLon: number
        maxLat: number
        maxLon: number
    }
    /**
     * ISO 3166-1 alpha-3 country code	County code (ISO 3166-1 alpha-3) (https://no.wikipedia.org/wiki/ISO_3166-1_alfa-3)
     */
    country?: string
    /**
     * Norwegian county numbers are with prefix "KVE:TopographicPlace:"
     * https://register.geonorge.no/sosi-kodelister/fylkesnummer-alle
     *
     * Swedish county numbers are with prefix "LAN:TopographicPlace"
     * https://www.scb.se/en/finding-statistics/regional-statistics/regional-divisions/counties-and-municipalities/counties-and-municipalities-in-numerical-order/
     */
    countyIds?: string[]
    localityIds?: string[]
    /**
     * A bounding circle to get features within. Features that are outside this circle will not be returned.
     */
    circle?: {
        /**
         * The latitude of the circle midpoint.
         */
        lat?: number
        /**
         * The longitude of the circle midpoint.
         */
        lon?: number
        /**
         * The radius of the circle in kilometers.
         */
        radius: number
    }
}

export interface Focus {
    /**
     * Base weight to be applied to boosting results based on location.
     * This value will be multiplied by a factor determined by decay
     * function and scale.
     *
     * @defaultValue 15
     */
    weight?: number
    /**
     * Which decay function to apply.
     *
     * @defaultValue linear
     */
    function?: 'linear' | 'exp'
    /**
     * Controls the rate of decay, i.e. at which distance in km from the
     * given location the scoring will be given the boost factor of the default
     * decay value, which is 0.5.
     *
     * @defaultValue 2500
     */
    scale?: string
}
