import { ArgumentConfig } from '../config'

import { default as createGetFareZone } from './getFareZone'
import { default as createGetGroupOfStopPlaces } from './getGroupOfStopPlaces'
import { default as createGetParking } from './getParking'
import { default as createGetParkingsForStopPlace } from './getParkingsForStopPlace'
import { default as createGetQuay } from './getQuay'
import { default as createGetStopPlace } from './getStopPlace'
import { default as createGetStopPlaceForQuay } from './getStopPlaceForQuay'
import { default as createGetTariffZone } from './getTariffZone'
import { default as createGetTopographicPlace } from './getTopographicPlace'

export interface NsrClient {
    getFareZone: ReturnType<typeof createGetFareZone>
    getGroupOfStopPlaces: ReturnType<typeof createGetGroupOfStopPlaces>
    getParking: ReturnType<typeof createGetParking>
    getParkingsForStopPlace: ReturnType<typeof createGetParkingsForStopPlace>
    getQuay: ReturnType<typeof createGetQuay>
    getStopPlace: ReturnType<typeof createGetStopPlace>
    getStopPlaceForQuay: ReturnType<typeof createGetStopPlaceForQuay>
    getTariffZone: ReturnType<typeof createGetTariffZone>
    getTopographicPlace: ReturnType<typeof createGetTopographicPlace>
}

export default function createClient(config: ArgumentConfig): NsrClient {
    return {
        getFareZone: createGetFareZone(config),
        getGroupOfStopPlaces: createGetGroupOfStopPlaces(config),
        getParking: createGetParking(config),
        getParkingsForStopPlace: createGetParkingsForStopPlace(config),
        getQuay: createGetQuay(config),
        getStopPlace: createGetStopPlace(config),
        getStopPlaceForQuay: createGetStopPlaceForQuay(config),
        getTariffZone: createGetTariffZone(config),
        getTopographicPlace: createGetTopographicPlace(config),
    }
}
