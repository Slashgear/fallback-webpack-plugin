const FallbackWebpackPlugin = require("./src");

module.exports = {
  entry: __dirname + "/test/src/index.js",
  output: {
    path: __dirname + "/test/dist",
    filename: `index.${process.env.TYPE}.js`
  },
  plugins: [new FallbackWebpackPlugin("config", process.env.TYPE, "A")]
};
