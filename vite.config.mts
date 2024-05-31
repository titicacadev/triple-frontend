import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react-swc'
import { nodeExternals } from 'rollup-plugin-node-externals'

export default defineConfig({
  build: {
    target: 'es6',
    outDir: 'lib',
    lib: {
      entry: 'src/index.ts',
    },
    rollupOptions: {
      plugins: [nodeExternals()],
      output: [
        {
          format: 'cjs',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
        },
        {
          format: 'es',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs',
        },
      ],
    },
    minify: false,
  },
  plugins: [
    dts({ tsconfigPath: './tsconfig.build.json' }),
    react({ plugins: [['@swc/plugin-styled-components', {}]] }),
  ],
})
