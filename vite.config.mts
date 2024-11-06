import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react-swc'
import { nodeExternals } from 'rollup-plugin-node-externals'
import preserveDirectives from 'rollup-plugin-preserve-directives'

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
    checker({ typescript: { tsconfigPath: './tsconfig.build.json' } }),
    dts({ tsconfigPath: './tsconfig.build.json' }),
    react({ plugins: [['@swc/plugin-styled-components', {}]] }),
    preserveDirectives(),
  ],
})
