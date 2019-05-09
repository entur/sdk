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
    infoLinks: {
        uri: true,
        label: true,
    },
}

export const lineFields = {
    id: true,
    publicCode: true,
    name: true,
    transportMode: true,
    description: true,
    presentation: {
        colour: true,
        textColour: true,
    },
    authority: {
        id: true,
        name: true,
    },
    notices: noticeFields,
    situations: situationFields,
}

export const estimatedCallFields = {
    date: true,
    forBoarding: true,
    forAlighting: true,
}

export const intermediateEstimatedCallFields = {
    quay: {
        id: true,
        name: true,
        stopPlace: {
            id: true,
        },
    },
    expectedArrivalTime: true,
    expectedDepartureTime: true,
    aimedArrivalTime: true,
    aimedDepartureTime: true,
}
