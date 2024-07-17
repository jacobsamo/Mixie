/** @type {import("prettier").Config} */
module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  printWidth: 80,
  tailwindConfig: "./packages/tailwind-config/tailwind.config.ts",
  plugins: ["prettier-plugin-tailwindcss"],
};
