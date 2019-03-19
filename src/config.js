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

const topLevelConfigKeys = ['clientName', 'hosts']

export function getServiceConfig(config: ArgumentConfig): ServiceConfig {
    if (!config || !config.clientName) {
        throw new Error('ERROR: You must pass a "clientName" to EnturService through the config argument. '
            + 'See https://www.entur.org/dev/api/header/ for information.\n')
    }

    Object.keys(HOST_CONFIG).forEach((hostConfigKey) => {
        if (hostConfigKey in config) {
            console.warn(`"${hostConfigKey}" is not a top-level config property. Did you mean to put it in the "hosts" object?`)
        }
    })

    Object.keys(config).forEach((key) => {
        if (!topLevelConfigKeys.includes(key)) {
            console.warn(`"${key}" is not a recognized config property, and will have no effect.`)
        }
    })

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
