import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'

import pinia from "./helper/pinia/pinia"
import router from "./helper/router/router.ts";

createApp(App).use(pinia).use(router).mount('#app')
