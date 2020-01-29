export interface Authority {
    codeSpace: string; // Added by mapper
    id: string;
    name: string;
    url?: string;
}

export const fragmentName = 'authorityFields'

const fragment = `
fragment ${fragmentName} on Authority {
    id
    name
    url
}
`

export const fragments = [
    fragment,
]
