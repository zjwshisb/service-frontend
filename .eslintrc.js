module.exports = {
  extends: [require.resolve('@umijs/max/eslint'), 'plugin:react-hooks/recommended'],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
  },
};
