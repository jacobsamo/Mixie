const path = require("path");

module.exports = {
  output: {
    filename: "my-first-webpack.bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".css"],
  },
  module: {
    rules: [
      { test: /\.txt$/, use: "raw-loader" },
      { test: /\(.ts|tsx)$/i, use: "ts-loader" },
      {
        test: /\.scss$/i,
        use: [
          "style-loader", // 3. Inject styles into DOM
          "css-loader", // 2. Turns css into commonjs
          "sass-loader", // 1. Turns sass into css
        ],
      },
    ],
  },
};
