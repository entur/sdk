module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    env: {
        node: true,
    },
    plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/member-delimiter-style': 'off',
        'tsdoc/syntax': 'error',
    },
}
