import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import router from '@/router/routes.js'
import store from '@/store'
import vuetify from '@/plugins/vuetify'

Vue.use(Router)

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

