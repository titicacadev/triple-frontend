module.exports = {
  stories: ['../stories/**/*.stories.@(js|mdx|tsx)'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-controls',
    '@storybook/addon-links/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-docs',
    'storybook-addon-next-router',
  ],
  typescript: {
    check: true,
  },
  webpackFinal: async (config, { configType }) => {
    config.mode = 'development'
    config.module.rules.push({
      test: /\.(js|ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
            plugins: [
              ['styled-components', { ssr: true, displayName: true }],
              ['@babel/plugin-proposal-class-properties'],
            ],
          },
        },
      ],
      resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
      },
    })

    config.watchOptions = {
      ignored: /node_modules\/.+tsx?$/,
      aggregateTimeout: 1000,
    }

    return config
  },
}
