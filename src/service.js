// @flow
<<<<<<< HEAD
import { getTripPatterns, getStopPlaceDepartures, getStopPlaces } from './trip'
import { getBikeRentalStation, getBikeRentalStations } from './bikeRental'
=======
import { getTripPatterns, getStopPlaceDepartures, getStopPlaces, getStopPlacesByPosition } from './trip'
import { getBikeRentalStation } from './bikeRental'
>>>>>>> master
import getLocationService from './geocoder'
import { getJourneyPlannerHost, getGeocoderHost } from './config'
import type { Hosts } from './config'
import type { Coordinates } from './flow-types'

type ServiceConfig = {
    hosts: Hosts,
    apikeys: Hosts,
};

const DEFAULT_CONFIG = {
    hosts: {},
    apikeys: {},
}

class EnturService {
    config: ServiceConfig;

    constructor(config: Object) {
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
