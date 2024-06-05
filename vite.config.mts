import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react-swc'
import { nodeExternals } from 'rollup-plugin-node-externals'

export default defineConfig({
  build: {
    target: 'es6',
    outDir: 'lib',
    lib: {
      entry: ['src/index.ts'],
      fileName: (format, entryName) =>
        format === 'es' ? `${entryName}.mjs` : `${entryName}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      plugins: [nodeExternals()],
      output: {
        interop: 'auto',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    minify: false,
  },
  plugins: [
    dts({ tsconfigPath: './tsconfig.build.json' }),
    react({ plugins: [['@swc/plugin-styled-components', {}]] }),
  ],
})
