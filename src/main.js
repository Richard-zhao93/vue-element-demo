import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from '@/store'
import './vendor/element'
import Api from '@/api'

import '@/styles/index.scss' // global css
import '@/icons' // 引入 icons

// Mock 使用
// import { mockXHR } from './mock'
if (process.env.NODE_ENV === 'development') {
  // mockXHR()
}

// 挂载全局请求 API
Vue.prototype.$http = Api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
