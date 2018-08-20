// @flow
import lineString from 'turf-linestring'
import point from 'turf-point'
import bbox from '@turf/bbox'
import destination from '@turf/destination'
import type { Feature } from '../flow-types/Feature'
import type { Location } from '../flow-types/Location'
import type { Coordinates } from '../flow-types/Coordinates'

export function convertFeatureToLocation(feature: Feature): Location {
    const { properties, geometry } = feature

    return {
        name: properties.label || properties.name,
        place: properties.id,
        coordinates: {
            latitude: geometry.coordinates[1],
            longitude: geometry.coordinates[0],
        },
    }
}

// preserve backward compatability
export function convertLocationToPositionDEPRECATED(feature: Feature): Location {
    if (process.env !== 'production') {
        // eslint-disable-next-line
        console.info('convertLocationToPosition is deprecated and will be removed in a future version. Use convertFeatureToLocation instead')
    }
    return convertFeatureToLocation(feature)
}

export function convertPositionToBbox(coordinates: Coordinates, distance: number) {
    const { latitude, longitude } = coordinates
    const distanceToKilometer = distance / 1000

    const position = point([longitude, latitude])

    const east = destination(position, distanceToKilometer, 0)
    const north = destination(position, distanceToKilometer, 90)
    const west = destination(position, distanceToKilometer, 180)
    const south = destination(position, distanceToKilometer, -90)

    const line = lineString([
        east.geometry.coordinates,
        north.geometry.coordinates,
        west.geometry.coordinates,
        south.geometry.coordinates,
    ])

    const [minLng, minLat, maxLng, maxLat] = bbox(line)

    return {
        minLng, minLat, maxLng, maxLat,
    }
}
