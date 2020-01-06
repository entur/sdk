// @flow

export type Operator = {|
    id: string,
    name: string,
    url?: string,
|}

export default {
    id: true,
    name: true,
    url: true,
}
