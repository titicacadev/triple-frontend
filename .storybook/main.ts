import fs from 'fs'
import type { StorybookConfig } from '@storybook/nextjs'

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const EXCEPT_PACKAGES = ['middlewares']

const stories = fs
  .readdirSync('packages')
  .filter((pkg) => !EXCEPT_PACKAGES.includes(pkg))
  .map((pkg) => `../packages/${pkg}/src/**/*.stories.@(mdx,js|jsx|ts|tsx)`)

const config: StorybookConfig = {
  stories,
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
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
        useSWC: true,
      },
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
      config.resolve.fallback = { fs: false }
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
