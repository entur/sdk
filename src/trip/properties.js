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


const getItinerariesProps = `
    query tripPatterns($numTripPatterns:Int!,$wheelchair:Boolean!,$from:Location!,$to:Location!,$date:Date!,$dateTime:DateTime!,$arriveBy:Boolean!,$modes:[Mode]!){
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
        realTime
        distance
        duration
        pointsOnLink { points length }
        ${placeFields}
        intermediateQuays { id name description publicCode }
        authority { id name }
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
      estimatedCalls(date: $date) { ...estimatedCallFields }
      journeyPattern { notices { text } }
      notices { text }
      ${situationFields}
    }

    ${intermediateEstimatedCallFragment}

    fragment estimatedCallFields on EstimatedCall {
      quay { id name description publicCode }
      aimedArrivalTime
      expectedArrivalTime
      aimedDepartureTime
      expectedDepartureTime
      timingPoint
      realtime
      realtimeState
      forBoarding
      forAlighting
      date
      destinationDisplay { frontText }
    }

    ${situationFragment}
`

export default getItinerariesProps
