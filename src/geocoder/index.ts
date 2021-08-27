import { ArgumentConfig } from '../config'

import { default as createAutocomplete } from './autocomplete'
import { default as createReverse } from './reverse'

export interface GeocoderClient {
    /**
     * Search for features using a search string. This is useful for
     * autosuggest search fields.
     *
     * If you are building an end-user application, you can use the
     * `autocomplete` method to enable real-time feedback. This type-ahead
     * functionality helps users find what they are looking for, without
     * requiring them to fully specify their search term. Typically, the user
     * starts typing and a drop-down list appears where they can choose the
     * term from the list below.
     *
     * Please throttle or debounce your calls to avoid bursts of requests.
     *
     * @example Searching for locations with name similar to "Oslo S"
     *
     * ```typescript
     * import { Feature, Point } from 'geojson'
     * import createEnturService, { GeocoderTypes } from '@entur/sdk'
     * // or: const createEnturService = require('@entur/sdk').default
     *
     * const service = createEnturService({
     *    clientName: 'awesomecompany-awesomeapp',
     * })
     *
     * async function example() {
     *    try {
     *        const featureCollection = await service.geocoder.autocomplete({
     *            text: 'Oslo S',
     *        })
     *
     *        const features: Array<Feature<Point, GeocoderTypes.Location>> =
     *            featureCollection.features
     *
     *         console.log(features)
     *     } catch (error) {
     *         console.error(error)
     *     }
     * }
     *
     * example()
     * ```
     */
    autocomplete: ReturnType<typeof createAutocomplete>
    /**
     * Find features within a geographical area, defined by a coordinate and a radius.
     *
     * Reverse geocoding is used for finding places or addresses near a
     * latitude, longitude pair—like clicking on a map to see what's there when
     * the map doesn't show it otherwise. For example, picture a map showing
     * building outlines but no labels, then clicking on a building and being
     * shown the name of the business. That's reverse geocoding.
     *
     * @example Finding locations within 2 km of Oslo City Hall (Rådhuset).
     *
     * ```typescript
     * import { Feature, Point } from 'geojson'
     * import createEnturService, { GeocoderTypes } from '@entur/sdk'
     * // or: const createEnturService = require('@entur/sdk').default
     *
     * const service = createEnturService({
     *     clientName: 'awesomecompany-awesomeapp',
     * })
     *
     * async function example() {
     *     try {
     *         const featureCollection = await service.geocoder.reverse({
     *             point: {
     *                 lat: 59.9127992,
     *                 lon: 10.7344255,
     *             },
     *             boundary: {
     *                 circle: {
     *                     radius: 2
     *                 }
     *             }
     *         })
     *
     *         const features: Array<Feature<Point, GeocoderTypes.Location>> =
     *             featureCollection.features
     *
     *         console.log(features)
     *     } catch (error) {
     *         console.error(error)
     *     }
     * }
     *
     * example()
     * ```
     */
    reverse: ReturnType<typeof createReverse>
}

export default function createClient(config: ArgumentConfig): GeocoderClient {
    return {
        autocomplete: createAutocomplete(config),
        reverse: createReverse(config),
    }
}
