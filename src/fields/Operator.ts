export interface Operator {
    id: string
    name: string
    url?: string
}

export const fragmentName = 'operatorFields'

const fragment = `
fragment ${fragmentName} on Operator {
    id
    name
    url
}
`

export const fragments = [fragment]
