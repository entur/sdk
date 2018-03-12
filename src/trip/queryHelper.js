/*
 * Common query fields and fragments used in Journeyplanner queries.
 * Interpolate them into the query strings wherever they are needed.
 */

const placeFieldsKey = 'placeFields';

const lineFieldsKey = 'lineFields';

const intEstimatedCallFieldsKey = 'intEstimatedCallFields';

const situationFieldsKey = 'situationFields';
const situationFieldsVal = `situations { ...${situationFieldsKey} }`;


export const placeFields = `
    fromPlace { ...${placeFieldsKey} }
    toPlace { ...${placeFieldsKey} }`;

export const placeFragment = `
        fragment ${placeFieldsKey} on Place {
          name
          latitude
          longitude
          quay {
            id
            name
            description
            publicCode
            ${situationFieldsVal}
          }
        }`;
export const lineFields = `line { ...${lineFieldsKey} }`;
export const lineFragment = `
    fragment ${lineFieldsKey} on Line {
      id
      publicCode
      name
      transportMode
      description
      presentation { colour textColour }
      authority { id name }
      notices { text }
      ${situationFieldsVal}
    }`;

export const intermediateEstimatedCallFields = `intermediateEstimatedCalls { ...${intEstimatedCallFieldsKey} }`;
export const intermediateEstimatedCallFragment = `
    fragment ${intEstimatedCallFieldsKey} on EstimatedCall {
      quay { id name stopPlace { id } }
      forAlighting
      forBoarding
      expectedArrivalTime
      expectedDepartureTime
      aimedArrivalTime
      aimedDepartureTime
      date
    }`;

export const situationFields = situationFieldsVal;
export const situationFragment = `
    fragment ${situationFieldsKey} on PtSituationElement {
      id
      summary { value }
      description { value }
      detail { value }
      validityPeriod { startTime endTime }
    }`;
