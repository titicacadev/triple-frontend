const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: ['../packages/**/!(/lib)/*.stories.@(mdx,js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next-router',
    {
      name: 'storybook-addon-swc',
      options: {
        swcLoaderOptions: {
          module: {
            type: 'es6',
          },
          jsc: {
            experimental: {
              plugins: [['@swc/plugin-styled-components', {}]],
            },
          },
        },
      },
    },
  ],
  typescript: {
    check: true,
  },
  framework: '@storybook/react',
  core: {
    builder: {
      name: 'webpack5',
      options: {
        lazyCompilation: true,
        fsCache: true,
      },
    },
  },
  features: {
    postcss: false,
    storyStoreV7: true,
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()]
    return config
  },
}
