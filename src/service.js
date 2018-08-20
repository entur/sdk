// @flow
import { getTripPatterns, getStopPlaceDepartures, getStopPlacesByPosition } from './trip'
import { getBikeRentalStation, getBikeRentalStations } from './bikeRental'
import { getFeatures, getLocationsDEPRECATED } from './geocoder'
import { getServiceConfig } from './config'
import type { ServiceConfig, ArgumentConfig } from './config'


class EnturService {
    config: ServiceConfig;

    constructor(config: ArgumentConfig) {
        this.config = getServiceConfig(config)
    }

    getFeatures = getFeatures

    getLocations = getLocationsDEPRECATED

    getTripPatterns = getTripPatterns

    getStopPlaceDepartures = getStopPlaceDepartures

    getStopPlacesByPosition = getStopPlacesByPosition

    getBikeRentalStation = getBikeRentalStation

    getBikeRentalStations= getBikeRentalStations
}

export default EnturService
