export const getBikeRentalStationByBoxProps = `
query bikeRentalStationsByBox($minimumLatitude:Float, $minimumLongitude:Float, $maximumLatitude:Float, $maximumLongitude:Float) {
  bikeRentalStationsByBbox(minimumLatitude: $minimumLatitude, minimumLongitude: $minimumLongitude, maximumLatitude: $maximumLatitude, maximumLongitude: $maximumLongitude) {
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
