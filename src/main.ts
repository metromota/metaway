import App from './App.vue'
import axios from './core/api/axios-service'
import Toast from "vue-toastification";
import VueTheMask from 'vue-the-mask'
import { createApp } from 'vue'
import { router } from './rounting'
import { store } from "./store"
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import "vue-toastification/dist/index.css";
import './style.css'

let app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(router)
app.use(store)
app.use(BootstrapIconsPlugin);
app.use(VueTheMask)
app.use(Toast, {
    closeButton: false,
    closeOnClick: true
});
app.mount('#app')
