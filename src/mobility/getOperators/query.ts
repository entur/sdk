export default `
query {
    operators {
        id
        name {
             translation {
                 language
                 value
             }
        }
    }
}
`
