import { ArgumentConfig } from '../config'

import { default as createAutocomplete } from './autocomplete'
import { default as createReverse } from './reverse'

export interface GeocoderClient {
    autocomplete: ReturnType<typeof createAutocomplete>
    reverse: ReturnType<typeof createReverse>
}

export default function createClient(config: ArgumentConfig): GeocoderClient {
    return {
        autocomplete: createAutocomplete(config),
        reverse: createReverse(config),
    }
}
