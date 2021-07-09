import { FeatureCollection, Point } from 'geojson'

import { ArgumentConfig, getServiceConfig, getGeocoderHost } from '../../config'
import { get, RequestOptions } from '../../http'

import { stringifyCommaSeparatedList, transformBoundaryParam } from '../helper'
import { Boundary, Location } from '../types'

export default function createReverse(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return async function reverse(
        params: {
            point: {
                lat: number
                lon: number
            }
            lang?: string
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
        },
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
