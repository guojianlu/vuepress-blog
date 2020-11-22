---
sidebar: auto
---
# Webpack

## 简易版webpack
[简易版webpack](https://github.com/guojianlu/simple-webpack)


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

## 如何写一个Loader
::: tip
- loader就是一个函数，不可以是箭头函数(会改变this的指向)
- loader接收一份源代码，然后对源代码进行处理之后返回
- loader必须有返回，否则会报错
:::

### loader如何接收参数
- this.query
  + 如果这个 loader 配置了 options 对象的话，this.query 就指向这个 option 对象。
  + 如果 loader 中没有 options，而是以 query 字符串作为参数调用时，this.query 就是一个以 ? 开头的字符串。
- loader-utils
```
module.exports = function(source) {  // source就是源代码
  return source.replace('world', this.query.name);
}
```

### loader如何返回多个信息
- this.callback 如何返回多个信息，不止是处理好的源码呢，可以使用this.callback来处理
```
// this.callback参数
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);
```
```
module.exports = function(source) {
  const result = source.replace('world', this.query.name);
  this.callback(null, result);
}
```

### loader里如何处理异步事件
- this.async
```
module.exports = function(source) {
  // callback 就是 this.callback 注意参数的使⽤
  const callback = this.async();
  setTimeout(() => {
    const result = source.replace('world', this.query.name);
    callback(null, result);
  }, 1000);
}
```

### 多个loader的使⽤
- 顺序，自右到左

### 处理loader的路径问题
- 默认情况下，使用自己写的loader,需要使用绝对路径
- 通过resolveLoader配置项来指定loader的查找位置之后，就可以进行简写了
```
resolveLoader: {
  modules: ['node_modules', './loaders']
},
module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        'replaceLoader',
        {
          loader: 'replaceLoaderAsync',
          options: {
            name: 'kobe!!!'
          }
        }
      ]
    }
  ]
}
```

### 自定义less-loader
```
const less = require('less');

module.export = function(source) {
  less.render(source, (err, output) => {
    const { css } = output;
    this.callback(err, css);
  });
}
```

### 自定义css-loader
```
module.export = function(source) {
  return JSON.stringify(source);
}
```

### 自定义style-loader
```
module.export = function(source) {
  return `
    const tag = document.createElement('style');
    tag.innerHTML = ${source};
    document.head.appendChild(tag);
  `;
}
```

[参考:loader API](https://webpack.js.org/api/loaders)


## 如何编写一个Plugin
::: tip
- 开始打包，在某个时刻，帮助我们处理理一些什么事情的机制
- plugin是一个类，⾥面包含一个apply函数，接受一个参数， compiler
- compiler通过hooks暴露出很多钩子
- 钩子分为同步钩子和异步钩子
- 同步钩子通过tap调用，异步钩子通过tapAsync调用
:::
[官⽅文档](https://webpack.js.org/contribute/writing-a-plugin/) <br />
[参考:compiler-hooks](https://webpack.js.org/api/compiler-hooks)

简单案例
```
class CopyrightWebpackPlugin {
  constructor(options) {
    this.options = options;
    console.log(options);
  }
  apply(compiler) {
    // 同步钩子
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      console.log('执行了');
    })

    // 异步钩子
    // compilation里包含打包过程的的资源和代码
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
      // assets资源列表对象
      compilation.assets['copyright.txt'] = {
        // 定义资源内容
        source: function() {
          return 'hello plugin';
        },
        // 定义资源的大小
        size: function() {
          return 20;
        }
      };
      cb();  // 不要忘记cb的调用
    })
  }
}

module.exports = CopyrightWebpackPlugin;
```

## 多⼊口打包配置通⽤方案
1、调整目录结构
- src
  + index
    - index.js
    - index.html
  + list
    - index.js
    - index.html
  + detail
    - index.js
    - index.html

2、配置方案
```
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  entryFiles.map(entryFile => {
    const match = entryFile.match(/src\/(.*)\/index\.js$/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        title: pageName,
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true
      })
    );
  });
  
  return { entry, htmlWebpackPlugins };
};
```
3、配置文件
```
const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
  entry,
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  plugins: [
    ...htmlWebpackPlugins
  ]
};
```
[plugin|loader|mpa]

## 优化
1、在生产环境中，使用TerserPlugin压缩JS比UglifyJsPlugin的效果更好，时间更短。<br/>
2、在webpack的最新版本中(4.41.*)，可以使用hard-source-webpack-plugin来代替        webpack.DllPlugin。优化效果比webpack.DllPlugin更加明显，打包时间缩短将近70~80%。<br/>
3、Happyhack与mini-css-extrect-webpack-plugin一起是用会报错，有问题，所以推荐在开发环境使用Happypack，与style-loader一起使用。Happyhack在较小的项目中使用，优化效果不是很明显，打包时间反而会增加。
4、在项目工程下面新建一个 `.npmrc` 的文件，写入 registry=https://registry.npm.taobao.org/ 。修改npm包的下载源，加速依赖安装的速度。
