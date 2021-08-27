import { Response, RequestInfo, RequestInit } from 'node-fetch'

export interface HostConfig {
    host: string
    headers?: { [key: string]: string }
}

export interface ServiceConfig {
    clientName: string
    hosts: {
        journeyPlanner: string
        geocoder: string
        nsr: string
        scooters: string
        mobility: string
    }
    headers: { [key: string]: string }
    fetch?: (
        url: RequestInfo,
        init?: RequestInit | undefined,
    ) => Promise<Response>
}

export interface ArgumentConfig {
    clientName: string
    hosts?: {
        journeyPlanner?: string
        geocoder?: string
        nsr?: string
        scooters?: string
        mobility?: string
    }
    headers?: { [key: string]: string }
    fetch?: (
        url: RequestInfo,
        init?: RequestInit | undefined,
    ) => Promise<Response>
}

export interface OverrideConfig {
    clientName?: string
    hosts?: {
        journeyPlanner?: string
        geocoder?: string
        nsr?: string
        scooters?: string
        mobility?: string
    }
    headers?: { [key: string]: string }
    fetch?: (
        url: RequestInfo,
        init?: RequestInit | undefined,
    ) => Promise<Response>
}

const HOST_CONFIG = {
    journeyPlanner: 'https://api.entur.io/journey-planner/v2',
    geocoder: 'https://api.entur.io/geocoder/v1',
    nsr: 'https://api.entur.io/stop-places/v1',
    scooters: 'https://api.entur.io/mobility/v1/scooters',
    mobility: 'https://api.entur.io/mobility/v2',
}

export function getServiceConfig(config: ArgumentConfig): ServiceConfig {
    if (!config || !config.clientName) {
        throw new Error(
            'ERROR: You must pass a "clientName" to EnturClient through the config argument. ' +
                'See https://www.entur.org/dev/api/header/ for information.\n',
        )
    }

    const { clientName, hosts = {}, headers = {}, fetch } = config

    return {
        clientName,
        headers,
        hosts: {
            ...HOST_CONFIG,
            ...hosts,
        },
        fetch,
    }
}

export function getJourneyPlannerHost({
    hosts,
    clientName,
    headers,
}: ServiceConfig): HostConfig {
    return {
        host: hosts.journeyPlanner,
        headers: {
            'ET-Client-Name': clientName,
            ...headers,
        },
    }
}

export function getGeocoderHost({
    hosts,
    clientName,
    headers,
}: ServiceConfig): HostConfig {
    return {
        host: hosts.geocoder,
        headers: {
            'ET-Client-Name': clientName,
            ...headers,
        },
    }
}

export function getNSRHost({
    hosts,
    clientName,
    headers,
}: ServiceConfig): HostConfig {
    return {
        host: hosts.nsr,
        headers: {
            'ET-Client-Name': clientName,
            ...headers,
        },
    }
}

export function getScootersHost({
    hosts,
    clientName,
    headers,
}: ServiceConfig): HostConfig {
    return {
        host: hosts.scooters,
        headers: {
            'ET-Client-Name': clientName,
            ...headers,
        },
    }
}

export function getMobilityHost({
    hosts,
    clientName,
    headers,
}: ServiceConfig): HostConfig {
    return {
        host: hosts.mobility,
        headers: {
            'ET-Client-Name': clientName,
            ...headers,
        },
    }
}

export function mergeConfig(
    config: ServiceConfig,
    override?: OverrideConfig,
): ServiceConfig {
    if (!override) {
        return config
    }

    return {
        ...config,
        clientName: override.clientName || config.clientName,
        fetch: override.fetch || config.fetch,
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
