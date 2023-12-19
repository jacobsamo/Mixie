module.exports = {
  root: true,
  extends: [
    "custom",
    "prettier",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/no-rest-destructuring": "warn",
    "@tanstack/query/stable-query-client": "error",
    "drizzle/enforce-delete-with-where": "warn",
    "drizzle/enforce-update-with-where": "warn",
  },
  plugins: ["@tanstack/query", "drizzle"],
};
