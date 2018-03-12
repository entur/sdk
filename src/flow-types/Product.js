// @flow

import type { Traveler } from './Traveler'

export type Product = {
    id: string,
    name: string,
    totalPrice: number,
    travelers: Array<Traveler>,
    offers: Array<any>,
    validInAllZones: boolean,
    validZones: Array<{
        id: string,
        name: {
            lang: string,
            value: string,
        },
    }>,
    minipris: boolean,
}
