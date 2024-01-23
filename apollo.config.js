// eslint-disable-next-line no-undef
module.exports = {
    client: {
        service: {
            name: 'my-app',
            // URL to the GraphQL API
            localSchemaFile: "./graphql.schema.json"
        },
        // Files processed by the extension
        includes: [
            'src/**/*.vue',
            'src/**/*.js',
            'src/graphql/*.graphql',
        ],
    },
}