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

const toastOptions = {
    closeButton: false,
    closeOnClick: true
}

let app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(router)
app.use(store)
app.use(BootstrapIconsPlugin);
app.use(VueTheMask)
app.use(Toast, toastOptions);
app.mount('#app')

