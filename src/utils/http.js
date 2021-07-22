import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// 封装提示
const Tip = msg => {
  Message({
    showClose: true,
    message: msg,
    type: "warning"
  })
}

// 创建axios

var serve = axios.create({ timeout: 1000 * 12 })

// 设置请求头
serve.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"

// 请求拦截器
serve.interceptors.request.use(
  config => {
    // 根据本地是否存储 token 判断用户登录情况
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => Promise.reject(error)
)

// 封装不同响应码对应的不同提示信息
const errorHandler = status => {
  switch (status) {
    // 未登录状态，返回登录页
    case 401:
      // ...
      break;
    // token 过期
    // 清除 token，返回登录页
    case 403:
      Tip("登陆过期，请重新登录")
      localStorage.removeItem("token")
      store.commit("loginSuccess", null)
      setTimeout(() => { }, 1000);
      break;
    // 请求不存在
    case 404:
      Tip("请求的资源不存子啊")
  }
}

// 响应拦截器
serve.interceptors.response.use(
  // 请求成功
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),

  // 请求失败
  error => {
    const { response } = error
    if (response) {
      errorHandler(response.status, response.data.message)
      return Promise.reject(response)
    }
  }
)

export default serve