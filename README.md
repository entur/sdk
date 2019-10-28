# Entur SDK

This SDK simplifies the use of Entur's travel APIs in JavaScript apps. For more information about Entur's APIs, see https://developer.entur.org

Miss anything? Found a bug? File an [issue](https://github.com/entur/sdk/issues/new) or create a pull request!

* [Installation](#install)
* [Setup](#setup)
* [API](#api)
    * [findTrips](#findtrips)
    * [getTripPatterns](#gettrippatterns)
    * [getFeatures](#getfeatures)
    * [getDeparturesFromStopPlace](#getdeparturesfromstopplace)
    * [getDeparturesFromStopPlaces](#getdeparturesfromstopplaces)
    * [getDeparturesFromQuays](#getdeparturesfromquays)
    * [getDeparturesBetweenStopPlaces](#getdeparturesbetweenstopplaces)
    * [getBikeRentalStation](#getbikerentalstation)
    * [getBikeRentalStations](#getbikerentalstations)
    * [getBikeRentalStationsByPosition](#getbikerentalstationsbyposition)
    * [getStopPlace](#getstopplace)
    * [getStopPlaces](#getstopplaces)
    * [getParentStopPlace](#getparentstopplace)
    * [getStopPlacesByPosition](#getstopplacesbyposition)
    * [getQuaysForStopPlace](#getquaysforstopplace)
* [Utils](#utils)
    * [throttler](#throttler)
* [Types](#flow-and-typescript)

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
followed by a hyphen and your application's name. See https://developer.entur.org/pages-intro-authentication for more information.

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
(from: Location, to: Location, params?: GetTripPatternsParams, ignoreFields?: Array<string>) => Promise<Array<TripPattern>>
```

Types: [TripPattern](flow-types/TripPattern.js)

`getTripPatterns` is for searching for itineraries for a trip from some location to a destination at a given time. The method takes one argument `query`, which is an object with search parameters.

If you are going to do a huge amount of different searches at the same time, consider using our [`throttler`](#throttler) utility.

#### Parameters

##### from (`Location`)
The location to search for travels from.

##### to (`Location`)
The destination location to search for travels to.

##### params (`GetTripPatternsParams`) [Optional]
An object of search parameters.

| Key                     | Type               | Default   | Description |
|:------------------------|:-------------------|:----------|:------------|
| `searchDate`            | `Date`             | | when to calculate patterns |
| `arriveBy`              | `boolean`          | `false` | depart by `searchDate`, or arrive by `searchDate` |
| `modes`                 | [`Array of Modes`](#leg-mode) | `['foot', 'bus', 'tram', 'rail', 'metro', 'water', 'air']` | modes of transport to include in trip |
| `limit`                 | `number`           | `5`      | Limit result to this number of trip patterns |
| `wheelchairAccessible`  | `boolean`          | `false`  | include only stops which are wheelchair accessible |
| `walkSpeed`             | `number`           | `1.3`    | the walk speed to use in searches in meters per second |


##### ignoreFields  [Optional]
A list of keys to exclude from the resulting trip patterns.

Default:
```
[
    'notices',
    'situations',
    'journeyPattern',
    'fromEstimatedCall',
    'toEstimatedCall',
    'intermediateEstimatedCalls',
    'interchangeFrom',
    'interchangeTo',
    'pointsOnLink',
    'authority',
    'operator',
    'quay',
    'bookingArrangements',
    'rentedBike',
]
```

#### Example

```javascript
service.getTripPatterns(
    {
        name: 'Ryllikvegen, Lillehammer',
        coordinates: {
            latitude: 61.102848368937416,
            longitude: 10.51613308426234
        },
    },
    {
        place: 'NSR:StopPlace:337',
        name: 'Oslo S, Oslo'
    },
    {
        searchDate: new Date(),
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
| `layers`             | `Array<string>` | `["venue", "address"]`   | The types of places to search for. `venue` means stop places and stations, `address` means postal addresses that might not be connected to public transport.

### getDeparturesFromStopPlace

```javascript
(stopPlaceId: string, params?: GetDeparturesParams) => Promise<Array<Departure>>
```

Types: [Departure](flow-types/Departures.js)

`getDeparturesFromStopPlace` finds departures from one given stop place. Also see `getDeparturesFromStopPlaces` for fetching for multiple stops simultaneously.
The method will return a Promise which will resolve to an array of departures for that stop place.

#### Parameters

##### stopPlaceId (`string`)
The ID of the stop place you are interested in.

##### params (`Object`) [Optional]
An optional object of parameters to pass to the query.

| Key                      | Type           | Default      | Description |
|:-------------------------|:---------------|:-------------|:------------|
| `start`                  | `Date`         | `new Date()` | DateTime for when to fetch estimated calls from. |
| `timeRange`              | `number`       | `72000`      | The time range for departures to include in seconds. |
| `departures`             | `number`       | `5`          | The number of departures to return for each stop place. |
| `includeNonBoarding`     | `boolean`      | `false`      | Whether to include departures that do not accept boarding at given stop place. |
| `limit`                  | `number`       | `50`         | The maximum number of departures to fetch. |
| `limitPerLine`           | `number`       | No limit     | The maximum number of departures to fetch per line and destination display. |
| `whiteListedLines`       | `Array<string>` | `undefined` | A list of line IDs to include. All others will be excluded. If omitted, all are included. |
| `whiteListedAuthorities` | `Array<string>` | `undefined` | A list of authority IDs to include. All others will be excluded. If omitted, all are included. |
| `whiteListedModes`       | `Array<string>` | `undefined` | A list of transport modes to include. All others will be excluded. If omitted, all are included. |

### getDeparturesFromStopPlaces

```javascript
(stopPlaceIds: Array<string>, params?: GetDeparturesParams) => Promise<Array<{ id: string, departures: Array<Departure> }>>
```

Types: [Departure](flow-types/Departures.js)

`getDeparturesFromStopPlaces` finds departures from one or more given stop places. Also see `getDeparturesFromStopPlace` for a simpler interface for fetching departures for a single stop.

The method will return an array of objects containing fields for the stop place's `id` and `departures`.

#### Parameters

##### stopPlaceIds (`Array<string>`)
The IDs of the stop places you are interested in.

##### params (`Object`) [Optional]

See the `params` parameter for `getDeparturesForStopPlace`.

### getDeparturesFromQuays

```javascript
(quayIds: Array<string>, params?: GetDeparturesParams) => Promise<Array<{ id: string, departures: Array<Departure | void> }>>
```

Types: [Departure](flow-types/Departures.js)

`getDeparturesFromQuays` finds departures from one or more given quays.

The method will return an array of objects containing fields for the quay's `id` and its corresponding `departures`.

#### Parameters

##### quayIds (`Array<string>`)
The IDs of the quays you are interested in.

##### params (`Object`) [Optional]

See the `params` parameter for `getDeparturesForStopPlace`.

### getDeparturesBetweenStopPlaces

```javascript
(fromStopPlaceId: string, toStopPlaceId: string, params?: GetDeparturesBetweenStopPlacesParams) => Promise<Array<Departure>>
```

Types: [Departure](flow-types/Departures.js)

`getDeparturesBetweenStopPlaces` finds departures from a stop place, but only departures that will go to the destination stop place.

#### Parameters

##### fromStopPlaceId (`string`)
The ID of the stop place to get departures _from_.

##### toStopPlaceId (`string`)
The ID of the stop place to get departures _to_.

##### params (`Object`) [Optional]

| Key                      | Type           | Default      | Description |
|:-------------------------|:---------------|:-------------|:------------|
| `start`                  | `Date`         | `new Date()` | DateTime for when to fetch estimated calls from. |
| `limit`                  | `number`       | `20`         | The maximum number of departures to fetch. |


### getNearestPlaces

```javascript
(coordinates: { latitude: number, longitude: number }, params?: NearestPlacesParams) => Promise<Array<NearestPlace>>
```

Types: [NearestPlace](flow-types/NearestPlace.js)

Finds the nearest places to a given coordinate.

#### Parameters

##### coordinates (`{ latitude: number, longitude: number }`)
The latitude and longitude for the point you want to find places close to.

##### params (`Object`) [Optional]

| Key                      | Type           | Default      | Description |
|:-------------------------|:---------------|:-------------|:------------|
| `maximumDistance`        | `number`       | `2000`       | Maximum distance (in meters) to search for from the specified location. |
| `maximumResults`         | `number`       | `20`         | The maximum number of results to return. |
| `filterByPlaceTypes`     | `'BikePark' | 'BikeRentalStation' | 'CarPark' | 'Quay' | 'StopPlace'` | No restrictions. | Only include places of given types if set. |
| `filterByModes`          | `TransportMode` | No restrictions. | Only include places that include this mode. Only checked for places with mode i.e. quays, departures. |
| `filterByInUse`          | `boolean` | `false`. | Only affects queries for quays and stop places. If true only quays and stop places with at least one visiting line are included. |
| `multiModalMode`          | `'parent' | 'child' | 'all'` | `'parent'`. | MultiModalMode for query. To control whether multi modal parent stop places, their mono modal children or both are included in the response. Does not affect mono modal stop places that do not belong to a multi modal stop place. Only applicable for placeType StopPlace |

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
(stationIds: Array<string>) => Promise<Array<BikeRentalStation>>
```

Types: [BikeRentalStation](flow-types/BikeRentalStation.js)

`getBikeRentalStations` finds multiple bike rental stations according to an array of IDs. The returned array will have the same order as the input array, and may contain undefined values if the corresponding ID didn't produce a result.

#### Parameters

##### stationIds (`Array<string>`)
The IDs of the bike rental stations you are interested in. The method will return a Promise which will resolve to an array of objects of type [BikeRentalStation](flow-types/BikeRentalStation.js).

### getBikeRentalStationsByPosition

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
(id: string, params?: StopPlaceParams) => Promise<StopPlaceDetails>
```

Types: [StopPlaceDetails](flow-types/StopPlace.js)

`getStopPlace` finds the stop place with the given ID.

#### Parameters

##### id (`string`)

The ID of the stop place to get.

##### params (`Object`) [Optional]

| Key                      | Type           | Default      | Description |
|:-------------------------|:---------------|:-------------|:------------|
| `includeUnusedQuays`     | `boolean`      | `true`       | Whether to include quays no longer in use or not. |

### getStopPlaces

```javascript
(ids: Array<string>, params?: StopPlaceParams) => Promise<Array<StopPlaceDetails | void>>
```

Types: [StopPlaceDetails](flow-types/StopPlace.js)

`getStopPlaces` finds multiple stop places according to an array of IDs. The returned array will have the same order as the input array, and may contain undefined values if the corresponding ID didn't produce a result.

#### Parameters

##### ids (`Array<string>`)

The IDs of the stop places to get.

##### params (`Object`) [Optional]

See the `params` parameter for `getStopPlace`.

### getParentStopPlace

```javascript
(id: string, params?: StopPlaceParams) => Promise<StopPlaceDetails>>
```

Types: [StopPlaceDetails](flow-types/StopPlace.js)

#### Parameters

##### id (`string`)

The ID of the stop place to get the parent stop place of.

##### params (`Object`) [Optional]

See the `params` parameter for `getStopPlace`.

### getStopPlacesByPosition

```javascript
(coordinates: Coordinates, distance?: number, params?: StopPlaceParams) => Promise<Array<StopPlaceDetails>>
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

##### params (`Object`) [Optional]

See the `params` parameter for `getStopPlace`.

### getStopPlaceFacilities

```
(stopPlaceId: string) => Promise<StopPlaceFacilities>
```

Types: [StopPlaceFacilities](flow-types/StopPlace.js)

`getStopPlaceFacilities` returns information about the available facilities at a given stop place.
Facilities can be accessibility assessments like is the stop place wheelchair accessible? Or other things, like is there a waiting room, sanitary or ticketing equipment, etc.

#### Parameters

##### stopPlaceId (`string`)
The ID of the stop place to find facilities for. Example: `"NSR:StopPlace:59616"`.


### getQuaysForStopPlace

```javascript
(stopPlaceId: string, params?: StopPlaceParams) => Promise<Array<Quay>>
```

Types:
* [StopPlaceFacilities](flow-types/StopPlace.js)
* [Quay](flow-types/Quay.js)

Returns all the quays that belong to a stop place.

#### Parameters

##### stopPlaceId (`string`)
The ID of the stop place to find quays for. Example: `"NSR:StopPlace:59616"`.

##### params (`Object`) [Optional]

| Key                      | Type           | Default      | Description |
|:-------------------------|:---------------|:-------------|:------------|
| `includeUnusedQuays`     | `boolean`      | `true`       | Whether to include quays no longer in use or not. |

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

## Flow and TypeScript

We provide library definitions for Flow and TypeScript. TypeScript should work out of the box. For Flow, make sure you include the following in your .flowconfig:

```
[libs]
node_modules/@entur/sdk/lib/libdef.flow.js
```
