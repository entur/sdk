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

import { default as createMobilityClient, MobilityClient } from './mobility'

import { default as createNsrClient, NsrClient } from './nsr'

import {
    createGetBikeRentalStation,
    createGetBikeRentalStations,
    createGetBikeRentalStationsByPosition,
} from './bikeRental'

import { createGetScootersByPosition } from './scooters'

import { createGetFeatures, createGetFeaturesReverse } from './geocoder'

import { ArgumentConfig, getServiceConfig, ServiceConfig } from './config'

export interface EnturService {
    journeyPlannerQuery: <T>(
        query: string,
        variables: Record<string, unknown>,
        config: ServiceConfig,
    ) => Promise<T>
    queryJourneyPlanner: <T>(
        queryObj: string,
        variables: Record<string, unknown>,
        options?: RequestOptions,
    ) => Promise<T>
    nsrQuery: <T>(
        query: string,
        variables: Record<string, unknown>,
        config: ServiceConfig,
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
    getStopPlaceFacilities: ReturnType<typeof createGetStopPlaceFacilities>
    getQuaysForStopPlace: ReturnType<typeof createGetQuaysForStopPlace>
    getBikeRentalStation: ReturnType<typeof createGetBikeRentalStation>
    getBikeRentalStations: ReturnType<typeof createGetBikeRentalStations>
    getBikeRentalStationsByPosition: ReturnType<
        typeof createGetBikeRentalStationsByPosition
    >
    getScootersByPosition: ReturnType<typeof createGetScootersByPosition>
    mobility: MobilityClient
    nsr: NsrClient
}

function createEnturService(config: ArgumentConfig): EnturService {
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
        mobility: createMobilityClient(config),
        nsr: createNsrClient(config),
    }
}

export default createEnturService
