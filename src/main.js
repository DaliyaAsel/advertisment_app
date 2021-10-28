import Vue from 'vue'
import App from './App'
import router from '@/router/routes'
import store from './store'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
