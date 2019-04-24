const [,, nameOfMethodToRun] = process.argv

require('@babel/register')({
    presets: [
        ['@babel/preset-env', {
            targets: { node: 'current' },
        }],
    ],
    ignore: [/node_modules/],
})

const MOMOEN_LOCATION = {
    name: 'Momoen',
    place: 'NSR:StopPlace:3867',
    coordinates: {
        latitude: 59.804883,
        longitude: 11.391951,
    },
}

const LILLESTROM_LEGESENTER_LOCATION = {
    name: 'Lillestrøm legesenter',
    place: 'OSM:TopographicPlace:5921083879',
    coordinates: {
        latitude: 59.962737,
        longitude: 11.062501,
    },
}

const JERNBANETORGET_BIKE_STOP = '272'

const LILLEHAMMER_STASJON = 'NSR:StopPlace:420'
const HAMAR_STASJON = 'NSR:StopPlace:219'
const JERNBANETORGET = 'NSR:StopPlace:58366'
const OSLO_S = 'NSR:StopPlace:59872'
const MISSING = 'NSR:StopPlace:5483957348574389'

const { default: EnturService } = require('./src')

const service = new EnturService({
    clientName: 'SDK cli-test',
})

function getMethodToRun(name) {
    switch (name) {
        case 'getTripPatterns':
            return service.getTripPatterns(
                MOMOEN_LOCATION,
                LILLESTROM_LEGESENTER_LOCATION,
                undefined,
                [],
            )
        case 'getStopPlace':
            return service.getStopPlace(JERNBANETORGET)
        case 'getStopPlaces':
            return service.getStopPlaces([
                OSLO_S,
                MISSING,
                JERNBANETORGET,
                HAMAR_STASJON,
                LILLEHAMMER_STASJON,
            ])
        case 'getStopPlaceFacilities':
            return service.getStopPlaceFacilities(JERNBANETORGET)
        case 'getQuaysFromStopPlace':
            return service.getQuaysFromStopPlace(JERNBANETORGET)
        case 'getBikeRentalStation':
            return service.getBikeRentalStation(JERNBANETORGET_BIKE_STOP)
        case 'getBikeRentalStationsByPosition':
            return service.getBikeRentalStationsByPosition({
                latitude: 59.911898,
                longitude: 10.75038,
            }, 50)
        case 'getDeparturesFromStopPlace':
            return service.getDeparturesFromStopPlace(JERNBANETORGET)
        case 'getDeparturesFromStopPlaces':
            return service.getDeparturesFromStopPlaces(
                [JERNBANETORGET, HAMAR_STASJON, LILLEHAMMER_STASJON],
                { limit: 2 },
            )
        case 'getDeparturesBetweenStopPlaces':
            return service.getDeparturesBetweenStopPlaces(LILLEHAMMER_STASJON, HAMAR_STASJON)
        default:
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject(`Error: method ${name} is not defined`)
    }
}

getMethodToRun(nameOfMethodToRun)
    // eslint-disable-next-line no-console
    .then(data => console.log(JSON.stringify(data, undefined, 4)), console.error)
