import { journeyPlannerQuery, nsrQuery } from './api'

import {
    createFindTrips,
    createGetTripPatterns,
} from './trip'

import {
    createGetDeparturesFromStopPlace,
    createGetDeparturesFromStopPlaces,
    createGetDeparturesFromQuays,
    createGetDeparturesBetweenStopPlaces,
    createGetDeparturesForServiceJourney,
    getStopPlaceDeparturesDEPRECATED,
} from './departure'

import {
    createGetNearestPlaces,
} from './nearest'

import {
    createGetStopPlace,
    createGetStopPlaces,
    createGetParentStopPlace,
    createGetStopPlacesByPosition,
    createGetStopPlaceFacilities,
    createGetQuaysForStopPlace,
} from './stopPlace'

import {
    createGetBikeRentalStation,
    createGetBikeRentalStations,
    createGetBikeRentalStationsByPosition,
} from './bikeRental'

import {
    createGetFeatures,
    createGetFeaturesReverse,
} from './geocoder'

import { ArgumentConfig } from './config'

function createEnturService(config: ArgumentConfig) {
    return {
        journeyPlannerQuery,
        nsrQuery,
        getFeatures: createGetFeatures(config),
        getFeaturesReverse: createGetFeaturesReverse(config),
        getTripPatterns: createGetTripPatterns(config),
        findTrips: createFindTrips(config),
        getStopPlaceDepartures: getStopPlaceDeparturesDEPRECATED,
        getDeparturesFromStopPlace: createGetDeparturesFromStopPlace(config),
        getDeparturesFromStopPlaces: createGetDeparturesFromStopPlaces(config),
        getDeparturesFromQuays: createGetDeparturesFromQuays(config),
        getDeparturesBetweenStopPlaces: createGetDeparturesBetweenStopPlaces(config),
        getDeparturesForServiceJourney: createGetDeparturesForServiceJourney(config),
        getNearestPlaces: createGetNearestPlaces(config),
        getStopPlace: createGetStopPlace(config),
        getStopPlaces: createGetStopPlaces(config),
        getParentStopPlace: createGetParentStopPlace(config),
        getStopPlacesByPosition: createGetStopPlacesByPosition(config),
        getStopPlaceFacilities: createGetStopPlaceFacilities(config),
        getQuaysForStopPlace: createGetQuaysForStopPlace(config),
        getBikeRentalStation: createGetBikeRentalStation(config),
        getBikeRentalStations: createGetBikeRentalStations(config),
        getBikeRentalStationsByPosition: createGetBikeRentalStationsByPosition(config),
    }
}

export default createEnturService
