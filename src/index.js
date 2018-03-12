// @flow
import getTripPatternService from './trip';
import getLocationService from './geocoder';
import { getJourneyPlannerHost, getGeocoderHost } from './config';
import type { Environment, Hosts } from './config';

type ServiceConfig = {
    environment: Environment,
    hosts: Hosts,
    apikeys: Hosts,
};

const DEFAULT_CONFIG = {
    environment: 'DEV',
    hosts: {},
    apikeys: {},
};

class EnturService {
    config: ServiceConfig;

    constructor(config: Object) {
        this.config = {
            ...DEFAULT_CONFIG,
            ...config,
        };
    }

    getLocations(query: string) {
        const host = getGeocoderHost(this.config);
        return getLocationService(host, query);
    }

    getTripPatterns(query: Object) {
        const host = getJourneyPlannerHost(this.config);
        return getTripPatternService(host, query);
    }
}


export default EnturService;
