module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: '11',
          ios: '10',
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        throwIfNamespace: false,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'babel-plugin-styled-components',
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
  ignore:
    process.env.NODE_ENV !== 'test'
      ? [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.test.js',
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/*.spec.js',
        ]
      : undefined,
  env: {
    test: {
      plugins: [
        [
          'babel-plugin-styled-components',
          { ssr: false, displayName: false, namespace: 'sc-' },
        ],
      ],
    },
  },
}
