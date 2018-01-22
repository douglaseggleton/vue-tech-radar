// https://eslint.org/docs/user-guide/configuring

module.exports = {
    env: {
        browser: true
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/essential'
    ],
    rules: {
        indent: [
            'error',
            2
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'never'
        ]
    }
}