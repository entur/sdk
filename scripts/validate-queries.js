/* eslint-disable no-console */

/*
This is a script that validates queries against the GraphQL schemas for JourneyPlanner and NSR.
To download updated schemas, run the ./scripts/fetch-schemas.sh script.
*/

import { parse, buildClientSchema } from 'graphql'
import { validate } from 'graphql/validation'

import journeyplanner2SchemaJSON from '../schemas/journeyplanner2.json'
import nsrSchemaJSON from '../schemas/nsr.json'
import mobilitySchemaJSON from '../schemas/mobility.json'

import {
    getBikeRentalStationQuery,
    getBikeRentalStationsQuery,
    getBikeRentalStationsByPositionQuery,
} from '../src/bikeRental/query'

import {
    getDeparturesFromStopPlacesQuery,
    getDeparturesFromQuayQuery,
    getDeparturesBetweenStopPlacesQuery,
    getDeparturesForServiceJourneyQuery,
} from '../src/departure/query'

import { getNearestPlacesQuery } from '../src/nearest/query'

import {
    getStopPlaceQuery,
    getStopPlacesQuery,
    getParentStopPlaceQuery,
    getStopPlacesByBboxQuery,
    getStopPlaceFacilitiesQuery,
    getQuaysForStopPlaceQuery,
} from '../src/stopPlace/query'

import { getTripPatternQuery } from '../src/trip/query'

import getVehiclesQuery from '../src/mobility/getVehicles/query'

const journeyplanner2Schema = buildClientSchema(journeyplanner2SchemaJSON.data)
const nsrSchema = buildClientSchema(nsrSchemaJSON.data)
const mobilitySchema = buildClientSchema(mobilitySchemaJSON.data)

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

const nsrQueries = [{ getStopPlaceFacilitiesQuery }]

const mobilityQueries = [{ getVehiclesQuery }]

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
    mobilityQueries.forEach((obj) => {
        const [name, query] = Object.entries(obj)[0]
        validateQuery(name, query, mobilitySchema)
    })
}

runValidations()
