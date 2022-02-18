import { resolve } from 'path';
import { defineConfig } from 'vite';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import { presetUno } from 'unocss';
import VueI18n from '@intlify/vite-plugin-vue-i18n';

export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({ sassVariables: 'src/assets/style/quasar-variables.sass' }),
    Pages({
      nuxtStyle: true,
      dirs: [
        { dir: 'src/pages', baseRoute: '' },
        { dir: 'src/pages/blank', baseRoute: '' },
      ],
    }),
    Layouts(),
    Unocss({
      presets: [presetUno()],
    }),
    VueI18n({
      include: resolve(__dirname, './src/locales/**'),
    }),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src'),
      '@antv/x6': '@antv/x6/lib',
      '@antv/x6-vue-shape': '@antv/x6-vue-shape/lib',
    },
  },
  server: {
    https: false,
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:8600',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // reportCompressedSize: true,
    chunkSizeWarningLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/')) {
            //设置需要独立打包的npm包
            const modules = ['quasar', '@quasar', 'vue', '@vue'];
            const chunk = modules.find(module => id.includes(`/node_modules/${module}`));
            return chunk ? `vendor-${chunk}` : 'vendor';
          }
        },
      },
    },
  },
});
