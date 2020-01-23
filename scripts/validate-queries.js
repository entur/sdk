/* eslint-disable import/no-extraneous-dependencies */

/*
This is a script that validates queries against the GraphQL schemas for JourneyPlanner and NSR.
To download updated schemas, run the ./scripts/fetch-schemas.sh script.
*/

const { parse, buildClientSchema } = require('graphql')
const { validate } = require('graphql/validation')

const journeyplanner2SchemaJSON = require('../schemas/journeyplanner2.json')
const nsrSchemaJSON = require('../schemas/nsr.json')

const {
    getBikeRentalStationQuery,
    getBikeRentalStationsQuery,
    getBikeRentalStationsByPositionQuery,
} = require('../src/bikeRental/query')

const {
    getDeparturesFromStopPlacesQuery,
    getDeparturesFromQuayQuery,
    getDeparturesBetweenStopPlacesQuery,
    getDeparturesForServiceJourneyQuery,
} = require('../src/departure/query')

const {
    getNearestPlacesQuery,
} = require('../src/nearest/query')

const {
    getStopPlaceQuery,
    getStopPlacesQuery,
    getParentStopPlaceQuery,
    getStopPlacesByBboxQuery,
    getStopPlaceFacilitiesQuery,
    getQuaysForStopPlaceQuery,
} = require('../src/stopPlace/query')

const {
    getTripPatternQuery,
} = require('../src/trip/query')

const journeyplanner2Schema = buildClientSchema(journeyplanner2SchemaJSON.data)
const nsrSchema = buildClientSchema(nsrSchemaJSON.data)

const jp2Queries = [
    { getBikeRentalStationQuery },
    { getBikeRentalStationsQuery },
    { getBikeRentalStationsByPositionQuery },
    { getDeparturesFromStopPlacesQuery },
    { getDeparturesFromQuayQuery },
    { getDeparturesBetweenStopPlacesQuery },
    { getDeparturesForServiceJourneyQuery },
    { getNearestPlacesQuery },
    { getStopPlaceQuery },
    { getStopPlacesQuery },
    { getParentStopPlaceQuery },
    { getStopPlacesByBboxQuery },
    { getQuaysForStopPlaceQuery },
    { getTripPatternQuery },
]

const nsrQueries = [
    { getStopPlaceFacilitiesQuery },
]

function validateQuery(queryName, query, schema) {
    try {
        const validationResult = validate(schema, parse(query))
        if (validationResult.length) {
            throw new Error(validationResult[0])
        }
    } catch (error) {
        console.error(`Query "${queryName}" is not valid`)
        console.error(error)
        process.exit(1)
    }
}

function runValidations() {
    jp2Queries.forEach((obj) => {
        const [name, query] = Object.entries(obj)[0]
        validateQuery(name, query, journeyplanner2Schema)
    })
    nsrQueries.forEach((obj) => {
        const [name, query] = Object.entries(obj)[0]
        validateQuery(name, query, nsrSchema)
    })
}

runValidations()
