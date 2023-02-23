module.exports = {
  extends: ['standard-with-typescript', 'standard-jsx'],
  parserOptions: {
    project: './tsconfig.json'
  },

  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
