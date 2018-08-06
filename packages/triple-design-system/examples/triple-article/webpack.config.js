const path = require('path')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '../../src')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/env",
              "@babel/react"
            ],
            plugins: [
              ["styled-components", { "ssr": true, "displayName": true, "preprocess": false }],
              ["module-resolver", { "alias": { "@titicaca/triple-design-system": "../.." } }]
            ]
          }
        }
      }
    ]
  }
}
