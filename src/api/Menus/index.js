import http from '../../utils/http'
import base from '../../utils/base'

const menus = {
  getMenuList() {
    return http.get(`${base.localhost}/menus`)
  }
}

export default menus
