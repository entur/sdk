// @flow

/**
 * Representation of Graphql fragment 'Place' in commons/data/itineraries.js
 * and commons/data/stopPlaceConnections
 * The fields that are common in both places are required, the rest are optional
 */

import type { Alert } from './Alert'

export type Place = {
    name: string,
    lat: number,
    lon: number,
    stop: {
        name: string,
        id: string,
        gtfsId: string,
        code: string,
        desc: string,
        platformCode: string,
        alerts: Array<Alert>,
        direction?: string,
        parentStation?: {
            name: string,
            desc: string,
            direction: string,
            gtfsId: string,
        },
    }
}
