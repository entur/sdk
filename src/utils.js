/* eslint import/prefer-default-export:0  */

// @flow
import turf from 'turf'
import type { Position, Location, Coordinates } from './flow-types'

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

    const point = turf.point([longitude, latitude])

    const east = turf.destination(point, distance / 1000, 0)
    const north = turf.destination(point, distance / 1000, 90)
    const west = turf.destination(point, distance / 1000, 180)
    const south = turf.destination(point, distance / 1000, -90)

    const line = turf.lineString([
        east.geometry.coordinates,
        north.geometry.coordinates,
        west.geometry.coordinates,
        south.geometry.coordinates,
    ])

    return turf.bbox(line)
}
