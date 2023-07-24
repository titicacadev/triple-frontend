const fs = require('fs')

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const stories = fs
  .readdirSync('packages')
  .map((pkg) => `../packages/${pkg}/src/**/*.stories.@(mdx,js|jsx|ts|tsx)`)

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories,
  addons: [
    '@storybook/addon-essentials',
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
      builder: {},
      fastRefresh: true,
      strictMode: true,
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
      stream: false,
      util: false,
      zlib: false,
    }

    return config
  },
  docs: {
    autodocs: true,
  },
  staticDirs: ['./public'],
  features: {
    buildStoriesJson: true,
  },
}

export default config
