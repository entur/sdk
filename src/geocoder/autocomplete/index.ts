import { FeatureCollection, Point } from 'geojson'

import { ArgumentConfig, getServiceConfig, getGeocoderHost } from '../../config'
import { get, RequestOptions } from '../../http'

import {
    stringifyCommaSeparatedList,
    transformBoundaryParam,
    transformFocusParam,
} from '../helper'
import { Boundary, Focus, Location } from '../types'

export interface AutocompleteParams {
    /**
     * The search query to find matching locations for.
     *
     * @example "Oslo S"
     */
    text: string
    /**
     * You can get search results in another language, if available, by
     * specifying a target language code with your request following the
     * BCP47 standard (https://www.rfc-editor.org/rfc/bcp/bcp47.txt).
     *
     * By default, search responses are in the default locale of the dataset.
     * However, if you include a language code, the search attempts to return
     * place names in the language you specified.
     *
     * If the language you requested is unavailable, then the default language
     * is returned. In some cases, this is the local dialect, or it may be
     * English for other datasets.
     *
     * @defaultValue "no"
     */
    lang?: string
    /**
     * To focus your search based upon a geographical area, such as the center
     * of the user's map or at the device's GPS location, supply a focus point.
     * This boosts locally relevant results higher.
     */
    focus?: Focus
    /**
     * You can set a boundary to filter results by a geographical region.
     */
    boundary?: Boundary
    sources?: string[]
    /**
     * The type of record is referred to as its layer. Due to limitations in
     * Pelias the definitions of layers has been re-defined and limited to the
     * following two layers:
     *
     * - venue: Stops
     * - address: POI, streets, addresses, stop groups
     */
    layers?: Array<'address' | 'venue'>
    /**
     * Controls whether the search returns multimodal stops, child stops of the
     * multimodal stops, or both. Does not affect monomodal stops.
     *
     * @defaultValue 'parent'
     */
    multiModal?: 'parent' | 'child' | 'all'
    /**
     * Governs the maximum number of results. Valid values are from 1 to 100 inclusive.
     */
    size?: number
    tariffZoneAuthorities?: string[]
    tariffZoneIds?: string[]
}

export default function createAutocomplete(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return async function autocomplete(
        params: AutocompleteParams,
        options?: RequestOptions,
    ): Promise<FeatureCollection<Point, Location>> {
        const { host, headers } = getGeocoderHost(config)
        const {
            sources,
            layers,
            lang,
            boundary,
            focus,
            tariffZoneAuthorities,
            tariffZoneIds,
            ...rest
        } = params

        const searchParams = {
            ...rest,
            lang: lang || 'no',
            sources: stringifyCommaSeparatedList(sources),
            layers: stringifyCommaSeparatedList(layers),
            tariff_zone_authorities: stringifyCommaSeparatedList(
                tariffZoneAuthorities,
            ),
            tariff_zone_ids: stringifyCommaSeparatedList(tariffZoneIds),
            ...transformBoundaryParam(boundary),
            ...transformFocusParam(focus),
        }

        const url = `${host}/autocomplete`
        const data = await get<FeatureCollection<Point, Location>>(
            url,
            searchParams,
            headers,
            config.fetch,
            options,
        )

        return data
    }
}
