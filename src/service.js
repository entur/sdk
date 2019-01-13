// @flow
import { journeyPlannerQuery, nsrQuery } from './api'
import {
    findTrips,
    getTripPatterns,
    getDeparturesForStopPlace,
    getDeparturesForStopPlaces,
    getDeparturesForQuays,
    getStopPlaceDeparturesDEPRECATED,
} from './trip'
import {
    getStopPlace,
    getStopPlacesByPosition,
    getStopPlaceFacilities,
    getQuaysForStopPlace,
} from './stopPlace'
import {
    getBikeRentalStation,
    getBikeRentalStationsByPosition,
    getBikeRentalStationsDEPRECATED,
} from './bikeRental'
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

    getStopPlaceDepartures = getStopPlaceDeparturesDEPRECATED

    getDeparturesForStopPlace = getDeparturesForStopPlace

    getDeparturesForStopPlaces = getDeparturesForStopPlaces

    getDeparturesForQuays = getDeparturesForQuays

    getStopPlace = getStopPlace

    getStopPlacesByPosition = getStopPlacesByPosition

    getStopPlaceFacilities = getStopPlaceFacilities

    getQuaysForStopPlace = getQuaysForStopPlace

    getBikeRentalStation = getBikeRentalStation

    getBikeRentalStationsByPosition = getBikeRentalStationsByPosition

    getBikeRentalStations = getBikeRentalStationsDEPRECATED
}

export default EnturService
