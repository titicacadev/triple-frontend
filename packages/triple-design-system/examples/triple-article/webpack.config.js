const path = require('path')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '../../src'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/env',
                {
                  targets: {
                    node: '10',
                  },
                },
              ],
              '@babel/react',
            ],
            plugins: [
              [
                'styled-components',
                { ssr: true, displayName: true, preprocess: false },
              ],
              ['@babel/plugin-proposal-class-properties'],
              [
                'module-resolver',
                { alias: { '@titicaca/triple-design-system': '../..' } },
              ],
            ],
          },
        },
      },
    ],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://triple-dev.titicaca-corp.com',
        changeOrigin: true,
      },
    },
  },
}
