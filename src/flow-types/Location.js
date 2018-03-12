// @flow

export type Location = {
    geometry: {
        coordinates: Array<number>,
        type: string,
    },
    properties: {
        id: string,
        name: string,
        label?: string,
        lat?: number,
        lon?: number,
    }
}
