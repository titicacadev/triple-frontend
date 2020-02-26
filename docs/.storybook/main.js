module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.mode = 'development'
    config.module.rules.push({
      test: /\.(js|ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
            plugins: [
              [
                'styled-components',
                { ssr: true, displayName: true, preprocess: false },
              ],
              ['@babel/plugin-proposal-class-properties'],
            ],
          },
        },
        require.resolve('react-docgen-typescript-loader'),
      ],
      resolve: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    })

    return config
  },
}
