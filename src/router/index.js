import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import Product from '@/views/product'
import Pay from '@/views/pay'
import Order from '@/views/order'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User },
      ],
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/product/:id', component: Product },
    { path: '/pay', component: Pay },
    { path: '/order', component: Order },
  ],
})

const authPages = ['/pay', 'order']

router.beforeEach((to, from, next) => {
  if (!authPages.includes(to.path)) {
    next()
    return
  }

  const token = store.getters.token
  if (token) next()
  else next('/login')
})

export default router
