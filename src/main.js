import "./assets/styles/main.sass";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { languages, defaultLocale } from "./i18n";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const localStorageLang = localStorage.getItem("lang") || defaultLocale;

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorageLang,
  fallbackLocale: "en",
  messages: languages, 
});

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(i18n);

app.mount("#app");