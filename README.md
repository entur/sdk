# Entur SDK

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

## Usage

### getTripPatterns

```javascript
service.getTripPatterns(query);
```
Returns: `Promise<Array<TripPattern>>`

Types: [TripPattern](flow-types/TripPattern.js)

`getTripPatterns` is for searching for itineraries for a trip from some location to a destination at a given time. The method takes one argument `query`, which is an object with search parameters.

If you are going to do a huge amount of different searches at the same time, consider using our [`throttler`](#throttler) utility.

#### Parameters

##### query (`Object`)
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
service.getFeatures(query);
```
Returns: `Promise<Array<Feature>>`

Types: [Feature](flow-types/Feature.js), [Coordinates](flow-types/Coordinates.js)

`getFeatures` is for searching for stop places, stations or addresses. The method takes two arguments `query`, which is the search string, and `coords` which is an object ([Coordinates](flow-types/Coordinates.js)) consisting of latitude, longitude numbers.

#### Parameters

##### query (`string`)
The search string that should resemble the name of the desired stop place or address. Examples: `"Oslo S"`, `"Schweigaards gate 23, Oslo"`, `"Voss stasjon"`.

#### Parameters

##### coords (`Coordinates`)
A set of coordinates to use when the weighting search results. Examples: `{ latitude: 59.909774, longitude: 10.763712 }`.


### getStopPlaceDepartures

```javascript
service.getStopPlaceDepartures(stopPlaceIds, params);
```
Returns: `Promise<Array<EstimatedCall>>` | `Promise<Array<{ id: string, departures: Array<EstimatedCall>}>>`

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
service.getBikeRentalStation(stationId);
```
Returns: `Promise<BikeRentalStation>`

Types: [BikeRentalStation](flow-types/BikeRentalStation.js)

`getBikeRentalStation` finds a single bike rental station by its ID.

#### Parameters

##### stationId (`string`)
The ID of the bike rental station you are interested in. The method will return a Promise which will resolve to an object of type [BikeRentalStation](flow-types/BikeRentalStation.js).

### getBikeRentalStations

```javascript
service.getBikeRentalStations(coordinate, distance);
```
Returns: `Promise<Array<BikeRentalStation>>`

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
service.getStopPlace(id);
```
Returns: `Promise<StopPlace>`

Types: [StopPlace](flow-types/StopPlace.js)

`getStopPlace` finds the stop place with the given ID.

### getStopPlacesByPosition

```javascript
service.getStopPlacesByPosition(coordinate, distance);
```
Returns: `Promise<Array<StopPlace>>`

Types: [StopPlace](flow-types/StopPlace.js)

`getStopPlacesByPosition` finds stop places within an area surrounding a coordinate.

#### Parameters

##### coordinates (`{ latitude: number, longitude: number }`)
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

## Flow types

We provide a library definition for Flow. In order to use this, make sure you include it in your .flowconfig

```
[libs]
node_modules/@entur/sdk/lib/libdef.flow.js
```
