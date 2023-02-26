module.exports = {
  extends: ['standard-with-typescript', 'standard-jsx'],
  parserOptions: {
    project: './tsconfig.json'
  },

  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
