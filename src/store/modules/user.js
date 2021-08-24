import Api from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'

const state = {
  token: getToken('token'),
  name: '',
  rights: JSON.parse(getToken('rights') || '[]'),
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_RIGHTS: (state, rights) => {
    state.rights = rights
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      Api.Users.getLogin(userInfo).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', data.username)
        commit('SET_RIGHTS', data.rights)
        // commit('SET_ROLES', data.roles)

        // 将 token 和 rights 存入 sessionStorage 中
        setToken('token', data.token)
        setToken('rights', JSON.stringify(data.rights))
        // setToken('roles', data.roles)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit }, token) {
    return new Promise((resolve, reject) => {
      Api.Users.getUserInfo(token)
        .then(response => {
          const { roles } = response.data

          commit('SET_ROLES', roles)
          setToken('roles', roles)
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_RIGHTS', [])
      commit('SET_ROLES', [])
      removeToken('token')
      removeToken('rights')
      removeToken('roles')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
