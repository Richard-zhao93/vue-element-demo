import Api from '@/api'
import { getToken, setToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'

const state = {
  token: getToken('token'),
  name: '',
  rights: []
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
        setToken('token', data.token)
        setToken('rights', JSON.stringify(data.rights))
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
