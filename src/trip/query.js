// @flow
import {
    placeFields,
    lineFields,
    intermediateEstimatedCallFields,
    placeFragment,
    lineFragment,
    situationFields,
    intermediateEstimatedCallFragment,
    situationFragment,
} from './queryHelper'


export const getItinerariesProps = `
    query tripPatterns($numTripPatterns:Int!,$wheelchair:Boolean!,$from:Location!,$to:Location!,$dateTime:DateTime!,$arriveBy:Boolean!,$modes:[Mode]!){
        trip(
            numTripPatterns: $numTripPatterns
            wheelchair: $wheelchair
            from: $from
            to: $to
            dateTime: $dateTime
            arriveBy: $arriveBy
            modes: $modes
        ) {
            tripPatterns {
                startTime
                endTime
                duration
                waitingTime
                walkDistance
                legs { ...legFields }
            }
        }
    }

    fragment legFields on Leg {
        mode
        aimedStartTime
        aimedEndTime
        expectedStartTime
        expectedEndTime
        realtime
        distance
        duration
        pointsOnLink { points length }
        ${placeFields}
        intermediateQuays { id name description publicCode }
        authority { id name }
        operator { id name url }
        ${lineFields}
        serviceJourney { ...serviceJourneyFields }
        ${intermediateEstimatedCallFields}
        ride
    }

    ${placeFragment}

    ${lineFragment}

    fragment serviceJourneyFields on ServiceJourney {
      id
      privateCode
      linePublicCode
      wheelchairAccessible
      journeyPattern { notices { text } }
      notices { text }
      ${situationFields}
    }

    ${intermediateEstimatedCallFragment}

    ${situationFragment}
`

export const getStopPlaceDeparturesProps = `
    query StopPlaceDepartures($ids:[String]!,$start:DateTime!,$range:Int!,$departures:Int!,$omitNonBoarding:Boolean!) {
        stopPlaces(ids:$ids) {
          id
          estimatedCalls(startTime:$start, timeRange:$range, numberOfDepartures:$departures, omitNonBoarding:$omitNonBoarding) { ...estimatedCallFields }
        }
    }

    fragment estimatedCallFields on EstimatedCall {
        aimedDepartureTime
        expectedDepartureTime
        realtime
        forBoarding
        forAlighting
        date
        destinationDisplay { frontText }
        notices { text }
        quay { ...quayFields }
        serviceJourney { ...serviceJourneyFields }
    }

    fragment quayFields on Quay {
        id
        publicCode
        description
        ${situationFields}
    }

    fragment serviceJourneyFields on ServiceJourney {
      id
      journeyPattern { ...journeyPatternFields }
      notices { text }
      transportSubmode
      ${situationFields}
    }

    fragment journeyPatternFields on JourneyPattern {
      id
      name
      ${lineFields}
      notices { text }
    }

    ${lineFragment}

    ${situationFragment}
`
