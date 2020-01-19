---
sidebar: auto
---
# Webpack

## 环境选项
当 webpack 配置对象导出为一个函数时，可以向起传入一个"环境对象(environment)"。
```sh
$ webpack --env.production    # 设置 env.production == true
$ webpack --env.platform=web  # 设置 env.platform == "web"
```

`--env` 参数具有多种语法
```
$ webpack --env prod        `"prod"`
$ webpack --env.prod        `{ prod: true }`
$ webpack --env.prod=1      `{ prod: 1 }`
$ webpack --env.prod=foo    `{ prod: "foo" }`
$ webpack --env.prod --env.min `{ prod: true, min: true }`
```

## 配置选项 
- `--config` 配置文件的路径, 默认值webpack.config.js
- `--env` 当配置文件是一个函数时，会将环境变量传给这个函数
- `--mode` 用到的模式，"development" 或 "production" 之中的一个


## 配置
### output
- `publicPath` 公司有自己的cdn时，这会相当有用，html文件引入静态资源的时候会在其路径前面加上这个publicPach,这样的话，这些静态资源就可以部署到cdn上(与html不在同一个域下面)


## devServer
- `after` 在服务内部的所有其他中间件之后， 提供执行自定义中间件的功能。
```
devServer: {
  after: function(app, server) {
    // 做些有趣的事
  }
}
```
- `before` 在服务内部的所有其他中间件之前， 提供执行自定义中间件的功能。
```
devServer: {
  before: function(app, server) {
    app.get('/some/path', function(req, res) {
      res.json({ custom: 'response' });
    });
  }
}
// 此功能可用于提供mock数据
```
- `headers` 在所有响应中添加首部内容
```
devServer: {
  headers: {
    'X-Custom-Foo': 'bar'
  }
}
```
- `historyApiFallback` 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。默认禁用。
```
devServer: {
  historyApiFallback: true
}
// 通过传入一个对象，比如使用 rewrites 这个选项，此行为可进一步地控制
devServer: {
  historyApiFallback: {
    rewrites: [
      { from: /^\/$/, to: '/views/landing.html' },
      { from: /^\/subpage/, to: '/views/subpage.html' },
      { from: /./, to: '/views/404.html' }
    ]
  }
}
```
- `proxy` API请求转发，dev-server 使用了非常强大的 http-proxy-middleware 包。
```
// 请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users。
devServer: {
  proxy: {
    '/api': 'http://localhost:3000'
  }
}

// 如果你不想始终传递 /api ，则需要重写路径
devServer: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: {'^/api' : ''}
    }
  }
}
```
- `compress` 启用 gzip 压缩
- `contentBase` 告诉服务器从哪个目录中提供内容, 默认情况下，将使用当前工作目录作为提供内容的目录。
- `hot` 启用 webpack 的模块热替换功能, 必须有 webpack.HotModuleReplacementPlugin 才能完全启用 HMR。(默认情况下，当有内容修改的时候，会刷新整个浏览器，状态将不会被保存。)
- `hotOnly` 即使HMR没有生效，也不自动刷新浏览器
- `open` 告诉 dev-server 在 server 启动后打开浏览器。默认禁用。
- `port` 指定端口
- `performance` 配置如何展示性能提示。


::: tip
`HMR` 不支持将css单独抽离成文件的形式<br>
开发模式推荐使用style-loader处理样式文件，将css以style标签的形式插入到head标签里，这样就能正常的HMR了<br>
生成模式推荐使用MiniCssExtranctPlugin.loader来处理样式文件，将css抽离到一个单独的文件里。此时也没必要进行HMR.
:::

::: tip
`HMR` 原理<br>
每次编译之后会生成xxx.hot-update.json和xxx.hot-update.js文件，对比两次编译之后的.json文件，看是是否有变化，有变化则执行.js文件来进行跟新
:::

::: tip
上面配置的HMR对js的支持还不是很友好，所以还需要配合设置模块监听。<br>
各技术栈有自己相应的loader，具体到官方查询配置即可。
:::
```
// 原生处理：
if(module.hot) {
  module.hot.accept("模块", function() {
    // 监听到模块发生变化，执行相应的操作
  });
}
```