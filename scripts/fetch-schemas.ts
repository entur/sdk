import fs from 'fs'
import fetch from 'node-fetch'

import { getIntrospectionQuery } from 'graphql'

const { writeFile } = fs.promises

function runIntrospectionQuery(url: string): Promise<unknown> {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ET-Client-Name': 'entur-sdk',
        },
        body: JSON.stringify({
            query: getIntrospectionQuery(),
            operationName: 'IntrospectionQuery',
        }),
    }).then((res) => res.json())
}

runIntrospectionQuery(
    'https://api.entur.io/journey-planner/v2/graphql',
).then((schema) =>
    writeFile(
        'schemas/journeyplanner2.json',
        JSON.stringify(schema, undefined, 2),
    ),
)

runIntrospectionQuery(
    'https://api.entur.io/stop-places/v1/graphql',
).then((schema) =>
    writeFile('schemas/nsr.json', JSON.stringify(schema, undefined, 2)),
)
