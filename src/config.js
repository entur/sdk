// @flow

export type Hosts = {
    journeyplanner?: string,
    geocoder?: string
}

export type HostConfig = {
    host: string,
    headers?: Object
}

type GetHost = {
    apikeys: Hosts,
    hosts: Hosts
}

const JOURNEY_PLANNER_HOST = 'https://api.entur.org/journeyplanner/2.0/index'
const GEOCODER_HOST = 'https://api.entur.org/api/geocoder/1.1'

let clientName

export function setClientName(name: string) {
    clientName = name
}

export function getJourneyPlannerHost({ hosts, apikeys }: GetHost): HostConfig {
    return {
        host: hosts.journeyplanner || JOURNEY_PLANNER_HOST,
        headers: {
            'ET-Client-Name': clientName,
            apikey: apikeys.journeyplanner,
            'extended-info': true,
        },
    }
}

export function getGeocoderHost({ hosts }: GetHost): HostConfig {
    return {
        host: hosts.geocoder || GEOCODER_HOST,
        headers: {
            'ET-Client-Name': clientName,
        },
    }
}
