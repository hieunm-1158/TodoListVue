import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/styles/style.scss";
// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
