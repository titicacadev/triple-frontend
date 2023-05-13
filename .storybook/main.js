const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../packages/**/!(/lib)/*.stories.@(mdx,js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-links',
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
    reactDocgenTypescriptOptions: {
      tsconfigPath: 'tsconfig.test.json',
    },
  },
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        lazyCompilation: true,
      },
    },
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.test.json',
      }),
    ]

    config.resolve.fallback = {
      assert: require.resolve('browser-assert'),
      crypto: false,
      fs: false,
      path: false,
      util: false,
    }

    return config
  },
  docs: {
    autodocs: true,
  },
}

export default config
