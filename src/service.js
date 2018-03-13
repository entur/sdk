// @flow
import { getTripPatterns, getStopPlaceDepartures, getStopPlaces } from './trip'
import getLocationService from './geocoder'
import { getJourneyPlannerHost, getGeocoderHost } from './config'
import type { Environment, Hosts } from './config'

type ServiceConfig = {
    environment: Environment,
    hosts: Hosts,
    apikeys: Hosts,
};

const DEFAULT_CONFIG = {
    environment: 'DEV',
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

    getStopPlaceDepartures(stopPlaceId: string): Promise<Array<Object>> {
        const host = getJourneyPlannerHost(this.config)
        return getStopPlaceDepartures(host, stopPlaceId)
    }

    getStopPlaces(stopPlaceIds: Array<string>): Promise<Array<Object>> {
        const host = getJourneyPlannerHost(this.config)
        return getStopPlaces(host, stopPlaceIds)
    }
}


export default EnturService
