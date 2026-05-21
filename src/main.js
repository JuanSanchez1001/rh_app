import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './css/style.css'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
