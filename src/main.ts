import { createApp } from 'vue';
import { createHead } from '@vueuse/head';

import 'virtual:svg-icons-register';

import App from './App.vue';
import i18n from './i18n';
import pinia from './pinia';
import router from './router';

import './assets/scss/main.scss';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(pinia);
app.use(createHead());

app.mount('#app');
