// @flow

export type EstimatedCall = {
    quay: {
        id: string,
        name: string,
        stopPlace: {
            id: string,
        }
    },
    forAlighting: boolean,
    forBoarding: boolean,
    expectedArrivalTime: string,
    expectedDepartureTime: string,
    aimedArrivalTime: string,
    aimedDepartureTime: string,
    date: string,
}
