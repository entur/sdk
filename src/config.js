// @flow

export type HostConfig = {
    host: string,
    headers?: {[string]: string},
}

export type ServiceConfig = {|
    clientName: string,
    hosts: {
        journeyPlanner: string,
        geocoder: string,
        nsr: string,
    },
    headers: {[string]: string},
|}

export type ArgumentConfig = {|
    clientName: string,
    hosts?: {
        journeyPlanner?: string,
        geocoder?: string,
        nsr?: string,
    },
    headers?: {[string]: string},
|}

export type OverrideConfig = {|
    clientName?: string,
    hosts?: {
        journeyPlanner?: string,
        geocoder?: string,
        nsr?: string,
    },
    headers?: {[string]: string},
|}

const HOST_CONFIG = {
    journeyPlanner: 'https://api.entur.io/journey-planner/v2',
    geocoder: 'https://api.entur.io/geocoder/v1',
    nsr: 'https://api.entur.io/stop-places/v1',
}

export function getServiceConfig(config: ArgumentConfig): ServiceConfig {
    if (!config || !config.clientName) {
        throw new Error('ERROR: You must pass a "clientName" to EnturService through the config argument. '
            + 'See https://www.entur.org/dev/api/header/ for information.\n')
    }

    const { clientName, hosts = {}, headers = {} } = config

    return {
        clientName,
        headers,
        hosts: {
            ...HOST_CONFIG,
            ...hosts,
        },
    }
}

export function getJourneyPlannerHost({ hosts, clientName, headers }: ServiceConfig): HostConfig {
    return {
        host: hosts.journeyPlanner,
        headers: {
            'ET-Client-Name': clientName,
            ...headers,
        },
    }
}

export function getGeocoderHost({ hosts, clientName, headers }: ServiceConfig): HostConfig {
    return {
        host: hosts.geocoder,
        headers: {
            'ET-Client-Name': clientName,
            ...headers,
        },
    }
}

export function getNSRHost({ hosts, clientName, headers }: ServiceConfig): HostConfig {
    return {
        host: hosts.nsr,
        headers: {
            'ET-Client-Name': clientName,
            ...headers,
        },
    }
}

export function mergeConfig(config: ServiceConfig, override?: OverrideConfig): ServiceConfig {
    if (!override) {
        return config
    }

    return {
        ...config,
        clientName: override.clientName || config.clientName,
        hosts: {
            ...config.hosts,
            ...override.hosts,
        },
        headers: {
            ...config.headers,
            ...override.headers,
        },
    }
}
