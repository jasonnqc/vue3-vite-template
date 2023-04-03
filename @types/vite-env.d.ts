/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
/// <reference types="vite-plugin-svg-icons/client" />
/// <reference types="@intlify/unplugin-vue-i18n/messages" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
