// import base from '@/utils/base'

// const tokens = {
//   admin: {
//     token: 'admin-token'
//   },
//   editor: {
//     token: 'editor-token'
//   }
// }

// const users = {
//   'admin-token': {
//     roles: ['admin'],
//     introduction: 'I am a super administrator',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Super Admin'
//   },
//   'editor-token': {
//     roles: ['editor'],
//     introduction: 'I am an editor',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Normal Editor'
//   }
// }

// export default [
//   {
//     url: `${base.localhost}/user/login`,
//     type: 'get',
//     response: res => {
//       const { username } = res.body
//       const token = tokens[username]

//       // mock error
//       // if (!token) {
//       //   return {
//       //     code: 60204,
//       //     message: 'Account and password are incorrect.'
//       //   }
//       // }

//       return {
//         code: 200,
//         data: token
//       }
//     }
//   }
// ]

// New Mock
// 使用 Mock
import Mock from 'mockjs'

// 指定被拦截的Ajax请求的响应时间， 单位是毫秒
Mock.setup({
  timeout: '500-1000'
})

// 获取Random对象
const Random = Mock.Random
// 为 Mock.Random 扩展方法
Random.extend({
  likes: function() {
    const likes = [
      '浴室。每次洗完身子感觉整个身体都在那里放松了。',
      '哈哈哈，我喜欢的是和女孩子一起玩，因为男女搭配，干活不累嘛。',
      '我没啥爱好，唯一的爱好就是宅。',
      '我喜欢看电影，每个周末有时间了就会美滋滋得享受一部好看的电影。',
      '我喜欢美食，因为我觉得人无非就三样，吃喝拉撒睡，首当其冲的便是吃，只有吃好了每天才过的开心。',
      '死宅。一般喜欢宅在家里，不太喜欢出去活动。在家里折腾电脑手机，写写程序，看看编程技术和科技方面的书，几乎每一个程序员手边都有一堆这样那样的书。程序员常常即使没有问题也会去找一些问题来自己瞎折腾，这成了一种乐趣。',
      '看b站。沙雕的生活区，馋人的美食区，可爱的萌宠区，养眼的舞蹈区。',
      '泡网。喜欢泡网，因为网上可以发现很多新奇的东西，学习很多新奇的编程技术，看到很多新奇的IT新闻。程序员往往喜欢比较前言的东西，这些东西也都是最先在网上出现。久而久之，程序员不喜欢网络都不行。不管是遇到问题，还是查询信息，都是首先定性的想到网络了。',
      '我最最喜欢的就是去旅游了，看沿途的风景，真是美呆了。',
      '玩手机。手机是现在很多人喜欢把玩的电子产品，只有到外面走一走就知道了，坐公共交通，等交通工具，等人，甚至上班、开会、走路都有人拿着手机在玩，当然程序员也不例外。当然程序员跟非程序员玩手机的目的还是有一点差别，大多数玩手机是聊qq，玩游戏，什么植物大战僵尸、保卫萝卜、史密斯奶奶、滑雪、神庙、碰碰消和各种各样的手机网游都有人玩，但据我了解，程序员总体上并不是很喜欢玩游戏，往往QQ群、微信群，IT新闻或是一些搞笑搞怪的东西关心的更多。'
    ]
    return this.pick(likes)
  }
})
Mock.Random.extend({
  address: function() {
    const address = [
      '浙江省嘉兴市沈荡古镇',
      '四川省成都市大熊猫基地',
      '深圳市南山区白石洲中信红树湾',
      '日本大阪环球影城',
      '四川成都市中德英伦联邦C区',
      '北京市中南海老四合院靠左',
      '安徽省安庆市宿松县许岭镇',
      '上海市浦东新区咪咕视频',
      '上海市浦东新区金桥经济开发区金港路766号',
      '上海市浦东新区唐镇小湾村'
    ]
    return this.pick(address)
  }
})

const list = [] // 初始化 user list
// 随机添加 20 位用户
for (let i = 0; i < 20; i++) {
  list.push({
    id: i + 1,
    date: Random.date(),
    name: Random.cname(),
    address: Random.address(),
    likes: Random.likes()
  })
}

// 用户信息
const users = [
  {
    id: 1,
    username: 'editor',
    password: '123456',
    token: 'editor-token',
    roles: ['editor'],
    rights: [
      {
        id: 1,
        authName: '用户管理',
        icon: 'user',
        children: [
          {
            id: 11,
            authName: '用户列表',
            path: '/user',
            rights: ['view', 'edit', 'add', 'delete']
          }
        ]
      }
    ]
  },
  {
    id: 2,
    username: 'admin',
    password: '123456',
    token: 'admin-token',
    roles: ['admin'],
    rights: [
      {
        id: 1,
        authName: '用户管理',
        icon: 'user',
        children: [
          {
            id: 11,
            authName: '用户列表',
            path: '/user',
            rights: ['view', 'edit', 'add', 'delete']
          },
          {
            id: 12,
            authName: '一级项目2',
            path: '/project2',
            rights: ['view', 'edit', 'add', 'delete']
          }
        ]
      },
      {
        id: 2,
        authName: '权限管理',
        icon: 'order',
        children: [
          {
            id: 22,
            authName: '角色权限',
            path: '/roles',
            rights: ['view', 'edit', 'add', 'delete']
          }
        ]
      }
    ]
  }
]

/**
 * Mock.mock( url, type, function( options ) )
 * url 需要拦截的 url
 * type 需要拦截的 ajax 请求类型
 * function( options ) 用于生成响应数据的函数
 * 记录用于生成响应数据的函数。当拦截到匹配 url 和 type 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
 */
const baseUrl = 'http://localhost:8080'

// 用户登录
Mock.mock(`${baseUrl}/user/login`, 'post', options => {
  const { username, password } = JSON.parse(options.body).params

  const user = users.find(item => {
    return item.username === username && item.password === password
  })

  return user
})

// 获取用户信息
Mock.mock(`${baseUrl}/user/getInfo`, 'post', options => {
  const { token } = JSON.parse(options.body)

  const user = users.find(item => {
    return item.token === token
  })

  return user
})
