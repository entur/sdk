import { get, RequestOptions } from '../http'
import { getGeocoderHost, getServiceConfig, ArgumentConfig } from '../config'
import { Feature } from '../types/Feature'
import { Coordinates } from '../types/Coordinates'
import { County } from './countyIds'

interface PositionParam {
    'focus.point.lat': number
    'focus.point.lon': number
}

function getPositionParamsFromGeolocationResult(
    coords?: Coordinates,
): PositionParam | undefined {
    if (!coords) {
        return
    }

    const { latitude, longitude } = coords
    return {
        'focus.point.lat': latitude,
        'focus.point.lon': longitude,
    }
}

interface Boundary {
    rect?: {
        minLat: number
        minLon: number
        maxLat: number
        maxLon: number
    }
    country?: string
    countyIds?: County[]
    localityIds?: string[]
}

interface BoundaryApi {
    'boundary.rect.min_lon'?: number
    'boundary.rect.max_lon'?: number
    'boundary.rect.min_lat'?: number
    'boundary.rect.max_lat'?: number
    'boundary.country'?: string
    'boundary.county_ids'?: string
    'boundary.locality_ids'?: string
}

interface FocusApi {
    'focus.weight'?: number
    'focus.function'?: 'linear' | 'exp'
    'focus.scale'?: string
}

export interface GetFeaturesParams {
    /** @deprecated Use boundary object instead */
    'boundary.rect.min_lon'?: number
    /** @deprecated Use boundary object instead */
    'boundary.rect.max_lon'?: number
    /** @deprecated Use boundary object instead */
    'boundary.rect.min_lat'?: number
    /** @deprecated Use boundary object instead */
    'boundary.rect.max_lat'?: number
    /** @deprecated Use boundary object instead */
    'boundary.country'?: string
    /** @deprecated Use boundary object instead */
    'boundary.county_ids'?: string
    /** @deprecated Use boundary object instead */
    'boundary.locality_ids'?: string
    boundary?: {
        rect?: {
            minLat: number
            minLon: number
            maxLat: number
            maxLon: number
        }
        country?: string
        countyIds?: County[]
        localityIds?: string[]
    }
    focus?: {
        /**
         * Base weight to be applied to boosting results based on location. This value will be multiplied by a factor determined by decay function and scale.
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
         * Controls the rate of decay, i.e. at which distance in km from the given location the scoring will be given the boost factor of the default decay value, which is 0.5.
         *
         * @defaultValue 2500
         */
        scale?: string
    }
    multiModal?: 'parent' | 'child' | 'all'
    sources?: string[]
    layers?: string[]
    limit?: number
}

function stringifyCommaSeparatedList(
    value: string | string[] | undefined,
): string | undefined {
    if (!value) return undefined
    if (typeof value === 'string') return value
    return value.join(',')
}

function transformBoundaryParam(boundary?: Boundary): BoundaryApi {
    if (!boundary) return {}

    let result: BoundaryApi = {
        'boundary.country': boundary.country,
        'boundary.county_ids': stringifyCommaSeparatedList(boundary.countyIds),
        'boundary.locality_ids': stringifyCommaSeparatedList(
            boundary.localityIds,
        ),
    }

    if (boundary.rect) {
        result = {
            ...result,
            'boundary.rect.min_lat': boundary.rect.minLat,
            'boundary.rect.min_lon': boundary.rect.minLon,
            'boundary.rect.max_lat': boundary.rect.maxLat,
            'boundary.rect.max_lon': boundary.rect.maxLon,
        }
    }

    return result
}

function transformFocusParam(
    focusPoint?: GetFeaturesParams['focus'],
): FocusApi {
    if (!focusPoint) return {}

    return {
        'focus.weight': focusPoint.weight,
        'focus.function': focusPoint.function,
        'focus.scale': focusPoint.scale,
    }
}

export function createGetFeatures(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getFeatures(
        text: string,
        coords?: Coordinates,
        params: GetFeaturesParams = {},
        options?: RequestOptions,
    ): Promise<Feature[]> {
        const { host, headers } = getGeocoderHost(config)
        const { sources, layers, limit, boundary, focus, ...rest } = params

        const searchParams = {
            text,
            lang: 'no',
            ...getPositionParamsFromGeolocationResult(coords),
            ...transformBoundaryParam(boundary),
            ...transformFocusParam(focus),
            sources: stringifyCommaSeparatedList(sources),
            layers: stringifyCommaSeparatedList(layers),
            size: limit,
            ...rest,
        }

        const url = `${host}/autocomplete`
        return get<{ features?: Feature[] }>(
            url,
            searchParams,
            headers,
            config.fetch,
            options,
        ).then((data) => data.features || [])
    }
}

export interface GetFeaturesReverseParam {
    radius?: number
    size?: number
    layers?: string[]
}

export function createGetFeaturesReverse(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getFeaturesReverse(
        coords: Coordinates,
        params: GetFeaturesReverseParam = {},
        options?: RequestOptions,
    ): Promise<Feature[]> {
        const { host, headers } = getGeocoderHost(config)

        const searchParams = {
            'point.lat': coords.latitude,
            'point.lon': coords.longitude,
            'boundary.circle.radius': params.radius,
            size: params.size,
            layers:
                params.layers && Array.isArray(params.layers)
                    ? params.layers.join(',')
                    : undefined,
        }

        const url = `${host}/reverse`
        return get<{ features?: Feature[] }>(
            url,
            searchParams,
            headers,
            config.fetch,
            options,
        ).then((data) => data.features || [])
    }
}
