// @flow

import { get } from '../api'
import { getGeocoderHost } from '../config'
import type { Feature } from '../../flow-types/Feature'
import type { Coordinates } from '../../flow-types/Coordinates'

type PositionParam = {
    'focus.point.lat'?: number,
    'focus.point.lon'?: number
}

function getPositionParamsFromGeolocationResult(coords?: Coordinates): PositionParam {
    if (!coords) {
        return {}
    }

    const { latitude, longitude } = coords
    return {
        'focus.point.lat': latitude,
        'focus.point.lon': longitude,
    }
}

function getLocations(
    text: string,
    coords?: Coordinates,
    params?: Object = {},
): Promise<Array<Feature>> {
    const { host, headers } = getGeocoderHost(this.config)
    const searchParams = {
        ...getPositionParamsFromGeolocationResult(coords),
        lang: 'no',
        text,
        ...params,
    }

    const url = `${host}/autocomplete`
    return get(url, searchParams, headers).then(data => data.features || [])
}

export default getLocations
