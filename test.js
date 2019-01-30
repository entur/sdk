const [,, nameOfMethodToRun] = process.argv

require('@babel/register')({
    presets: [
        ['@babel/preset-env', {
            targets: { node: 'current' },
        }],
    ],
    ignore: [/node_modules/],
})

const { default: EnturService } = require('./src')

const service = new EnturService({
    clientName: 'SDK cli-test',
})

function getMetodToRun(name) {
    switch (name) {
        case 'getStopPlace':
            return service.getStopPlace('NSR:StopPlace:58366')
        case 'getStopPlaceFacilities':
            return service.getStopPlaceFacilities('NSR:StopPlace:58366')
        case 'getQuaysForStopPlace':
            return service.getQuaysForStopPlace('NSR:StopPlace:58366')
        case 'getBikeRentalStation':
            return service.getBikeRentalStation('470')
        default:
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject(`Error: method ${name} is not defined`)
    }
}

getMetodToRun(nameOfMethodToRun)
    // eslint-disable-next-line no-console
    .then(data => console.log(JSON.stringify(data, undefined, 4)), console.error)
