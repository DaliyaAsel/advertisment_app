import Router from 'vue-router'
import Vue from 'vue'
import AuthGuard from './auth_guard'
import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import AdList from '@/components/Ads/AdList'
import NewAd from '@/components/Ads/NewAd'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ad/:id',
      props: true,
      name: 'ad',
      component: Ad,
    },
    {
      path: '/list',
      name: 'list',
      component: AdList,
      beforeEnter: AuthGuard,
      // meta: {
      //   requireAuth : true,
      // },
    },
    {
      path: '/new',
      name: 'newAd',
      component: NewAd,
      beforeEnter: AuthGuard,
      // meta: {
      //   requireAuth : true,
      // },
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'reg',
      component: Registration
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeEnter: AuthGuard,
      // meta: {
      //   requireAuth : true,
      // },
    }
  ],
  mode: 'history'
})

// router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser
//   const requireAuth  = to.matched.some(record => record.meta.requireAuth)

//   console.log(currentUser);
//   console.log(requireAuth);
//   next('/login?loginError=true')
//   // if (requireAuth && !currentUser) {
//   //   next('/login?loginError=true')
//   // } else {
//   //   next()
//   // }
// })




// export default router;

// // export default function (to, from, next) {
// //   if (store.getters.user) {
// //     next()
// //   } else {
// //     next('/login?loginError=true')
// //   }
// // }
