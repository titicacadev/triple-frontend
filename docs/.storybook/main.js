module.exports = {
  stories: ['../stories/**/*.stories.(js|mdx|tsx)'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
    'storybook-addon-jsx/register',
  ],
  presets: ['@storybook/addon-docs/preset'],
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
        require.resolve('react-docgen-typescript-loader'),
      ],
      resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
      },
    })

    return config
  },
}
