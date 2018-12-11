// @flow

export type HostConfig = {
    host: string,
    headers?: Object
}

export type ServiceConfig = {
    clientName: string,
    hosts: {
        journeyplanner: string,
        geocoder: string
    },
};

export type ArgumentConfig = {
    clientName: string,
    hosts?: {
        journeyplanner?: string,
        geocoder?: string
    },
}

const HOST_CONFIG = {
    journeyplanner: 'https://api.entur.io/journey-planner/v2',
    geocoder: 'https://api.entur.io/geocoder/v1',
}

export function getServiceConfig(config: ArgumentConfig): ServiceConfig {
    if (!config || !config.clientName) {
        throw new Error('ERROR: You must pass a "clientName" to EnturService through the config argument. '
            + 'See https://www.entur.org/dev/api/header/ for information.\n')
    }

    const { hosts = {}, ...rest } = config

    return {
        ...rest,
        hosts: { ...HOST_CONFIG, ...hosts },
    }
}

export function getJourneyPlannerHost({ hosts, clientName }: ServiceConfig): HostConfig {
    return {
        host: hosts.journeyplanner,
        headers: {
            'ET-Client-Name': clientName,
        },
    }
}

export function getGeocoderHost({ hosts, clientName }: ServiceConfig): HostConfig {
    return {
        host: hosts.geocoder,
        headers: {
            'ET-Client-Name': clientName,
        },
    }
}
