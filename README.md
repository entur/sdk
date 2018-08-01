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
| apikeys     | `{object of apikeys}` | `{}`        | Define apikeys for individual endpoints |


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


#### apikeys
API key can be supplied for each endpoint. The key will be added to the http header for all requests.
`geocoder` and `journeyplanner` is publicly available and does not require api keys

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
Returns: `Promise<Array<Itinerary>>`

Types: [Itinerary](src/flow-types/Itinerary.js)

`getTripPatterns` is for searching for itineraries for a trip from some location to a destination at a given time. The method takes one argument `query`, which is an object with search parameters.

#### Parameters

##### query (`Object`)
| Key | Type | Default  | Description |
|:----|:----|:----------|:------------|
| `searchDate`            | `Date`             | | when to calculate patterns |
| `from`                  | [`Position`](#position) | | departure location |
| `to`                    | [`Position`](#position) | | arrival location |
| `arriveBy`              | `boolean`          | `false` | depart by `searchDate`, or arrive by `searchDate` |
| `modes`                 | [`Array of Modes`](#travel-mode) | `['FOOT', 'BUS', 'TRAM', 'RAIL', 'METRO', 'WATER', 'AIR']` | modes of transport to include in trip |
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

### getLocations

```javascript
service.getLocations(query);
```
Returns: `Promise<Array<Location>>`

Types: [Location](src/flow-types/Location.js)

`getLocation` is for searching for stop places, stations or addresses. The method takes one argument `query`, which is the search string.

#### Parameters

##### query (`string`)
The search string that should resemble the name of the desired stop place or address. Examples: `"Oslo S"`, `"Schweigaards gate 23, Oslo"`, `"Voss stasjon"`.


### getStopPlaceDepartures

```javascript
service.getStopPlaceDepartures(stopPlaceIds, params);
```
Returns: `Promise<Array<EstimatedCall>>` | `Promise<Array<{ id: string, departures: Array<EstimatedCall>}>>`

Types: [EstimatedCall](src/flow-types/EstimatedCall.js)

`getStopPlaceDepartures` finds departures from one or more given stop places.

#### Parameters

##### stopPlaceIds (`string` | `Array<string>`)
The ID or IDs of the stop places you are interested in. If a string is passed, it is interpreted as a single ID. The method will then return a Promise which will resolve to an array of departures for that stop place.

If an array of strings is passed, the method will return an array of objects containing fields for the stop place's `id` and `departures`.

##### params (`Object`) [Optional]
An optional object of parameters to pass to the query.

| Key             | Type           | Default | Description |
|:----------------|:---------------|:--------|:------------|
| `startTime`     | ISO8601 string | Now     | DateTime for when to fetch estimated calls from. |
| `range`         | `number`       | `86400` | The time range for departures to include in seconds. |
| `departures`    | `number`       | `5`     | The number of departures to return for each stop place. |
| `onForBoarding` | `boolean`      | `false` | Whether to include departures that do not accept boarding at given stop place. |


### getBikeRentalStation

```javascript
service.getBikeRentalStation(stationId);
```
Returns: `Promise<BikeRentalStation>`

Types: [BikeRentalStation](src/flow-types/BikeRentalStation.js)

`getBikeRentalStation` finds a single bike rental station by its ID.

#### Parameters

##### stationId (`string`)
The ID of the bike rental station you are interested in. The method will return a Promise which will resolve to an object of type [BikeRentalStation](src/flow-types/BikeRentalStation.js).

### getBikeRentalStations

```javascript
service.getBikeRentalStations(coordinate, distance);
```
Returns: `Promise<Array<BikeRentalStation>>`

Types: [BikeRentalStation](src/flow-types/BikeRentalStation.js)

`getBikeRentalStations` finds bike rental stations within an area surrounding a coordinate.

#### Parameters

##### coordinates (`{ latitude: number, longitude: number }`)
The coordinates of which to find bike rental stations around.

##### distance (`number`) [Optional]
Default: `500`

The "radius" in meters of the surrounding bounding box in which you want to find bike rental stations.
The width and height of the bounding box are therefore `2 * distance`, and the coordinates given are its centerpoint.

### getStopPlacesByPosition

```javascript
service.getStopPlacesByPosition(coordinate, distance);
```
Returns: `Promise<Array<StopPlace>>`

Types: [StopPlace](src/flow-types/StopPlace.js)

`getStopPlacesByPosition` finds stop places within an area surrounding a coordinate.

#### Parameters

##### coordinates (`{ latitude: number, longitude: number }`)
The coordinates of which to find bike rental stations around.

##### distance (`number`) [Optional]
Default: `500`

The "radius" in meters of the surrounding bounding box in which you want to find stop places.
The width and height of the bounding box are therefore `2 * distance`, and the coordinates given are its centerpoint.

## Custom Types
#### Position
```javascript
{
    name: string,
    place?: string,
    coordinates?: {
        latitude: number,
        longitude: number
    }
}
```

#### Travel mode
```javascript
 'air' | 'bicycle' | 'bus' | 'cableway' | 'car' | 'water' | 'funicular' | 'lift' | 'rail' | 'metro' |
 'tram' | 'transit' | 'foot' | 'car_park' | 'car_pickup'
```
