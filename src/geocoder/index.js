// @flow

import { get } from '../api'
import type { HostConfig } from '../config'
import type { Position } from '../flow-types/Position'

type PositionParam = {
    'focus.point.lat'?: number,
    'focus.point.lon'?: number
}


function getPositionParamsFromGeolocationResult(geolocation?: Position): PositionParam {
    if (!geolocation || geolocation.coordinates) {
        return {}
    }

    const { coordinates = {} } = geolocation
    return {
        'focus.point.lat': coordinates.latitude,
        'focus.point.lon': coordinates.longitude,
    }
}


function getLocations(
    { host, headers }: HostConfig,
    text: string,
    position?: Position,
    params?: Object = {},
): Promise<Array<Location>> {
    const searchParams = {
        ...getPositionParamsFromGeolocationResult(position),
        lang: 'no',
        text,
        ...params,
    }

    const url = `${host}/autocomplete`
    return get(url, searchParams, headers).then(data => data.features || [])
}

export default getLocations
