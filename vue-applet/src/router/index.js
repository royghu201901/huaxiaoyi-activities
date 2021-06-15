import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Rule from '../views/Rule.vue'
import Order from '../views/Order.vue'
import Store from '../views/Store.vue'
import Pay from '../views/Pay.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/order',
    name: 'Order',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: Order
  },
  {
    path: '/rule',
    name: 'Rule',
    component: Rule
  },
  {
    path: '/store',
    name: 'Store',
    component: Store
  },
  {
    path: '/pay',
    name: 'Pay',
    component: Pay
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
