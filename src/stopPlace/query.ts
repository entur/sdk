import {
    fragmentName as quayFields,
    fragments as quayFragments,
} from '../fields/Quay'

export const getStopPlaceQuery = `
query($id: String!, $filterByInUse: Boolean) {
    stopPlace(id: $id) {
        id
        name
        description
        latitude
        longitude
        wheelchairBoarding
        weighting
        transportMode
        transportSubmode
        quays(filterByInUse: $filterByInUse) {
            ...${quayFields}
        }
    }
}

${quayFragments.join('')}
`

export const getStopPlacesQuery = `
query($ids: [String]!, $filterByInUse: Boolean) {
    stopPlaces(ids: $ids) {
        id
        name
        description
        latitude
        longitude
        wheelchairBoarding
        weighting
        transportMode
        transportSubmode
        quays(filterByInUse: $filterByInUse) {
            ...${quayFields}
        }
    }
}

${quayFragments.join('')}
`

export const getParentStopPlaceQuery = `
query($id: String!, $filterByInUse: Boolean) {
    stopPlace(id: $id) {
        parent {
            id
            name
            description
            latitude
            longitude
            wheelchairBoarding
            weighting
            transportMode
            transportSubmode
            quays(filterByInUse: $filterByInUse) {
                ...${quayFields}
            }
        }
    }
}

${quayFragments.join('')}
`

export const getStopPlacesByBboxQuery = `
query(
    $minLat: Float,
    $minLng: Float,
    $maxLng: Float,
    $maxLat: Float,
    $filterByInUse: Boolean
) {
    stopPlacesByBbox(
        minimumLatitude: $minLat,
        minimumLongitude: $minLng,
        maximumLatitude: $maxLat,
        maximumLongitude: $maxLng
    ) {
        id
        name
        description
        latitude
        longitude
        wheelchairBoarding
        weighting
        transportMode
        transportSubmode
        quays(filterByInUse: $filterByInUse) {
            ...${quayFields}
        }
    }
}

${quayFragments.join('')}
`

export const getQuaysForStopPlaceQuery = `
query($id: String!, $filterByInUse: Boolean) {
    stopPlace(id: $id) {
        quays(filterByInUse: $filterByInUse) {
            ...${quayFields}
        }
    }
}

${quayFragments.join('')}
`
