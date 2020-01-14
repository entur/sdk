// @flow

export type StopPlace = {
    id: string,
    description?: string,
    name: string,
    tariffZones?: Array<{
        id: string,
    }>,
}

export default {
    id: true,
    description: true,
    name: true,
    tariffZones: {
        id: true,
    },
}
