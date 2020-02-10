export interface Notice {
    text: string
}

export const fragmentName = 'noticeFields'

const fragment = `
fragment ${fragmentName} on Notice {
    text
}
`

export const fragments = [fragment]
