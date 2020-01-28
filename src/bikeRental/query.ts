import {
    fragmentName as bikeRentalStationFields,
    fragments as bikeRentalStationFragments,
} from '../fields/BikeRentalStation'

export const getBikeRentalStationQuery = `
query($id: String!) {
    bikeRentalStation(id: $id) {
        ...${bikeRentalStationFields}
    }
}

${bikeRentalStationFragments.join('')}
`

export const getBikeRentalStationsQuery = `
query {
    bikeRentalStations {
        ...${bikeRentalStationFields}
    }
}

${bikeRentalStationFragments.join('')}
`

export const getBikeRentalStationsByPositionQuery = `
query(
    $minLat: Float,
    $minLng: Float,
    $maxLat: Float,
    $maxLng: Float
) {
    bikeRentalStationsByBbox(
        minimumLatitude: $minLat,
        minimumLongitude: $minLng,
        maximumLatitude: $maxLat,
        maximumLongitude: $maxLng,
    ) {
        ...${bikeRentalStationFields}
    }
}

${bikeRentalStationFragments.join('')}
`
