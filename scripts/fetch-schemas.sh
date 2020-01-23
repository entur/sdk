#!/bin/bash

curl 'https://api.entur.io/journey-planner/v2/graphql' --compressed \
    -H 'Content-Type: application/json' \
    -H 'Pragma: no-cache' \
    -H 'Cache-Control: no-cache' \
    --data '{"query":" query IntrospectionQuery { __schema { queryType { name } mutationType { name } subscriptionType { name } types { ...FullType } directives { name description locations args { ...InputValue } } } }\n fragment FullType on __Type { kind name description fields(includeDeprecated: true) { name description args { ...InputValue } type { ...TypeRef } isDeprecated deprecationReason } inputFields { ...InputValue } interfaces { ...TypeRef } enumValues(includeDeprecated: true) { name description isDeprecated deprecationReason } possibleTypes { ...TypeRef } }\n fragment InputValue on __InputValue { name description type { ...TypeRef } defaultValue }\n fragment TypeRef on __Type { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } } }\n ","operationName":"IntrospectionQuery"}' \
    > schemas/journeyplanner2.json

curl 'https://api.entur.io/stop-places/v1/graphql' --compressed \
    -H 'Content-Type: application/json' \
    -H 'Pragma: no-cache' \
    -H 'Cache-Control: no-cache' \
    --data '{"query":" query IntrospectionQuery { __schema { queryType { name } mutationType { name } subscriptionType { name } types { ...FullType } directives { name description locations args { ...InputValue } } } }\n fragment FullType on __Type { kind name description fields(includeDeprecated: true) { name description args { ...InputValue } type { ...TypeRef } isDeprecated deprecationReason } inputFields { ...InputValue } interfaces { ...TypeRef } enumValues(includeDeprecated: true) { name description isDeprecated deprecationReason } possibleTypes { ...TypeRef } }\n fragment InputValue on __InputValue { name description type { ...TypeRef } defaultValue }\n fragment TypeRef on __Type { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } } }\n ","operationName":"IntrospectionQuery"}' \
    > schemas/nsr.json
