import http from '../../utils/http'
import base from '../../utils/base'

const users = {
  getLogin (params) {
    return http.get(`${base.a}xxx`, {
      params: params
    })
  }
}

export default users