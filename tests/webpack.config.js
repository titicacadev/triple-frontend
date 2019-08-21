module.exports = {
  entry: {
    text: './src/elements/text',
    button: './src/elements/button',
    author: './src/models/author',
    responsive: './src/elements/responsive',
    carousel: './src/elements/carousel',
    container: './src/elements/container',
    image: './src/elements/image',
    label: './src/elements/label',
    navbar: './src/elements/navbar',
    'action-sheet': './src/elements/action-sheet',
    modal: './src/elements/modal',
    'scrap-button': './src/elements/scrap-button',
    pricing: './src/elements/pricing',
    spinner: './src/elements/spinner',
    table: './src/elements/table',
    form: './src/elements/form',
    'numeric-spinner': './src/elements/numeric-spinner',
    'document-link-button': './src/elements/document-link-button',
  },
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
