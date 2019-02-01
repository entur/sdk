// @flow
import { journeyPlannerQuery, nsrQuery } from './api'
import {
    findTrips,
    getTripPatterns,
} from './trip'
import {
    getDeparturesFromStopPlace,
    getDeparturesFromStopPlaces,
    getDeparturesFromQuays,
    getStopPlaceDeparturesDEPRECATED,
} from './departure'
import {
    getStopPlace,
    getStopPlaces,
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

    getDeparturesFromStopPlace = getDeparturesFromStopPlace

    getDeparturesFromStopPlaces = getDeparturesFromStopPlaces

    getDeparturesFromQuays = getDeparturesFromQuays

    getStopPlace = getStopPlace

    getStopPlaces = getStopPlaces

    getStopPlacesByPosition = getStopPlacesByPosition

    getStopPlaceFacilities = getStopPlaceFacilities

    getQuaysForStopPlace = getQuaysForStopPlace

    getBikeRentalStation = getBikeRentalStation

    getBikeRentalStationsByPosition = getBikeRentalStationsByPosition

    getBikeRentalStations = getBikeRentalStationsDEPRECATED
}

export default EnturService
