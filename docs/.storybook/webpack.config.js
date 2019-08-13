const path = require('path')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: {
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
        resolve: {
          extensions: ['.js', '.ts', '.tsx'],
        },
      },
    ],
  },
}
