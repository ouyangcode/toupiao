import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('@/views/home.vue') },
  { path: '/paihang', component: () => import('@/views/paihang.vue') },
  { path: '/shuoming', component: () => import('@/views/shuoming.vue') },
  { path: '/pepinfo/:id', name: 'pepinfo', component: () => import('@/views/pepinfo.vue') }
]


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
