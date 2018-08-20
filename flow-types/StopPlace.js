// @flow

import type { Quay } from './Quay'

export type StopPlace = {
    id: string,
    name: string,
    latitude: number,
    longitude: number,
    description: string,
    wheelchairBoarding: boolean,
    weighting: any,
    transportMode: Array<string>,
    transportSubmode: string,
    quays: Array<Quay>,
}
