/* eslint-disable import/no-unresolved, import/extensions, no-console */

import EnturService, { convertFeatureToLocation } from '@entur/sdk'

const service = new EnturService()

async function example() {
    const [fromFeature] = await service.getFeatures('Ryllikvegen, Lillehammer')
    const [toFeature] = await service.getFeatures('Oslo S')

    if (!fromFeature || !toFeature) {
        return
    }

    const tripPatterns = await service.getTripPatterns({
        searchDate: new Date(),
        from: convertFeatureToLocation(fromFeature),
        to: convertFeatureToLocation(toFeature),
    })

    console.log(tripPatterns)
}

example()
