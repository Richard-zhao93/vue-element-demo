import http from '../../utils/http'
import base from '../../utils/base'

const baseUrl = base.mock // TODO: 根据环境选择

const menus = {
  getMenuList() {
    return http.get(`${baseUrl}/menus`)
  }
}

export default menus
