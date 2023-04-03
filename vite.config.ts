import dns from 'node:dns';
import path from 'node:path';

import { defineConfig } from 'vite';
import ImageMin from 'vite-plugin-imagemin';
import Importus from 'vite-plugin-importus';
import RemoveConsole from 'vite-plugin-remove-console';
import RewriteAll from 'vite-plugin-rewrite-all';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Layouts from 'vite-plugin-vue-layouts';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import { Schema, ValidateEnv } from '@julr/vite-plugin-validate-env';
import Vue from '@vitejs/plugin-vue';
import AutoPrefixer from 'autoprefixer';
import TailwindCss from 'tailwindcss';
import createAutoImportContext from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import createVueRouterContext from 'unplugin-vue-router/vite';

// https://vitejs.dev/config/server-options.html#server-host
dns.setDefaultResultOrder('verbatim');

// https://github.com/posva/unplugin-vue-router
const VueRouter: any = createVueRouterContext({
  dts: '@types/typed-router.d.ts',
});

// https://github.com/antfu/unplugin-auto-import
const AutoImport: any = createAutoImportContext({
  imports: ['vue', VueRouterAutoImports, 'vue-i18n', 'pinia'],
  dirs: ['src/apis', 'src/stores', 'src/composables', 'src/utils'],
  dts: '@types/auto-imports.d.ts',
  eslintrc: { enabled: true },
  vueTemplate: true,
});

export default defineConfig(async ({ command, mode }) => {
  // Workaround to ensure generating dts files on prebuild
  if (command === 'build' && mode === 'development') {
    await VueRouter.buildStart?.();
    await VueRouter.buildEnd?.();
    await AutoImport.buildStart?.();
  }
  return {
    plugins: [
      // https://github.com/posva/unplugin-vue-router
      VueRouter,
      // https://github.com/ivesia/vite-plugin-rewrite-all
      RewriteAll(),
      Vue(),
      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts/issues/71
      Layouts(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport,
      // https://github.com/antfu/unplugin-vue-components
      Components({
        dirs: ['src/components'],
        directoryAsNamespace: true,
        globalNamespaces: ['base'],
        dts: '@types/components.d.ts',
      }),
      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        include: [path.resolve(__dirname, 'src/locales/**')],
      }),
      // https://github.com/vbenjs/vite-plugin-imagemin
      {
        ...ImageMin({
          gifsicle: {
            optimizationLevel: 2,
            interlaced: false,
          },
          optipng: {
            optimizationLevel: 5,
          },
          mozjpeg: {
            quality: 85,
          },
          pngquant: {
            quality: [0.7, 0.9],
            speed: 4,
          },
          webp: {
            quality: 85,
          },
          svgo: {
            plugins: [
              {
                name: 'removeEmptyAttrs',
                active: false,
              },
            ],
          },
        }),
        // https://vitejs.dev/guide/using-plugins.html#conditional-application
        apply: 'build',
      },
      // https://github.com/vbenjs/vite-plugin-svg-icons
      createSvgIconsPlugin({
        iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
      }),
      // https://github.com/Geocld/vite-plugin-importus
      Importus([
        {
          libraryName: 'lodash',
          camel2DashComponentName: false,
          customName: (name: string) => `lodash/${name}`,
        },
      ]),
      // https://github.com/xiaoxian521/vite-plugin-remove-console
      RemoveConsole(),
      // https://github.com/Julien-R44/vite-plugin-validate-env
      ValidateEnv({
        QUEST_API_URL: Schema.string(),
      }),
    ],
    resolve: {
      // https://vitejs.dev/config/shared-options.html#resolve-alias
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@img': path.resolve(__dirname, './src/assets/images'),
      },
    },
    css: {
      postcss: {
        plugins: [TailwindCss(), AutoPrefixer],
      },
      preprocessorOptions: {
        scss: {
          // https://github.com/vitejs/vite/issues/832
          additionalData: '@import "./src/assets/scss/helpers";',
        },
      },
      devSourcemap: true,
    },
    envPrefix: 'QUEST_',
  };
});
