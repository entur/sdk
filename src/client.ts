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
    /** @deprecated Use geocoder.autocomplete instead. */
    getFeatures: ReturnType<typeof createGetFeatures>
    /** @deprecated Use geocoder.reverse instead. */
    getFeaturesReverse: ReturnType<typeof createGetFeaturesReverse>

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getTripPatterns: ReturnType<typeof createGetTripPatterns>

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    findTrips: ReturnType<typeof createFindTrips>

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getStopPlaceDepartures: typeof getStopPlaceDeparturesDEPRECATED

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getDeparturesFromStopPlace: ReturnType<
        typeof createGetDeparturesFromStopPlace
    >

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getDeparturesFromStopPlaces: ReturnType<
        typeof createGetDeparturesFromStopPlaces
    >

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getDeparturesFromQuays: ReturnType<typeof createGetDeparturesFromQuays>

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getDeparturesBetweenStopPlaces: ReturnType<
        typeof createGetDeparturesBetweenStopPlaces
    >

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getDeparturesForServiceJourney: ReturnType<
        typeof createGetDeparturesForServiceJourney
    >

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getNearestPlaces: ReturnType<typeof createGetNearestPlaces>

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getStopPlace: ReturnType<typeof createGetStopPlace>

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getStopPlaces: ReturnType<typeof createGetStopPlaces>

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getParentStopPlace: ReturnType<typeof createGetParentStopPlace>

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getStopPlacesByPosition: ReturnType<typeof createGetStopPlacesByPosition>

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getQuaysForStopPlace: ReturnType<typeof createGetQuaysForStopPlace>

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getBikeRentalStation: ReturnType<typeof createGetBikeRentalStation>

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getBikeRentalStations: ReturnType<typeof createGetBikeRentalStations>

    /**
     * @deprecated
     * The JourneyPlanner v2 queries and types are deprecated.
     * Write your own GraphQL queries for JourneyPlanner v3.
     * Write your own types or use those from JourneyPlannerTypes where applicable.
     */
    getBikeRentalStationsByPosition: ReturnType<
        typeof createGetBikeRentalStationsByPosition
    >
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
        getQuaysForStopPlace: createGetQuaysForStopPlace(config),
        getBikeRentalStation: createGetBikeRentalStation(config),
        getBikeRentalStations: createGetBikeRentalStations(config),
        getBikeRentalStationsByPosition:
            createGetBikeRentalStationsByPosition(config),
        geocoder: createGeocoderClient(config),
        mobility: createMobilityClient(config),
        nsr: createNsrClient(config),
    }
}

export default createEnturClient
