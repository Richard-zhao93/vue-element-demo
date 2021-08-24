import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Tip from '@/utils/tips'
import getPageTitle from '@/utils/getPageTitle'

Vue.use(VueRouter)

// 第一次登陆时报错：
//  Redirected when going from "/" to "/login" via a navigation guard.
// 方法一：将 vue-router 版本降到 3.0.7
// 方法二：
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

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

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 不要求权限，所有角色都能访问的页面
 * TODO:
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index')
  }
]

/**
 * asyncRoutes
 * 基于用户权限异步加载的路由
 * TODO:
 */
export const asyncRoutes = [
  {
    path: '/',
    meta: { title: '首页' },
    redirect: '/welcome'
  },
  {
    path: '',
    component: () => import('@/views/home/index'),
    children: [
      {
        path: '/welcome',
        meta: { title: '欢迎页', roles: ['admin', 'editor'] },
        component: () => import('@/views/welcome/index')
      },
      {
        path: '/user',
        meta: { title: '用户列表', roles: ['admin'] },
        component: () => import('@/views/users/index')
      }
    ]
  },
  {
    path: '/error',
    // redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: { title: 'Error Pages', icon: '404' },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401' }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/error/404', hidden: true }
]

/**
 * 创建路由对象
 * @returns 返回一个路由对象
 */
const createRouter = () =>
  new VueRouter({
    // mode: 'hash', // require service support
    // scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 路由守卫
router.beforeEach(async(to, from, next) => {
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 从 sessionStorage 中获取 token
  const token = getToken('token')

  if (token) {
    // 登录后，阻止跳转到 login 页面
    if (to.path === '/login') return next('/')
    else {
      // TODO:
      // 获取用户权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
        return next()
      } else {
        try {
          // 获取用户权限，如 ['developer','editor']
          const { roles } = await store.dispatch('user/getInfo', token)
          // 权限判断，获取有权限的路由集合
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )

          // 动态添加路由
          accessRoutes.forEach(route => {
            router.addRoute(route)
          })

          return next({ ...to, replace: true })
        } catch (err) {
          console.log(err)
          await store.dispatch('user/resetToken')

          Tip('error', 'Something Error')
          return next('/login')
        }
      }
    }
  } else {
    // 如果用户访问的是 /login，直接放行
    if (to.path === '/login') return next()

    // 如果 token 不存在，强制返回登录页
    Tip('error', '请先登录')
    return next('/login')
  }
})

export default router
