import Vue from 'vue'
import Router from 'vue-router'

import Layout from './views/layout/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      name: 'home',
      redirect: '/Home',
      children: [{
        path: '/Home',
        component: () => import('./views/Home.vue')
      }]
    }
  ]
})
