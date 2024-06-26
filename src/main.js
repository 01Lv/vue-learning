import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import './plugins/element.js'
import axios from 'axios'
import store from './components/store/index.js'

axios.defaults.baseURL = 'http://127.0.0.1:8090/base'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  ElementUI,
  store
}).$mount('#app')
