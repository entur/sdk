/* eslint-disable import/no-unresolved, import/extensions, no-console, import/no-extraneous-dependencies */

import EnturService from '@entur/sdk'

const service = new EnturService({
    clientName: 'awesomecompany-awesomeapp',
})

const now = new Date()

function toTimeString(date) {
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${hour}:${minute}`
}

function minutesDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    return Math.floor(timeDiff / (1000 * 60))
}

/**
An example of how to find the next departures from a stop place.

In this case, we will find departures from Rødsildrevegen (NSR:StopPlace:14202)
and print them like so:

4 min bus B4 Høgskolen Storhove
15:55 bus B4 Høgskolen Storhove
16:10 bus B4 Høgskolen Storhove
16:25 bus B4 Høgskolen Storhove
16:40 bus B4 Skysstasjonen
16:55 bus B4 Skysstasjonen
*/
async function getDeparturesFromStopPlaceExample() {
    const departures = await service.getDeparturesFromStopPlace('NSR:StopPlace:14202')

    departures.forEach((departure) => {
        const { expectedDepartureTime, destinationDisplay, serviceJourney } = departure
        const { line } = serviceJourney

        const departureTime = new Date(expectedDepartureTime)
        const minDiff = minutesDifference(now, departureTime)
        const departureLabel = minDiff < 15 ? `${minDiff} min` : toTimeString(departureTime)

        console.log(`${departureLabel} ${line.transportMode} ${line.publicCode} ${destinationDisplay.frontText}`)
    })
}

getDeparturesFromStopPlaceExample()
