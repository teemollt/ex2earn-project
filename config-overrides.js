const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "zlib": require.resolve("browserify-zlib"),
    "process": require.resolve("process/browser"),
    "buffer": require.resolve("buffer"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
  ]);
  config.resolve.alias = {
    ...config.resolve.alias,
    "process": "process/browser.js"
  };
  return config;
};