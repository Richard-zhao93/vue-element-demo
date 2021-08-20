import http from '../../utils/http'
import base from '../../utils/base'

const users = {
  /**
   * 登录
   * @param {*} params
   * @returns
   */
  getLogin(params) {
    return http.get(`${base.localhost}/user/login`, {
      params: params
    })
  },

  /**
   * 获取用户列表
   * @param {*} params
   * @returns
   */
  getUserList(params) {
    return http.get(`${base.localhost}/user/list`, {
      params: params
    })
  },

  /**
   * 修改用户状态
   * @param {*} id 用户 ID
   * @param {*} state 用户修改后的状态
   * @returns
   */
  changeUserState(id, state) {
    return http.put(`${base.test}/users/${id}/state/${state}`)
  }
}

export default users
