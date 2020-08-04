import { get } from '../http'
import { getGeocoderHost, getServiceConfig, ArgumentConfig } from '../config'
import { Feature } from '../../types/Feature'
import { Coordinates } from '../../types/Coordinates'

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

type GetFeaturesParam = {
    'boundary.rect.min_lon'?: number
    'boundary.rect.max_lon'?: number
    'boundary.rect.min_lat'?: number
    'boundary.rect.max_lat'?: number
    'boundary.country'?: string
    'boundary.county_ids'?: string[]
    'boundary.locality_ids'?: string[]
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

export function createGetFeatures(argConfig: ArgumentConfig) {
    const config = getServiceConfig(argConfig)

    return function getFeatures(
        text: string,
        coords?: Coordinates,
        params: GetFeaturesParam = {},
    ): Promise<Feature[]> {
        const { host, headers } = getGeocoderHost(config)
        const { sources, layers, limit, ...rest } = params

        const searchParams = {
            text,
            lang: 'no',
            ...getPositionParamsFromGeolocationResult(coords),
            sources: stringifyCommaSeparatedList(sources),
            layers: stringifyCommaSeparatedList(layers),
            'boundary.county_ids': stringifyCommaSeparatedList(
                params['boundary.county_ids'],
            ),
            'boundary.locality_ids': stringifyCommaSeparatedList(
                params['boundary.locality_ids'],
            ),
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
