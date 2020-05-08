export interface Interchange {
    guaranteed: boolean
    staySeated: boolean
    FromServiceJourney?: {
        id: string
    }
    ToServiceJourney?: {
        id: string
    }
}

export const fragmentName = 'interchangeFields'

const fragment = `
fragment ${fragmentName} on Interchange {
    guaranteed
    staySeated
    FromServiceJourney {
        id
    }
    ToServiceJourney {
        id
    }
}
`

export const fragments = [fragment]
