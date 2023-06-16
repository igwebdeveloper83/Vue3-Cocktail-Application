import "./assets/styles/main.sass";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n, useI18n } from "vue-i18n";
import { languages, defaultLocale } from "./i18n";

import App from "./App.vue";
import router from "./router";

const app = createApp(App, {
  setup() {
    const { t } = useI18n();
    return { t };
  },
});

const localStorageLang = localStorage.getItem("lang");

const messages = Object.assign(languages);
const i18n = createI18n({
  legacy: false,
  locale: localStorageLang || defaultLocale,
  fallbackLocale: "en",
  messages,
});

const pinia = createPinia();
app.use(pinia);

app.use(router);
app.use(ElementPlus);
app.use(i18n);

app.mount("#app");
