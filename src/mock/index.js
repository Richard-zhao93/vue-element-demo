// // mock 的监听逻辑
// import Mock from 'mockjs'
// // import users from './user' // 导入模拟数据的 js 文件

// const mocks = [
//   ...users
// ]

// // 解析地址栏参数解析函数
// /*
// export function param2Obj(url) {
//   const search = url.split('?')[1]
//   if (!search) {
//     return {}
//   }
//   return JSON.parse(
//     '{"' +
//     decodeURIComponent(search)
//       .replace(/"/g, '\\"')
//       .replace(/&/g, '","')
//       .replace(/=/g, '":"')
//       .replace(/\+/g, ' ') +
//     '"}'
//   )
// }
// */

// // 前端模式构建函数（或者也可以建一个mock server）
// /*
// export function mockXHR() {
//   Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
//   Mock.XHR.prototype.send = function () {
//     if (this.custom.xhr) {
//       this.custom.xhr.withCredentials = this.withCredentials || false

//       if (this.responseType) {
//         this.custom.xhr.responseType = this.responseType
//       }
//     }
//     this.proxy_send(...arguments)
//   }

//   function XHR2ExpressReqWrap(respond) {
//     return function (options) {
//       let result = null
//       if (respond instanceof Function) {
//         const { body, type, url } = options
//         // https://expressjs.com/en/4x/api.html#req
//         result = respond({
//           method: type,
//           body: JSON.parse(body),
//           query: param2Obj(url)
//         })
//       } else {
//         result = respond
//       }
//       return Mock.mock(result)
//     }
//   }

//   for (const i of mocks) {
//     if (i.intercept) {
//       for (const fetch of i.fetches) {
//         Mock.mock(new RegExp(fetch.url), fetch.type || 'get', XHR2ExpressReqWrap(fetch.response))
//       }
//     }
//   }
// }
// */

// function mockXHR() {
//   //  设置全局延时
//   Mock.setup({
//     timeout: '300-600'
//   })

//   for (const i of mocks) {
//     Mock.mock(i.url, i.type || 'get', i.response)
//   }
// }

// export {
//   mocks,
//   mockXHR
// }
