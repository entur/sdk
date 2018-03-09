// @flow

import type { Alert } from './Alert'
import type { StoptimeForDate } from './StoptimeForDate'

export type Trip = {
    alerts: Array<Alert>,
    routeShortName: string,
    stoptimesForDate: Array<StoptimeForDate>,
    tripHeadsign: string,
    tripShortName: string,
}
