// @flow
export const noticeFields = {
    text: true,
}

export const situationFields = {
    situationNumber: true,
    summary: { value: true },
    description: { value: true },
    detail: { value: true },
    validityPeriod: {
        startTime: true,
        endTime: true,
    },
    reportType: true,
    infoLink: true,
}

export const lineFields = {
    id: true,
    name: true,
    publicCode: true,
    notices: noticeFields,
}

export const quayFields = {
    id: true,
    name: true,
    publicCode: true,
    description: true,
}

export const estimatedCallFields = {
    date: true,
    forBoarding: true,
    requestStop: true,
    forAlighting: true,
    destinationDisplay: { frontText: true },
    notices: noticeFields,
}

export const intermediateEstimatedCallFields = {
    ...estimatedCallFields,
    quay: quayFields,
    cancellation: true,
    actualDepartureTime: true,
    actualArrivalTime: true,
    aimedDepartureTime: true,
    aimedArrivalTime: true,
    expectedDepartureTime: true,
    expectedArrivalTime: true,
}
