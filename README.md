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
Returns: Array<[Itinerary](src/flow-types/Itinerary.js)>

`getTripPatterns` is for searching for itineraries for a trip from some location to a destination at a given time. The method takes one argument `query`, which is an object with search parameters.

#### Parameters

##### query (Object)
| Key | Type | Default  | Description |
|:----|:----|:----------|:------------|
| searchDate            | `Date`             | | when to calculate patterns |
| from                  | [`Position`](#position) | | departure location |
| to                    | [`Position`](#position) | | arrival location |
| arriveBy              | `boolean`          | `false` | depart by `searchDate`, or arrive by `searchDate` |
| modes                 | [`Array of Modes`](#travel-mode) | `['FOOT', 'BUS', 'TRAM', 'RAIL', 'METRO', 'WATER', 'AIR']` | modes of transport to include in trip |
| limit                 | `number`           | `5`      | Limit search to |
| wheelchairAccessible  | `boolean`          | `false`  | include only stops which are wheelchair accessible |

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
