import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';

// https://vue-i18n.intlify.dev/guide/
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
