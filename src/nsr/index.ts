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

export default function createClient(config: ArgumentConfig) {
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
