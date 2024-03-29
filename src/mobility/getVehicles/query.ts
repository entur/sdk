export default `
query ($lat: Float!, $lon: Float!, $range: Int!, $count: Int, $operators: [String], $codespaces: [String], $formFactors: [FormFactor], $propulsionTypes: [PropulsionType], $includeReserved: Boolean = false, $includeDisabled: Boolean = false) {
    vehicles(
        range: $range,
        propulsionTypes: $propulsionTypes,
        operators: $operators,
        codespaces: $codespaces,
        includeReserved: $includeReserved,
        lon: $lon,
        lat: $lat,
        count: $count,
        formFactors: $formFactors,
        includeDisabled: $includeDisabled
    ) {
        lat
        lon
        vehicleType {
            id
            formFactor
            propulsionType
        }
        pricingPlan {
            description {
                translation {
                    language
                    value
                }
            }
            id
            currency
            isTaxable
            name {
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
            price
            surgePricing
            url
        }
        system {
            name {
                translation {
                    language
                    value
                }
            }
            email
            feedContactEmail
            id
            licenseUrl
            language
            phoneNumber
            operator {
                id
                name {
                     translation {
                        language
                        value
                    }
                }
            }
            purchaseUrl
            startDate
            shortName {
                translation {
                    language
                    value
                }
            }
            timezone
            url
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
        isDisabled
        isReserved
        id
        currentRangeMeters
        rentalUris {
            android
            ios
            web
        }
    }
}
`
