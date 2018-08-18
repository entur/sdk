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

export function getFeatures(
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

// preserve backwards compatebility
export function getLocationsDEPRECATED(
    text: string,
    params?: Object = {},
): Promise<Array<Feature>> {
    // eslint-disable-next-line
    console.info('service.getLocations is depreacted and will be removed in a future version. Use service.getFeatures instead')
    return getFeatures.call(this, text, undefined, params)
}
