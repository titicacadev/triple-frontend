module.exports = {
  maintainers: [],
  description: 'Codemods for triple-frontend',
  targets: [],
  transforms: {},
  presets: {
    'image-source': require('./image-source/transform'),
  },
}
