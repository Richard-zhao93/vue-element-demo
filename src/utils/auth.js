// 设置 token 到 cookie 的相关操作封装
// import Cookies from 'js-cookie'

// const TokenKey = 'Admin-Token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

// 封装 sessionStorage 操作
// const TokenKey = 'token'

export function getToken(tokenKey) {
  return window.sessionStorage.getItem(tokenKey)
}

export function setToken(tokenKey, token) {
  return window.sessionStorage.setItem(tokenKey, token)
}

export function removeToken(tokenKey) {
  return window.sessionStorage.removeItem(tokenKey)
}
