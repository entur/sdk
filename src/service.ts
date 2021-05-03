import { RequestOptions } from './http'
import { journeyPlannerQuery, nsrQuery } from './api'

import { createFindTrips, createGetTripPatterns } from './trip'

import {
    createGetDeparturesFromStopPlace,
    createGetDeparturesFromStopPlaces,
    createGetDeparturesFromQuays,
    createGetDeparturesBetweenStopPlaces,
    createGetDeparturesForServiceJourney,
    getStopPlaceDeparturesDEPRECATED,
} from './departure'

import { createGetNearestPlaces } from './nearest'

import {
    createGetStopPlace,
    createGetStopPlaces,
    createGetParentStopPlace,
    createGetStopPlacesByPosition,
    createGetStopPlaceFacilities,
    createGetQuaysForStopPlace,
} from './stopPlace'

import {createGetOperators, createGetVehicles} from './mobility'

import {
    createGetBikeRentalStation,
    createGetBikeRentalStations,
    createGetBikeRentalStationsByPosition,
} from './bikeRental'

import { createGetScootersByPosition } from './scooters'

import { createGetFeatures, createGetFeaturesReverse } from './geocoder'

import { ArgumentConfig, getServiceConfig, ServiceConfig } from './config'

function createEnturService(config: ArgumentConfig) {
    return {
        journeyPlannerQuery: <T>(
            query: string,
            variables: Record<string, unknown>,
            config: ServiceConfig,
        ): Promise<T> => {
            if (process.env.NODE_ENV !== 'production') {
                console.warn(
                    'journeyPlannerQuery is deprecated and will be removed in a future release. Please use queryJourneyPlanner instead.',
                )
            }
            return journeyPlannerQuery(query, variables, config)
        },
        queryJourneyPlanner: <T>(
            queryObj: string,
            variables: Record<string, unknown>,
            options?: RequestOptions,
        ): Promise<T> =>
            journeyPlannerQuery(
                queryObj,
                variables,
                getServiceConfig(config),
                options,
            ),
        nsrQuery: <T>(
            query: string,
            variables: Record<string, unknown>,
            config: ServiceConfig,
        ): Promise<T> => {
            if (process.env.NODE_ENV !== 'production') {
                console.warn(
                    'nsrQuery is deprecated and will be removed in a future release. Please use queryNsr instead.',
                )
            }
            return nsrQuery(query, variables, config)
        },
        queryNsr: <T>(
            queryObj: string,
            variables: Record<string, unknown>,
            options?: RequestOptions,
        ): Promise<T> =>
            nsrQuery(queryObj, variables, getServiceConfig(config), options),
        getFeatures: createGetFeatures(config),
        getFeaturesReverse: createGetFeaturesReverse(config),
        getTripPatterns: createGetTripPatterns(config),
        findTrips: createFindTrips(config),
        getStopPlaceDepartures: getStopPlaceDeparturesDEPRECATED,
        getDeparturesFromStopPlace: createGetDeparturesFromStopPlace(config),
        getDeparturesFromStopPlaces: createGetDeparturesFromStopPlaces(config),
        getDeparturesFromQuays: createGetDeparturesFromQuays(config),
        getDeparturesBetweenStopPlaces: createGetDeparturesBetweenStopPlaces(
            config,
        ),
        getDeparturesForServiceJourney: createGetDeparturesForServiceJourney(
            config,
        ),
        getNearestPlaces: createGetNearestPlaces(config),
        getStopPlace: createGetStopPlace(config),
        getStopPlaces: createGetStopPlaces(config),
        getParentStopPlace: createGetParentStopPlace(config),
        getStopPlacesByPosition: createGetStopPlacesByPosition(config),
        getStopPlaceFacilities: createGetStopPlaceFacilities(config),
        getQuaysForStopPlace: createGetQuaysForStopPlace(config),
        getBikeRentalStation: createGetBikeRentalStation(config),
        getBikeRentalStations: createGetBikeRentalStations(config),
        getBikeRentalStationsByPosition: createGetBikeRentalStationsByPosition(
            config,
        ),
        getScootersByPosition: createGetScootersByPosition(config),
        mobility: {
            getVehicles: createGetVehicles(config),
            getOperators: createGetOperators(config),
        },
    }
}

export default createEnturService
