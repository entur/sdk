// @flow
import quayFields, { type Quay } from './Quay'

export type Place = {|
  latitude: number,
  longitude: number,
  name: string,
  quay?: Quay & {
      stopPlace: {
        id: true,
        name: true,
        description: true,
        tariffZones: {
            id: true,
        },
    },
  },
|}

export default {
    name: true,
    latitude: true,
    longitude: true,
    quay: {
        ...quayFields,
        stopPlace: {
            id: true,
            name: true,
            description: true,
            tariffZones: {
                id: true,
            },
        },
    },
}
