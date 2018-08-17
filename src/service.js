// @flow
import { getTripPatterns, getStopPlaceDepartures, getStopPlacesByPosition } from './trip'
import { getBikeRentalStation, getBikeRentalStations } from './bikeRental'
import getLocations from './geocoder'
import { getServiceConfig } from './config'
import type { ServiceConfig, ArgumentConfig } from './config'


class EnturService {
    config: ServiceConfig;

    constructor(config: ArgumentConfig) {
        this.config = getServiceConfig(config)
    }

    getLocations = getLocations

    getTripPatterns = getTripPatterns

    getStopPlaceDepartures = getStopPlaceDepartures

    getStopPlacesByPosition = getStopPlacesByPosition

    getBikeRentalStation = getBikeRentalStation

    getBikeRentalStations= getBikeRentalStations
}

export default EnturService
