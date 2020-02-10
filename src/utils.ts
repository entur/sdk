import { point, lineString } from '@turf/helpers'
import bbox from '@turf/bbox'
import destination from '@turf/destination'
import PromiseThrottle from 'promise-throttle'
import { Feature } from '../types/Feature'
import { Location } from '../types/Location'
import { Coordinates } from '../types/Coordinates'
import {
    MAX_CALLS_PER_SECOND,
    MAX_CALLS_PER_MINUTE,
    MAX_CALLS_PER_HOUR,
} from './constants/rateLimits'

export function convertFeatureToLocation(feature: Feature): Location {
    const { properties, geometry } = feature

    return {
        name: properties.name,
        place: properties.id,
        coordinates: {
            latitude: geometry.coordinates[1],
            longitude: geometry.coordinates[0],
        },
    }
}

interface Bbox {
    minLng: number
    minLat: number
    maxLng: number
    maxLat: number
}

export function convertPositionToBbox(
    coordinates: Coordinates,
    distance: number,
): Bbox {
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
        minLng,
        minLat,
        maxLng,
        maxLat,
    }
}

export function throttler<T, V>(
    func: (arg: T) => Promise<V>,
    args: Array<T>,
): Promise<V[]> {
    const argCount = args.length

    let requestsPerSecond
    if (argCount <= MAX_CALLS_PER_MINUTE) {
        requestsPerSecond = MAX_CALLS_PER_SECOND
    } else if (argCount <= MAX_CALLS_PER_HOUR) {
        requestsPerSecond = Math.floor(MAX_CALLS_PER_MINUTE / 60)
    } else {
        requestsPerSecond = Math.floor(MAX_CALLS_PER_HOUR / 3600)
    }

    const promiseThrottle = new PromiseThrottle({ requestsPerSecond })
    return Promise.all(args.map(a => promiseThrottle.add(() => func(a))))
}

export function isValidDate(d: any): boolean {
    return (
        Object.prototype.toString.call(d) === '[object Date]' &&
        !Number.isNaN(d.getTime())
    )
}

export function uniqBy<T, K>(arr: Array<T>, getKey: (arg: T) => K): Array<T> {
    return [
        ...arr
            .reduce((map, item) => {
                const key = getKey(item)

                if (!map.has(key)) {
                    map.set(key, item)
                }

                return map
            }, new Map())
            .values(),
    ]
}

function identity<T>(thing: T): T {
    return thing
}

export function uniq<T>(arr: T[]): T[] {
    return uniqBy<T, T>(arr, identity)
}

export function forceOrder<T, V>(
    list: Array<T>,
    sequence: Array<V>,
    getKey: (arg: T) => V,
): Array<T | undefined> {
    let queue = [...list]
    // @ts-ignore
    const result = []

    const getKeyFunc = getKey || identity

    sequence.forEach(sequenceIdentifier => {
        const item = queue.find(t => getKeyFunc(t) === sequenceIdentifier)
        if (item) {
            result.push(item)
            queue = queue.filter(q => q !== item)
        } else {
            result.push(undefined)
        }
    })
    // @ts-ignore
    return result
}

type Falsy = void | null | undefined | 0 | '' | false

type Truthy<T> = Exclude<T, Falsy>

export function isTruthy<T>(thing: T): thing is Truthy<T> {
    return Boolean(thing)
}
