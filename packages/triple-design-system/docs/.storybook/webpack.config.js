const path = require('path')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
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
              [
                'module-resolver',
                {
                  alias: {
                    '@titicaca/triple-design-system': path.resolve(
                      __dirname,
                      '../../src',
                    ),
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
}
