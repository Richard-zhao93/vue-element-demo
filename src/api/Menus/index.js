import http from '../../utils/http'
import base from '../../utils/base'

const menus = {
  getMenuList() {
    return http.get(`${base.test}/menus`)
  }
}

export default menus
