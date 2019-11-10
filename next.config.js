// next.config.js
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');

if (typeof require !== 'undefined') {
  require.extensions['.css'] = () => {};
}

const nextConfig = {
  withImage: withImages(),
  withCss: withCSS(),
  // distDir: 'build',
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [ // eslint-disable-line
        (context, request, callback) => { // eslint-disable-line
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }
    return config;
  },
};

module.exports = withPlugins(
  [
    [withCSS],
    [
      {
        cssModules: true,
        cssLoaderOptions: {
          localIdentName: '[path]___[local]___[hash:base64:5]',
        },
        options: {
          emitWarning: false,
        },
      },
    ],
  ],
  nextConfig,
);
