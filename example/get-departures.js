const { default: EnturService } = require('../lib')

const service = new EnturService()
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

service.getStopPlaceDepartures('NSR:StopPlace:14202').then(departures => departures.forEach((departure) => {
    const { expectedDepartureTime, destinationDisplay, serviceJourney } = departure
    const { line } = serviceJourney.journeyPattern

    const departureTime = new Date(expectedDepartureTime)
    const minDiff = minutesDifference(now, departureTime)
    const departureLabel = minDiff < 15 ? `${minDiff} min` : toTimeString(departureTime)

    // eslint-disable-next-line no-console
    console.log(`${departureLabel} ${line.transportMode} ${line.publicCode} ${destinationDisplay.frontText}`)
}))
