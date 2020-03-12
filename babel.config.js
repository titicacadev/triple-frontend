module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          ie: '11',
          ios: '10',
        },
      },
    ],
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
}
