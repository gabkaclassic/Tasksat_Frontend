import { createApp } from 'vue'
import App from './App.vue'
import router from '@/js_part/web/routing/router'
import Api from '@/js_part/plugins/apis/api'
import store from '@/js_part/store/storages/storages'
import mutations from "@/js_part/store/mutations/mutations";
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

const app = createApp(App)
app.use(router)
app.use(VueChartkick);
app.use(Api)
app.use(store)
app.use(mutations)
app.mount('#app')
