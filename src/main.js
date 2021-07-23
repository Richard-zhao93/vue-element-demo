import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './vendor/element'
// import 'element-ui/lib/theme-chalk/index.css'

// Mock 使用
import { mockXHR } from './mock'
if (process.env.NODE_ENV === 'development') {
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
