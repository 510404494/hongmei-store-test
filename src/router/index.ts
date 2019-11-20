import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/login.vue'

Vue.use(Router)

export const constantRoutes: RouteConfig[] = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: { hidden: true }
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: { hidden: true }
  }
]
export const asyncRoutes: RouteConfig[] = []

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}
router.beforeEach(function (to, from, next) {
  let userName = sessionStorage.getItem('user')
  if (to.path === '/login') {
    if (userName) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!userName) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

export default router
