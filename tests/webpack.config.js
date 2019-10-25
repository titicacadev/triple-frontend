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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
            plugins: [
              [
                'styled-components',
                { ssr: true, displayName: true, preprocess: false },
              ],
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
        resolve: {
          extensions: ['.js'],
        },
      },
    ],
  },
}
