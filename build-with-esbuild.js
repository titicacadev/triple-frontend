const glob = require('glob')
const { buildSync } = require('esbuild')

glob('src/**/*.{ts,tsx,js,jsx}', (e, dd) => {
  if (e) {
    process.exit(1)
  }

  buildSync({
    entryPoints: dd,
    outdir: 'lib',
    platform: 'node',
    sourcemap: true,
  })
})
