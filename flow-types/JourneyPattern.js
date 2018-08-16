// @flow

import type { Line } from './Line'
import type { ServiceJourney } from './ServiceJourney'

export type JourneyPattern = {
    id: string,
    line: Line,
    name: string,
    serviceJourneys: Array<ServiceJourney>,
}
