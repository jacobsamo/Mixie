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

    "drizzle/enforce-delete-with-where": "warn",
    "drizzle/enforce-update-with-where": "warn",
  },
  plugins: ["@tanstack/query", "drizzle"],
};
