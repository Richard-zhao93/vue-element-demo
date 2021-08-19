// 权限管理相关

// import router from './router'
// import store from './store'
// import { getToken } from '@/utils/auth' // get token from cookie
// import Tip from '@/utils/tips'
// import getPageTitle from '@/utils/getPageTitle'

// // 路由白名单
// const whiteList = ['/login', '/auth-redirect']

// 路由守卫

/*
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 从 sessionStorage 中获取 token
  const token = getToken()

  // 如果 token 不存在，强制返回登录页
  if (token) {
    // 已登录，则重定向至首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 获取用户权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')

          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加有权限的路由
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (e) {
          // 删除 Token 信息
          await store.dispatch('user/resetToken')
          // 提示错误信息
          Tip('error', e)
          // 重定向至登录页
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 白名单路由，直接放行
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 重定向至登录页面
      next(`/login?redirect=${to.path}`)
    }
  }
  next()
})
*/
