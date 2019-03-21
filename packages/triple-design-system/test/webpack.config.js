/* global require module __dirname */

const path = require('path')

module.exports = {
  entry: {
    text: [path.resolve(__dirname, '../src'), './src/elements/text'],
    button: [path.resolve(__dirname, '../src'), './src/elements/button'],
    author: [path.resolve(__dirname, '../src'), './src/models/author'],
    responsive: [
      path.resolve(__dirname, '../src'),
      './src/elements/responsive',
    ],
    carousel: [path.resolve(__dirname, '../src'), './src/elements/carousel'],
    container: [path.resolve(__dirname, '../src'), './src/elements/container'],
    image: [path.resolve(__dirname, '../src'), './src/elements/image'],
    label: [path.resolve(__dirname, '../src'), './src/elements/label'],
    navbar: [path.resolve(__dirname, '../src'), './src/elements/navbar'],
    'action-sheet': [
      path.resolve(__dirname, '../src'),
      './src/elements/action-sheet',
    ],
    modal: [path.resolve(__dirname, '../src'), './src/elements/modal'],
    'scrap-button': [
      path.resolve(__dirname, '../src'),
      './src/elements/scrap-button',
    ],
    pricing: [path.resolve(__dirname, '../src'), './src/elements/pricing'],
    'day-picker': [
      path.resolve(__dirname, '../src'),
      './src/elements/day-picker',
    ],
    'range-picker': [
      path.resolve(__dirname, '../src'),
      './src/elements/range-picker',
    ],
    'document-link-button': [
      path.resolve(__dirname, '../src'),
      './src/elements/document-link-button',
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
