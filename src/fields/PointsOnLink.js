// @flow

export type PointsOnLink = {|
    points: string,
    length: number,
|}

export const fragmentName = 'pointsOnLinkFields'

const fragment = `
fragment ${fragmentName} on PointsOnLink {
    points
    length
}
`

export const fragments = [
    fragment,
]
