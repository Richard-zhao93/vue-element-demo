import { Message } from 'element-ui'

/**
 * 封装提示
 * @param {String} type 提示类型 success - 成功 error - 报错 warning - 警告
 * @param {String} msg 提示信息
 */
const Tip = (type, msg) => {
  Message({
    showClose: true,
    message: msg,
    type: type
  })
}

export default Tip
