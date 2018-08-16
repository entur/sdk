/* eslint import/prefer-default-export:0  */
// @flow
import lineString from 'turf-linestring'
import point from 'turf-point'
import bbox from '@turf/bbox'
import destination from '@turf/destination'
import type { Position, Location, Coordinates } from '../flow-types'

export function convertLocationToPosition(location: Location): Position {
    const { properties, geometry } = location

    return {
        name: properties.label || properties.name,
        place: properties.id,
        coordinates: {
            latitude: properties.lat || geometry.coordinates[1],
            longitude: properties.lon || geometry.coordinates[0],
        },
    }
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
