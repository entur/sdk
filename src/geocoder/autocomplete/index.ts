import { FeatureCollection, Point } from 'geojson'

import { ArgumentConfig, getServiceConfig, getGeocoderHost } from '../../config'
import { get, RequestOptions } from '../../http'

import { stringifyCommaSeparatedList, transformBoundaryParam } from '../helper'
import { Boundary, Focus, Location } from '../types'

interface FocusApi {
    'focus.weight'?: number
    'focus.function'?: 'linear' | 'exp'
    'focus.scale'?: string
}

function transformFocusParam(focusPoint?: Focus): FocusApi {
    if (!focusPoint) return {}

    return {
        'focus.weight': focusPoint.weight,
        'focus.function': focusPoint.function,
        'focus.scale': focusPoint.scale,
    }
}

export interface AutocompleteParams {
    text: string
    lang?: string
    focus?: Focus
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
