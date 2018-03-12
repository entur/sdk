// @flow

export type StoptimeForDate = {
    dropoffType: 'NONE' | 'SCHEDULED',
    headsign: string,
    pickupType: 'NONE' | 'SCHEDULED',
    realtimeDeparture: number,
    scheduledDeparture: number,
    stop: {
        id: string,
        gtfsId: string,
        name: string,
    },
}
