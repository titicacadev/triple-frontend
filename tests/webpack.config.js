/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const glob = require('glob')

module.exports = {
  entry: glob
    .sync('./src/*')
    .reduce(
      (index, path) =>
        Object.assign(index, { [path.match(/[^/]+$/)[0]]: path }, {}),
      {},
    ),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react', '@babel/typescript'],
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
