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

export const getStopPlacesProps = `
    query StopPlaces($ids:[String]!,$start:DateTime!,$range:Int!,$departures:Int!) {
        stopPlaces(ids:$ids) {
          id
          estimatedCalls(startTime:$start, timeRange:$range, numberOfDepartures:$departures) { ...estimatedCallFields }
        }
    }

    fragment estimatedCallFields on EstimatedCall {
        realtimeState
        aimedDepartureTime
        expectedDepartureTime
        aimedArrivalTime
        expectedArrivalTime
        realtime
        forBoarding
        forAlighting
        destinationDisplay { frontText }
        quay { id publicCode description }
        serviceJourney { ...serviceJourneyFields }
    }

    fragment serviceJourneyFields on ServiceJourney {
      id
      journeyPattern { ...journeyPatternFields }
    }

    fragment journeyPatternFields on JourneyPattern {
      id
      name
      line { ...lineFields }
    }

    fragment lineFields on Line {
       id
       publicCode
       name
       transportMode
       authority { id name }
     }
`

export const getStopPlacesByBboxProps = `
    query StopPlacesByBboxProps($minLat:Float, $minLng:Float, $maxLng:Float, $maxLat:Float) {
        stopPlacesByBbox(minimumLatitude:$minLat, minimumLongitude:$minLng, maximumLatitude:$maxLat, maximumLongitude:$maxLng) {
            id
            name
            latitude
            longitude
            description
            wheelchairBoarding
            weighting
            transportMode
            transportSubmode
            quays { ...quayFields }
        }

    }

    fragment quayFields on Quay {
        id
        publicCode
        description
        ${situationFields}
    }
    ${situationFragment}
`

export const getStopPlaceDeparturesProps = `
    query StopPlaceDepartures($ids:[String]!,$start:DateTime!,$range:Int!,$departures:Int!,$onForBoarding:Boolean!) {
        stopPlaces(ids:$ids) {
          id
          estimatedCalls(startTime:$start, timeRange:$range, numberOfDepartures:$departures, omitNonBoarding:$onForBoarding) { ...estimatedCallFields }
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
