// @flow
import { getTripPatterns, getStopPlaceDepartures, getStopPlaces, getStopPlacesByPosition } from './trip'
import { getBikeRentalStation, getBikeRentalStations } from './bikeRental'
import getLocationService from './geocoder'
import { getJourneyPlannerHost, getGeocoderHost, setClientName } from './config'
import type { ServiceConfig, ArgumentConfig } from './config'
import type { Coordinates } from './flow-types'

const DEFAULT_CONFIG = {
    hosts: {},
    apikeys: {},
}

class EnturService {
    config: ServiceConfig;

    constructor(config: ArgumentConfig) {
        if (!config || !config.clientName) {
            // eslint-disable-next-line no-console
            return console.error('ERROR: You must pass a "clientName" to EnturService through the config argument. '
                + 'See https://www.entur.org/dev/api/header/ for information.\n')
        }

        setClientName(config.clientName)

        this.config = {
            ...DEFAULT_CONFIG,
            ...config,
        }
    }

    getLocations(query: string): Promise<Array<Object>> {
        const host = getGeocoderHost(this.config)
        return getLocationService(host, query)
    }

    getTripPatterns(query: Object): Promise<Array<Object>> {
        const host = getJourneyPlannerHost(this.config)
        return getTripPatterns(host, query)
    }

    getStopPlaceDepartures(stopPlaceId: string, query?: Object): Promise<Array<Object>> {
        const host = getJourneyPlannerHost(this.config)
        return getStopPlaceDepartures(host, stopPlaceId, query)
    }

    getStopPlaces(stopPlaceIds: Array<string>): Promise<Array<Object>> {
        const host = getJourneyPlannerHost(this.config)
        return getStopPlaces(host, stopPlaceIds)
    }

    getStopPlacesByPosition(position: Coordinates, distance?: number): Promise<Array<Object>> {
        const host = getJourneyPlannerHost(this.config)
        return getStopPlacesByPosition(host, position, distance)
    }

    getBikeRentalStation(stationId: string): Promise<Array<Object>> {
        const host = getJourneyPlannerHost(this.config)
        return getBikeRentalStation(host, stationId)
    }

    getBikeRentalStations(coordinates: Object, distance?: number): Promise<Array<Object>> {
        const host = getJourneyPlannerHost(this.config)
        return getBikeRentalStations(host, coordinates, distance)
    }
}

export default EnturService
