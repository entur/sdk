export default `
query ($lat: Float!, $lon: Float!, $range: Int!, $count: Int, $codespaces: [String], $systems: [String], $operators: [String]) {
    stations(
      lon: $lon,
      lat: $lat,
      range: $range,
      count: $count,
      codespaces: $codespaces,
      systems: $systems,
      operators: $operators
    ) {
      id
      name {
        translation {
          language
          value
        }
      }
      lat
      lon
      address
      capacity
      rentalUris {
        android
        ios
        web
      }
      numBikesAvailable
      numDocksAvailable
      isInstalled
      isRenting
      isReturning
      lastReported
      system {
        id
        language
        name {
          translation {
            language
            value
          }
        }
        shortName {
          translation {
            language
            value
          }
        }
        operator {
          id
          name {
            translation {
              language
              value
            }
          }
        }
        url
        purchaseUrl
        startDate
        phoneNumber
        email
        feedContactEmail
        timezone
        licenseUrl
        rentalApps {
          ios {
            storeUri
            discoveryUri
          }
          android {
            storeUri
            discoveryUri
          }
        }
      }
      pricingPlans {
        id
        url
        name {
          translation {
            language
            value
          }
        }
        currency
        price
        isTaxable
        description {
          translation {
            language
            value
          }
        }
        perKmPricing {
          start
          rate
          interval
          end
        }
        perMinPricing {
          start
          rate
          interval
          end
        }
        surgePricing
      }
      vehicleTypesAvailable {
          vehicleType {
              formFactor
              propulsionType
              id
              maxRangeMeters
              name {
                  translation {
                      language
                      value
                  }
              }
          }
          count
      }
    }
  }
`
