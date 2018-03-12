// @flow
import { getJourneyPlannerHost } from './config';
import type { Environment, Hosts } from './config';
import getTripPatterns from './trip';
import { FOOT, BUS, TRAM, RAIL, METRO, WATER, AIR } from './constants/travelModes';
import type { Location } from './flow-types/Location';

type InputServiceConfig = {
    apikeys?: Object,
    environment?: Environment,
};

type ServiceConfig = {
    apikeys: Object,
    environment: Environment,
    hosts?: Hosts
};

type ItinerarySearchParams = {
    searchDate: Date,
    from: Location,
    to: Location,
    arriveBy?: boolean,
    modes?: Array<string>,
    limit?: number,
    wheelchairAccessible?: boolean,
    waitReluctance?: number,
    walkReluctance?: number,
    walkBoardCost?: number,
    walkSpeed?: number,
    maxWalkDistance?: number,
}

const DEFAULT_CONFIG = {
    environment: 'DEV',
};

class EnturService {
    config: ServiceConfig;

    constructor(config: InputServiceConfig) {
        this.config = {
            ...DEFAULT_CONFIG,
            ...config,
        };
    }

    getTripPatterns(params: ItinerarySearchParams) {
        const requestParams = {
            arriveBy: false,
            modes: [FOOT, BUS, TRAM, RAIL, METRO, WATER, AIR],
            limit: 5,
            wheelchairAccessible: false,
            waitReluctance: 0.5,
            walkReluctance: 2,
            walkBoardCost: 600,
            walkSpeed: 1.2,
            maxWalkDistance: 2000,
            ...params,
        };
        const { host, headers = {} } = getJourneyPlannerHost(this.config);

        return getTripPatterns(requestParams, host, headers);
    }
}


export default EnturService;
