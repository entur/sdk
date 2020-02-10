export interface Interchange {
    guaranteed: boolean
    staySeated: boolean
}

export const fragmentName = 'interchangeFields'

const fragment = `
fragment ${fragmentName} on Interchange {
    guaranteed
    staySeated
}
`

export const fragments = [fragment]
