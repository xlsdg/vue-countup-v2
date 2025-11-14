import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist',
      staticImport: true,
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueCountUp',
      fileName: (format) => `countup.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled into the library
      external: ['vue', 'countup.js'],
      output: {
        // Provide global variables for externalized dependencies in UMD build
        globals: {
          vue: 'Vue',
          'countup.js': 'CountUp',
        },
        // Preserve export names
        exports: 'named',
      },
    },
    // Generate source maps
    sourcemap: true,
    // Clean output directory before build
    emptyOutDir: true,
  },
})
