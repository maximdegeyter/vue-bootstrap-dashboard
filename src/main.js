import { createApp } from "vue";
import "./assets/scss/styles.scss";
import App from "./App.vue";
import router from './router';

createApp(App).use(router).mount("#app");

import "bootstrap/dist/js/bootstrap.js";
