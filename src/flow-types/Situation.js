// @flow

export type Situation = {
    id: string,
    summary: {
        value: string,
        language: string,
    },
    description: {
        value: string,
        language: string
    },
    detail: {
        value: string,
        language: string
    },
    validityPeriod: {
        startTime: string,
        endTime: string
    },
}
