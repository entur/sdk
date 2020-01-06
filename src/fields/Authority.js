// @flow

export type Authority = {|
    codeSpace: string, // Added by mapper
    id: string,
    name: string,
    url?: string,
|}

export default {
    id: true,
    name: true,
    url: true,
}
