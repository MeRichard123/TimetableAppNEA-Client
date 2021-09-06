module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/extensions': ['error', 'never', { svg: 'always', jpg: 'always' }],
    'import/no-unresolved': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
  },
};
