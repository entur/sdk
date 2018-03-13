const { default: EnturService, convertLocationToPosition } = require('../lib')

const service = new EnturService({
    environment: 'PROD',
})


async function example() {
    const [fromLocation] = await service.getLocations('Ryllikvegen, Lillehammer')
    const [toLocation] = await service.getLocations('Oslo S')

    if (fromLocation && toLocation) {
        service.getTripPatterns({
            searchDate: new Date(),
            from: convertLocationToPosition(fromLocation),
            to: convertLocationToPosition(toLocation),
        }).then(console.log) // eslint-disable-line no-console
    }
}

example()
