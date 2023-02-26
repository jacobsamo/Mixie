module.exports = {
  root: true,
  extends: ['custom', 'next/core-web-vitals'],
  rules: {
    // Disable rules that aren't relevant to your codebase
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    '@next/next/no-page-custom-font': 'off',
    '@next/next/no-img-element': 'error',

    // Add any additional rules you need
    // 'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-anonymous-default-export': 'off',
    'turbo/no-undeclared-env-vars': 'warn',

    // Use autofix where possible

  },
};
