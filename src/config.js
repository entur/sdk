// @flow

export type Environment = 'DEV' | 'STAGING' | 'PROD'
export type Hosts = {
    journeyplanner?: string,
    geocoder?: string
}

export type HostConfig = {
    host: string,
    headers?: Object
}

type EnvironmentConfig = {|
  DEV: string,
  STAGING: string,
  PROD: string,
|};

type GetHost = {
    environment: Environment,
    apikeys: Hosts,
    hosts: Hosts
}

const JOURNEY_PLANNER_HOST: EnvironmentConfig = {
    DEV: 'https://dev.entur.io/journeyplanner/2.0/index',
    STAGING: 'https://api-test.entur.org/journeyplanner/2.0/index',
    PROD: 'https://api.entur.org/journeyplanner/2.0/index',
}

const GEOCODER_HOST: EnvironmentConfig = {
    DEV: 'https://api-test.entur.org/api/geocoder/1.1',
    STAGING: 'https://api-stage.entur.org/api/geocoder/1.1',
    PROD: 'https://api.entur.org/api/geocoder/1.1',
}

export function getJourneyPlannerHost({
    environment, hosts, apikeys,
}: GetHost): HostConfig {
    return {
        host: hosts.journeyplanner || JOURNEY_PLANNER_HOST[environment],
        headers: {
            apikey: apikeys.journeyplanner,
            'extended-info': true,
        },
    }
}

export function getGeocoderHost({ environment, hosts }: GetHost): HostConfig {
    return {
        host: hosts.geocoder || GEOCODER_HOST[environment],
    }
}
