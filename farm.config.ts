import { defineConfig } from '@farmfe/core';
import farmJsPluginLess from '@farmfe/js-plugin-less'
import * as path from 'node:path'

export default defineConfig({
  plugins: ['@farmfe/plugin-react', farmJsPluginLess()],
  compilation: {
    resolve: {
      alias: {
        '@': path.join(process.cwd(), 'src')
      }
    }
  }
});
