/* global require module __dirname */

const path = require('path')

module.exports = {
  entry: {
    text: [path.resolve(__dirname, '../src'), './src/elements/text'],
    author: [path.resolve(__dirname, '../src'), './src/models/author'],
    responsive: [
      path.resolve(__dirname, '../src'),
      './src/elements/responsive',
    ],
    carousel: [path.resolve(__dirname, '../src'), './src/elements/carousel'],
    container: [path.resolve(__dirname, '../src'), './src/elements/container'],
    navbar: [path.resolve(__dirname, '../src'), './src/elements/navbar'],
    'action-sheet': [
      path.resolve(__dirname, '../src'),
      './src/elements/action-sheet',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '../src'),
        ],
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
      },
    ],
  },
}
