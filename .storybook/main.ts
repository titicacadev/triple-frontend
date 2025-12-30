import fs from 'fs'

import type { Options } from '@swc/core'
import type { StorybookConfig } from '@storybook/nextjs'

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const EXCEPT_PACKAGES = ['middlewares']

const stories = fs
  .readdirSync('packages')
  .filter((pkg) => !EXCEPT_PACKAGES.includes(pkg))
  .map((pkg) => `../packages/${pkg}/src/**/*.stories.@(js|jsx|ts|tsx)`)

interface StorybookConfigWithSwc extends StorybookConfig {
  swc?: (config: Options) => Options
}

const config: StorybookConfigWithSwc = {
  stories,
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
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
      strictMode: true,
    },
  },
  swc: (config: Options): Options => {
    return {
      ...config,
      jsc: {
        ...config.jsc,
        transform: {
          ...config.jsc?.transform,
          react: {
            ...config.jsc?.transform?.react,
            throwIfNamespace: false,
          },
        },
        experimental: {
          plugins: [['@swc/plugin-styled-components', {}]],
        },
      },
    }
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = [
        new TsconfigPathsPlugin({
          configFile: 'tsconfig.test.json',
        }),
      ]
      config.resolve.fallback = { fs: false }
    }

    return config
  },
  docs: {},
  staticDirs: ['./public'],
}

export default config
