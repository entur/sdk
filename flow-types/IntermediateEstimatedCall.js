// @flow
export type IntermediateEstimatedCall = {
    quay: { id: string, name: string },
    forAlighting?: boolean,
    forBoarding?: boolean,
    aimedDepartureTime: string,
    expectedDepartureTime?: string, // Only available BEFORE departure has taken place
    actualDepartureTime?: string // Only available AFTER departure has taken place
}
