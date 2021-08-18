import Vue from 'vue'
import VueRouter from 'vue-router'
// import Layout from '@/views/layout/index'
import { getToken } from '@/utils/auth'

Vue.use(VueRouter)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index')
    // hidden: true
  },
  {
    path: '/home',
    meta: { title: '首页' },
    component: () => import('@/views/home/index'),
    // redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        meta: { title: '欢迎页' },
        component: () => import('@/views/welcome/index')
      },
      {
        path: '/users',
        meta: { title: '用户列表' },
        component: () => import('@/views/users/index')
      }
    ]
  }
  // {
  // path: '/',
  // component: Layout,
  // redirect: '/dashboard',
  // children: [
  //   {
  //     path: 'dashboard',
  //     component: () => import(''),
  //     name: 'Dashboard',
  //     meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
  //   }
  // ]
  // }
]

const createRouter = () => new VueRouter({
  // mode: 'hash', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// export function resetRouter () {
//   const newRouter = createRouter()
//   router.match = newRouter.matcher
// }

// 路由守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问的是 /login，直接放行
  if (to.path === '/login') return next()

  // 从 sessionStorage 中获取 token
  const token = getToken()
  // 如果 token 不存在，强制返回登录页
  if (!token) {
    Vue.prototype.$message({
      showClose: true,
      message: '请先登录',
      type: 'error'
    })
    return next('/login')
  }
  next()
})

export default router
