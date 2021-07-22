// 引用 Mock
const Mock = require('mockjs')

// 获取 mock.random 对象
const Random = Mock.Random

// mock 新闻数据（ title content createdTime ）
const getNews = function () {
  let news = []
  for (let i = 0; i < 10; i++) {
    let newsObj = {
      title: Random.ctitle(), // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
      content: Random.cparagraph(), // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7
      createdTime: Random.date() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
    }

    news.push(newsObj)
  }

  return news
}

Mock.mock('/mock/news', getNews)
