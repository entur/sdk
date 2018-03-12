// @flow
const EnturService = require('../lib').default;

const service = new EnturService({
    environment: 'STAGING',
});

service.getTripPatterns({
    searchDate: new Date(),
    from: {
        name: 'Ryllikvegen, Lillehammer',
        coordinates: {
            latitude: 61.102848368937416,
            longitude: 10.51613308426234,
        },
    },
    to: {
        place: 'NSR:StopPlace:337',
        name: 'Oslo S, Oslo',
    },
}).then(console.log);
