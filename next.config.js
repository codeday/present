module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fixes npm packages that depend on `fs` module
      // eslint-disable-next-line no-param-reassign
      config.node = {
        fs: 'empty',
        dotenv: 'empty',
      };
    }

    return config;
  },
  compiler: {
    styledComponents: true
  },
  port: 8001,
};
