/* eslint import/prefer-default-export:0  */

// @flow
import type { Position } from './flow-types/Position'
import type { Location } from './flow-types/Location'

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
