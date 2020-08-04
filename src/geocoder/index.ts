import { get } from '../http'
import { getGeocoderHost, getServiceConfig, ArgumentConfig } from '../config'
import { Feature } from '../../types/Feature'
import { Coordinates } from '../../types/Coordinates'
import { County } from './countyIds'

interface PositionParam {
    'focus.point.lat': number
    'focus.point.lon': number
}

function getPositionParamsFromGeolocationResult(
    coords?: Coordinates,
): PositionParam | void {
    if (!coords) {
        return
    }

    const { latitude, longitude } = coords
    // eslint-disable-next-line consistent-return
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

type GetFeaturesParam = {
    'boundary.rect.min_lon'?: number // @deprecated Use boundary object instead
    'boundary.rect.max_lon'?: number // @deprecated Use boundary object instead
    'boundary.rect.min_lat'?: number // @deprecated Use boundary object instead
    'boundary.rect.max_lat'?: number // @deprecated Use boundary object instead
    'boundary.country'?: string // @deprecated Use boundary object instead
    'boundary.county_ids'?: string // @deprecated Use boundary object instead
    'boundary.locality_ids'?: string // @deprecated Use boundary object instead
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

    /* eslint-disable @typescript-eslint/camelcase */

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

    /* eslint-enable @typescript-eslint/camelcase */

    return result
}

export function createGetFeatures(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getFeatures(
        text: string,
        coords?: Coordinates,
        params: GetFeaturesParam = {},
    ): Promise<Feature[]> {
        const { host, headers } = getGeocoderHost(config)
        const { sources, layers, limit, boundary, ...rest } = params

        const searchParams = {
            text,
            lang: 'no',
            ...getPositionParamsFromGeolocationResult(coords),
            ...transformBoundaryParam(boundary),
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
            undefined,
            config.fetch,
        ).then((data) => data.features || [])
    }
}

type GetFeaturesReverseParam = {
    radius?: number
    size?: number
    layers?: string[]
}

export function createGetFeaturesReverse(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getFeaturesReverse(
        coords: Coordinates,
        params: GetFeaturesReverseParam = {},
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
            undefined,
            config.fetch,
        ).then((data) => data.features || [])
    }
}
