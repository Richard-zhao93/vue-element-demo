import Mock from 'mockjs'

const projectList = Mock.mock({
  'list|20': [{
    'name': '@cname', // 中文名
    'account': `@word`, // 英文单词
    'phone': /1[3-9][0-9]{9}/, // 正则模式
    'deptName': Mock.mock('@cword(2,4)'), // 随机2-4字中文单词
    'id': '@guid' // guid
  }]
})

export default [
  {
    url: '/api/project/getList',
    type: 'get',
    response: (res) => {
      console.log(res)
      // let _filter_list = [];
      // if (res.body && res.body.key) {
      //   _filter_list = projectList.filter(i => i.name == res.body.key)
      // }

      // 没错，你应该已经猜到了，res.body就是我们传入到接口的数据，我们可以在这里做些逻辑操作
      // res包含完整的请求头信息
      // 使用return返回前端需要的数据

      return {
        code: 200,
        message: '操作成功',
        data: projectList
      }
    }
  }
  // 多个接口
  // ...
]
