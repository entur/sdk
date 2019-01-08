// @flow
import { situationFields, situationFragment } from '../trip/queryHelper'

export const getStopPlaceProps = `
    query StopPlace($id:String!) {
        stopPlace(id:$id) {
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
