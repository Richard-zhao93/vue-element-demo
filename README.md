# vue-element-demo
一个后台前端解决方案，基于 vue 和 element-ui 实现。使用了 vue 技术栈，内置 i18 国际化解决方案，动态路由，权限验证等功能。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Mock 使用
项目搭建完成后，安装 mock.js：
```
npm i -D mockjs
```
在项目中新建 `mock.js` 文件夹，来设置要产生的[模拟数据的格式](./src/mock.js`)。

在 `main.js` 中引入该文件 `mock.js` ，表明使用 mockJs 拦截请求，返回数据。

然后在代码中使用 `axios` 发起请求，即可接收到模拟数据。
