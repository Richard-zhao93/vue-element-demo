import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from '@/store'
import './vendor/element'
import axios from 'axios'

import '@/styles/index.scss' // global css
import '@/icons' // 引入 icons

// Mock 使用
import { mockXHR } from './mock'
if (process.env.NODE_ENV === 'development') {
  mockXHR()
}

// axios
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
