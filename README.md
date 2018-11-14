# Entur SDK

This SDK simplifies the use of Entur's travel APIs in JavaScript apps. For more information about Entur's APIs, see https://www.entur.org/dev/

Miss anything? Found a bug? File an [issue](https://github.com/entur/sdk/issues/new) or create a pull request!

* [Installation](#install)
* [Setup](#setup)
* [API](#api)
    * [findTrips](#findtrips)
    * [getTripPatterns](#gettrippatterns)
    * [getFeatures](#getfeatures)
    * [getStopPlaceDepartures](#getstopplacedepartures)
    * [getBikeRentalStation](#getbikerentalstation)
    * [getBikeRentalStations](#getbikerentalstations)
    * [getStopPlace](#getstopplace)
    * [getStopPlacesByPosition](#getstopplacesbyposition)
* [Utils](#utils)
    * [throttler](#throttler)
* [Flow Types](#flow-types)

## Install
```bash
npm install @entur/sdk --save
```

## Setup
```javascript
import EnturService from '@entur/sdk'

const service = new EnturService({ clientName: 'awesomecompany-awesomeapp' })
```

### Configuration
| Name        | Type                  | Default     | Description                             |
|:------------|:----------------------|:------------|:----------------------------------------|
| clientName  | `string`              | `undefined` | The name of your application            |
| hosts       | `{object of hosts}`   | `{}`        | Override default endpoints              |


#### clientName (required)
We require that you pass a `clientName` that identifies your application. It should contain the name of your company or organization,
followed by a hyphen and your application's name. See https://www.entur.org/dev/api/header/ for more information.

#### hosts
The Entur SDK uses multiple endpoints for its services. Each endpoint can be overridden with hosts config (in case you use a proxy or a local instance of the endpoint). Available hosts are:

```javascript
{
    journeyplanner: '',
    geocoder: ''
}
```

## API

### findTrips

```javascript
(from: string, to: string, date?: Date | string | number) => Promise<Array<TripPattern>>
```

Finds up to 5 trip patterns from <from> to <to> at the time specified. This is a convenience method, which first tries to find locations for the given <from> and <to> strings before searching for trips between them. If you need more control, see the [`getTripPatterns`](#gettrippatterns) method.

If no locations are found for either <from> or <to>, or if <date> is invalid, an error will be thrown.

#### Parameters

##### from (`string`)
The place you want to search from. For instance `"Oslo"`

##### to (`string`)
The place you want to search from. For instance `"Bergen"`

#### date (`Date | string | number`) [Optional]
The wanted time of departure. Can be anything that is parseable by `new Date()`. If not provided, the search will be from "now".

### getTripPatterns

```javascript
(query: TripPatternsQuery) => Promise<Array<TripPattern>>
```

Types: [TripPattern](flow-types/TripPattern.js)

`getTripPatterns` is for searching for itineraries for a trip from some location to a destination at a given time. The method takes one argument `query`, which is an object with search parameters.

If you are going to do a huge amount of different searches at the same time, consider using our [`throttler`](#throttler) utility.

#### Parameters

##### query (`TripPatternsQuery`)
A search query is an object on the following form.

| Key | Type | Default  | Description |
|:----|:----|:----------|:------------|
| `searchDate`            | `Date`             | | when to calculate patterns |
| `from`                  | [`Location`](#location) | | departure location |
| `to`                    | [`Location`](#location) | | arrival location |
| `arriveBy`              | `boolean`          | `false` | depart by `searchDate`, or arrive by `searchDate` |
| `modes`                 | [`Array of Modes`](#leg-mode) | `['foot', 'bus', 'tram', 'rail', 'metro', 'water', 'air']` | modes of transport to include in trip |
| `limit`                 | `number`           | `5`      | Limit search to |
| `wheelchairAccessible`  | `boolean`          | `false`  | include only stops which are wheelchair accessible |

#### example

```javascript
service.getTripPatterns({
    searchDate: new Date(),
    from: {
        name: 'Ryllikvegen, Lillehammer',
        coordinates: {
            latitude: 61.102848368937416,
            longitude: 10.51613308426234
        },
    },
    to: {
        place: 'NSR:StopPlace:337',
        name: 'Oslo S, Oslo'
    }
})
```

See [example/get-trip.js](./example/get-trip.js) for a more in depth example

### getFeatures

```javascript
(query: string, coords?: Coordinates, params?: GetFeaturesQuery) => Promise<Array<Feature>>
```

Types: [Feature](flow-types/Feature.js), [Coordinates](flow-types/Coordinates.js)

`getFeatures` is for searching for stop places, stations or addresses.

#### Parameters

##### query (`string`)
The search string that should resemble the name of the desired stop place or address. Examples: `"Oslo S"`, `"Schweigaards gate 23, Oslo"`, `"Voss stasjon"`.

##### coords (`Coordinates`) [Optional]
A set of coordinates to use when the weighting search results. Examples: `{ latitude: 59.909774, longitude: 10.763712 }`.

The results closest to the coordinates will be weighted above results with equally good string matches.
As an example, the street `Dronningens gate` exists both in Oslo and Trondheim. If you call `service.getFeatures('Dronningens gate', { latitude: 63.4305103, longitude: 10.3949874 })` (coordinates of Trondheim city center), the Dronningens gate in Trondheim will be preferred to the one in Oslo.

##### params (`GetFeaturesQuery`) [Optional]
An optional object of parameters to pass to the query.

| Key                  | Type     | Default             | Description |
|:---------------------|:---------|:--------------------|:------------|
| `layers`             | `string` | `"venue,address"`   | The types of places to search for in a comma-separated string. `venue` means stop places and stations, `address` means postal addresses that might not be connected to public transport.

### getStopPlaceDepartures

```javascript
(stopPlaceId: string, params?: GetStopPlaceDeparturesParams) => Promise<Array<EstimatedCall>>
```

```javascript
(stopPlaceIds: Array<string>, params?: GetStopPlaceDeparturesParams) => Promise<Array<{ id: string, departures: Array<EstimatedCall> }>>
```

Types: [EstimatedCall](flow-types/EstimatedCall.js)

`getStopPlaceDepartures` finds departures from one or more given stop places.

#### Parameters

##### stopPlaceIds (`string` | `Array<string>`)
The ID or IDs of the stop places you are interested in. If a string is passed, it is interpreted as a single ID. The method will then return a Promise which will resolve to an array of departures for that stop place.

If an array of strings is passed, the method will return an array of objects containing fields for the stop place's `id` and `departures`.

##### params (`Object`) [Optional]
An optional object of parameters to pass to the query.

| Key                  | Type           | Default | Description |
|:---------------------|:---------------|:--------|:------------|
| `startTime`          | ISO8601 string | Now     | DateTime for when to fetch estimated calls from. |
| `range`              | `number`       | `86400` | The time range for departures to include in seconds. |
| `departures`         | `number`       | `5`     | The number of departures to return for each stop place. |
| `includeNonBoarding` | `boolean`      | `false` | Whether to include departures that do not accept boarding at given stop place. |

### getBikeRentalStation

```javascript
(stationId: string) => Promise<BikeRentalStation>
```

Types: [BikeRentalStation](flow-types/BikeRentalStation.js)

`getBikeRentalStation` finds a single bike rental station by its ID.

#### Parameters

##### stationId (`string`)
The ID of the bike rental station you are interested in. The method will return a Promise which will resolve to an object of type [BikeRentalStation](flow-types/BikeRentalStation.js).

### getBikeRentalStations

```javascript
(coordinates: Coordinates, distance?: number) => Promise<Array<BikeRentalStation>>
```

Types: [BikeRentalStation](flow-types/BikeRentalStation.js)

`getBikeRentalStations` finds bike rental stations within an area surrounding a coordinate.

#### Parameters

##### coordinates (`{ latitude: number, longitude: number }`)
The coordinates of which to find bike rental stations around.

##### distance (`number`) [Optional]
Default: `500`

The "radius" in meters of the surrounding bounding box in which you want to find bike rental stations.
The width and height of the bounding box are therefore `2 * distance`, and the coordinates given are its centerpoint.

### getStopPlace

```javascript
(id: string) => Promise<StopPlace>
```

Types: [StopPlace](flow-types/StopPlace.js)

`getStopPlace` finds the stop place with the given ID.

### getStopPlacesByPosition

```javascript
(coordinates: Coordinates, distance?: number) => Promise<Array<StopPlace>>
```

Types: [StopPlace](flow-types/StopPlace.js)

`getStopPlacesByPosition` finds stop places within an area surrounding a coordinate.

#### Parameters

##### coordinates (`Coordinates`)
The coordinates of which to find bike rental stations around.

##### distance (`number`) [Optional]
Default: `500`

The "radius" in meters of the surrounding bounding box in which you want to find stop places.
The width and height of the bounding box are therefore `2 * distance`, and the coordinates given are its centerpoint.

## Utils

### `throttler`

If you are going to do a lot of requests at the same time, you are likely to exceed our rate limits.
To help you with this, we have a `throttler` utility that throttles the requests in order to respect the rate limits.

Example usage:

```
import EnturService, { throttler, convertFeatureToLocation } from '@entur/sdk'

const service = new EnturService({ clientName: 'myawesomecompany-myawesomeapp' })

async function getTripPatternsForVeryManyDifferentLocations() {
  const [fromLocation] = await service.getFeatures('Oslo S')
  const [toLocation] = await service.getFeatures('Drammen stasjon')
  const params = {
      searchDate: new Date(),
      from: convertFeatureToLocation(fromLocation),
      to: convertFeatureToLocation(toLocation),
  }

  // A huge array of arguments that we want to call a function with, one by one.
  const queries = Array(3000).fill(params)

  // We pass the function and the huge list of arguments to the throttler.
  // The resulting list will be in the same order as the arguments passed.
  const tripPatterns = await throttler(query => service.getTripPatterns(query), queries)
  console.log('Done!')
  return tripPatterns
}
```

## Flow Types

We provide a library definition for Flow. In order to use this, make sure you include it in your .flowconfig

```
[libs]
node_modules/@entur/sdk/lib/libdef.flow.js
```
