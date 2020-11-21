# Fallback webpack plugin

Plugin that simplifies module replacement with a fallback.

## Install

```
npm i --save-dev fallback-webpack-plugin
```

```
yarn add --dev fallback-webpack-plugin
```

## Usage

```js
const FallbackWebpackPlugin = require("fallback-webpack-plugin");

module.exports = {
  entry: "index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index.bundle.js"
  },
  plugins: [
    new FallbackWebpackPlugin(
      "branchDirectory",
      "currentVariant",
      "fallbackDir"
    )
  ]
};
```
