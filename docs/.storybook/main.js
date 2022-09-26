module.exports = {
  stories: ['../stories/**/*.stories.@(js|mdx|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    'storybook-addon-next-router',
  ],
  typescript: {
    check: true,
  },
  core: {
    builder: 'webpack5',
  },
  features: {
    postcss: false,
    babelModeV7: true,
    storyStoreV7: true,
  },
  framework: '@storybook/react',
}
