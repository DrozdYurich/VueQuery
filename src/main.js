import "./assets/main.css";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
async function prepare() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }
}

prepare().then(() => {
  app.mount("#app");
});
