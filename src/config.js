// @flow

export type Environment = 'DEV' | 'STAGING' | 'PROD'
export type Hosts = {
    journeyplanner?: string
}

type EnvironmentConfig = {|
  DEV: string,
  STAGING: string,
  PROD: string,
|};

type GetHost = {
    environment: Environment,
    apikeys?: Hosts,
    hosts?: Hosts
}

type HostConfig = {
    host: string,
    headers?: Object
}

export const JOURNEY_PLANNER_HOST: EnvironmentConfig = {
    DEV: 'https://dev.entur.io/journeyplanner/2.0/index',
    STAGING: 'https://api-test.entur.org/journeyplanner/2.0/index',
    PROD: 'https://entur.io/journeyplanner/2.0/index',
}

export function getJourneyPlannerHost({ environment, hosts = {}, apikeys = {} }: GetHost): HostConfig {
    return {
        host: hosts.journeyplanner || JOURNEY_PLANNER_HOST[environment],
        headers: {
            apikey: apikeys.journeyplanner,
            'extended-info': true,
        },
    }
}
