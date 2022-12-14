module.exports = {
  stories: ['../stories/**/*.stories.@(js|mdx|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    'storybook-addon-next-router',
    'storybook-addon-i18next',
  ],
  typescript: {
    check: true,
  },
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@titicaca/next-i18next': 'react-i18next',
    }

    return config
  },
  features: {
    postcss: false,
    babelModeV7: true,
    storyStoreV7: true,
  },
  framework: '@storybook/react',
}
