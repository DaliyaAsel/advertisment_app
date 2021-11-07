import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import router from '@/router/routes.js'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import firebase from "firebase/compat/app"
import  "firebase/compat/auth"
// import "firebase/compat/firestore"



Vue.use(Router)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  // инициализируем доступ к firebase
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyDUEvucCgQLFpPFCr22-_GH7nlcwKlhRRA",
      authDomain: "itc-ads-3a176.firebaseapp.com",
      projectId: "itc-ads-3a176",
      storageBucket: "itc-ads-3a176.appspot.com",
      messagingSenderId: "159111933079",
      appId: "1:159111933079:web:e405dd9603a5b87e1e4dd2"
    })
    
//  сохранение сессии
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  },
  
}).$mount('#app')
