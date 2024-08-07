import fs from 'fs'
import type { StorybookConfig } from '@storybook/nextjs'

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const stories = fs
  .readdirSync('packages')
  .map((pkg) => `../packages/${pkg}/src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))`)

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', ...stories],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    'storybook-react-i18next',
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
    '@chromatic-com/storybook',
  ],
  typescript: {
    reactDocgenTypescriptOptions: {
      tsconfigPath: 'tsconfig.test.json',
      propFilter: (prop) => {
        if (prop.name === 'css') {
          return false
        }

        if (prop.declarations !== undefined && prop.declarations.length > 0) {
          const hasPropAdditionalDescription = prop.declarations.find(
            (declaration) => {
              return !declaration.fileName.includes('node_modules')
            },
          )

          return Boolean(hasPropAdditionalDescription)
        }

        return true
      },
    },

    reactDocgen: 'react-docgen-typescript',
  },
  framework: {
    name: '@storybook/nextjs',
    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = [
        new TsconfigPathsPlugin({
          configFile: 'tsconfig.test.json',
        }),
      ]
    }

    return config
  },
  docs: {},
  staticDirs: ['./public'],
}

export default config
