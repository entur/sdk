/* eslint-disable import/no-unresolved, import/extensions, no-console, import/no-extraneous-dependencies */

import EnturService, { convertFeatureToLocation } from '@entur/sdk'

const service = new EnturService({
    clientName: 'awesomecompany-awesomeapp',
})

/**
An example of how to find trips between two places.

Since getTripPatterns cannot take our search strings directly, we first
need to use `getFeatures` to search for features we can use.
We call getFeatures for both the origin and destination, and pick the first result of each.

getTripPatterns expects `Location` objects, so we use the util `convertFeatureToLocation` to
convert our features into suitable locations.

The result will be a list of TripPatterns, each of which describe a potential journey from A to B.
*/

async function getTripPatternsExample() {
    const [fromFeature] = await service.getFeatures('Ryllikvegen, Lillehammer')
    const [toFeature] = await service.getFeatures('Oslo S')

    if (!fromFeature || !toFeature) {
        return
    }

    const tripPatterns = await service.getTripPatterns(
        convertFeatureToLocation(fromFeature),
        convertFeatureToLocation(toFeature),
        {
            searchDate: new Date(),
        },
    )

    console.log(tripPatterns)
}

getTripPatternsExample()
