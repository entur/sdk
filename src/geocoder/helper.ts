import { Boundary, Focus } from './types'

export function stringifyCommaSeparatedList(
    value: string | string[] | undefined,
): string | undefined {
    if (!value) return undefined
    if (typeof value === 'string') return value
    return value.join(',')
}

interface BoundaryApi {
    'boundary.rect.min_lon'?: number
    'boundary.rect.max_lon'?: number
    'boundary.rect.min_lat'?: number
    'boundary.rect.max_lat'?: number
    'boundary.country'?: string
    'boundary.county_ids'?: string
    'boundary.locality_ids'?: string
    'boundary.circle.lat'?: number
    'boundary.circle.lon'?: number
    'boundary.circle.radius'?: number
}

export function transformBoundaryParam(boundary?: Boundary): BoundaryApi {
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

    const radius = boundary?.circle?.radius

    if (typeof radius === 'number') {
        result = {
            ...result,
            'boundary.circle.radius': radius,
        }

        if (boundary?.circle?.lat && boundary?.circle?.lon) {
            result = {
                ...result,
                'boundary.circle.lat': boundary.circle.lat,
                'boundary.circle.lon': boundary.circle.lon,
            }
        }
    }

    return result
}

interface FocusApi {
    'focus.point.lat': number
    'focus.point.lon': number
    'focus.weight'?: number
    'focus.function'?: 'linear' | 'exp'
    'focus.scale'?: number
}

export function transformFocusParam(focus?: Focus): FocusApi | undefined {
    if (!focus) return

    return {
        'focus.point.lat': focus.point.lat,
        'focus.point.lon': focus.point.lon,
        'focus.weight': focus.weight,
        'focus.function': focus.function,
        'focus.scale': focus.scale,
    }
}
