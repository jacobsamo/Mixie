module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `@mixie/eslint-config-custom`
  extends: ["custom", "prettier"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
