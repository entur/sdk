// @flow
import { journeyPlannerQuery, nsrQuery } from './api'
import {
    getTripPatterns, getStopPlaceDepartures, findTrips,
} from './trip'
import {
    getStopPlace,
    getStopPlacesByPosition,
    getStopPlaceFacilities,
} from './stopPlace'
import { getBikeRentalStation, getBikeRentalStations } from './bikeRental'
import { getFeatures } from './geocoder'
import { getServiceConfig } from './config'
import type { ServiceConfig, ArgumentConfig } from './config'


class EnturService {
    config: ServiceConfig;

    constructor(config: ArgumentConfig) {
        this.config = getServiceConfig(config)
    }

    journeyPlannerQuery = journeyPlannerQuery

    nsrQuery = nsrQuery

    getFeatures = getFeatures

    getTripPatterns = getTripPatterns

    findTrips = findTrips

    getStopPlaceDepartures = getStopPlaceDepartures

    getStopPlace = getStopPlace

    getStopPlacesByPosition = getStopPlacesByPosition

    getStopPlaceFacilities = getStopPlaceFacilities

    getBikeRentalStation = getBikeRentalStation

    getBikeRentalStations= getBikeRentalStations
}

export default EnturService
