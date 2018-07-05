export const getBikeRentalStationByBoxProps = `
query bikeRentalStationsByBox($minLat:Float, $minLng:Float, $maxLat:Float, $maxLng:Float) {
  bikeRentalStationsByBbox(minimumLatitude: $minLat, minimumLongitude: $minLng, maximumLatitude: $maxLat , maximumLongitude: $maxLng) {
    id
    name
    bikesAvailable
    spacesAvailable
    longitude
    latitude
  }
}`

export const getBikeRentalStationProp = `
query bikeRentalStation($id:String!) {
  bikeRentalStation(id:$id) {
    id
    name
    bikesAvailable
    spacesAvailable
    longitude
    latitude
  }
}`

export const getBikeRentalStationsProps = `
{
  bikeRentalStation {
    id
    name
    bikesAvailable
    spacesAvailable
    longitude
    latitude
  }
}`
