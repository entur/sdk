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

import { default as createGeocoderClient, GeocoderClient } from './geocoder'

import { default as createMobilityClient, MobilityClient } from './mobility'

import { default as createNsrClient, NsrClient } from './nsr'

import {
    createGetBikeRentalStation,
    createGetBikeRentalStations,
    createGetBikeRentalStationsByPosition,
} from './bikeRental'

import { createGetScootersByPosition } from './scooters'

import { createGetFeatures, createGetFeaturesReverse } from './geocoderLegacy'

import { ArgumentConfig, getServiceConfig } from './config'

export interface EnturClient {
    queryJourneyPlanner: <T>(
        queryObj: string,
        variables: Record<string, unknown>,
        options?: RequestOptions,
    ) => Promise<T>
    queryNsr: <T>(
        queryObj: string,
        variables: Record<string, unknown>,
        options?: RequestOptions,
    ) => Promise<T>
    getFeatures: ReturnType<typeof createGetFeatures>
    getFeaturesReverse: ReturnType<typeof createGetFeaturesReverse>
    getTripPatterns: ReturnType<typeof createGetTripPatterns>
    findTrips: ReturnType<typeof createFindTrips>
    getStopPlaceDepartures: typeof getStopPlaceDeparturesDEPRECATED
    getDeparturesFromStopPlace: ReturnType<
        typeof createGetDeparturesFromStopPlace
    >
    getDeparturesFromStopPlaces: ReturnType<
        typeof createGetDeparturesFromStopPlaces
    >
    getDeparturesFromQuays: ReturnType<typeof createGetDeparturesFromQuays>
    getDeparturesBetweenStopPlaces: ReturnType<
        typeof createGetDeparturesBetweenStopPlaces
    >
    getDeparturesForServiceJourney: ReturnType<
        typeof createGetDeparturesForServiceJourney
    >
    getNearestPlaces: ReturnType<typeof createGetNearestPlaces>
    getStopPlace: ReturnType<typeof createGetStopPlace>
    getStopPlaces: ReturnType<typeof createGetStopPlaces>
    getParentStopPlace: ReturnType<typeof createGetParentStopPlace>
    getStopPlacesByPosition: ReturnType<typeof createGetStopPlacesByPosition>
    /**
     * @deprecated Use methods nsr.getStopPlace, nsr.getParkingsForStopPlace instead
     */
    getStopPlaceFacilities: ReturnType<typeof createGetStopPlaceFacilities>
    getQuaysForStopPlace: ReturnType<typeof createGetQuaysForStopPlace>
    getBikeRentalStation: ReturnType<typeof createGetBikeRentalStation>
    getBikeRentalStations: ReturnType<typeof createGetBikeRentalStations>
    getBikeRentalStationsByPosition: ReturnType<
        typeof createGetBikeRentalStationsByPosition
    >
    getScootersByPosition: ReturnType<typeof createGetScootersByPosition>
    geocoder: GeocoderClient
    mobility: MobilityClient
    nsr: NsrClient
}

/**
 * @deprecated Use `EnturClient` instead.
 */
export type EnturService = EnturClient

function createEnturClient(config: ArgumentConfig): EnturClient {
    return {
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
        getDeparturesBetweenStopPlaces:
            createGetDeparturesBetweenStopPlaces(config),
        getDeparturesForServiceJourney:
            createGetDeparturesForServiceJourney(config),
        getNearestPlaces: createGetNearestPlaces(config),
        getStopPlace: createGetStopPlace(config),
        getStopPlaces: createGetStopPlaces(config),
        getParentStopPlace: createGetParentStopPlace(config),
        getStopPlacesByPosition: createGetStopPlacesByPosition(config),
        getStopPlaceFacilities: createGetStopPlaceFacilities(config),
        getQuaysForStopPlace: createGetQuaysForStopPlace(config),
        getBikeRentalStation: createGetBikeRentalStation(config),
        getBikeRentalStations: createGetBikeRentalStations(config),
        getBikeRentalStationsByPosition:
            createGetBikeRentalStationsByPosition(config),
        getScootersByPosition: createGetScootersByPosition(config),
        geocoder: createGeocoderClient(config),
        mobility: createMobilityClient(config),
        nsr: createNsrClient(config),
    }
}

export default createEnturClient
