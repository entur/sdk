import { FeatureCollection, Point } from 'geojson'

import { ArgumentConfig, getServiceConfig, getGeocoderHost } from '../../config'
import { get, RequestOptions } from '../../http'

import { stringifyCommaSeparatedList, transformBoundaryParam } from '../helper'
import { Boundary, Location } from '../types'

export interface ReverseParams {
    point: {
        lat: number
        lon: number
    }
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
     * Governs the maximum number of results. Valid values 1 - 100 inclusive.
     */
    size?: number
}

export default function createReverse(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return async function reverse(
        params: ReverseParams,
        options?: RequestOptions,
    ): Promise<FeatureCollection<Point, Location>> {
        const { host, headers } = getGeocoderHost(config)
        const { sources, layers, lang, boundary, ...rest } = params

        const searchParams = {
            ...rest,
            lang: lang || 'no',
            sources: stringifyCommaSeparatedList(sources),
            layers: stringifyCommaSeparatedList(layers),
            ...transformBoundaryParam(boundary),
        }

        const url = `${host}/reverse`
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
