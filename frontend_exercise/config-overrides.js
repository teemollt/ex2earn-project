const webpack = require('webpack');

module.exports = function override(config, env) {
  // Fallback 설정
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "url": require.resolve("url"),
    "zlib": require.resolve("browserify-zlib"),
    "process": require.resolve("process/browser"),
    "vm": require.resolve("vm-browserify"),
  };
  
  // Plugin 설정
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  );

  // Module 규칙 추가
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false
    }
  });

  // source-map-loader 제거 및 @trezor/connect 관련 설정
  config.module.rules = config.module.rules.map(rule => {
    if (rule.use && Array.isArray(rule.use)) {
      rule.use = rule.use.filter(item => {
        if (typeof item === 'string') {
          return !item.includes('source-map-loader');
        } else if (typeof item === 'object' && item.loader) {
          if (item.loader.includes('source-map-loader')) {
            console.log("Bypassing source-map-loader");
            return false;
          }
        }
        return true;
      });
    }
    return rule;
  });

  return config;
};
