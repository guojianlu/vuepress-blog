const nav = require('./utils/nav.js');
const { cssSidebar } = nav;
module.exports = {
  title: '奔跑的小鸟',
  description: '奔跑的小鸟的个人站点',
  base: '/blog/',
  head: [
    ['link', { rel: 'icon', href: '/icon.png' }]
  ],
  port: 3000,
  markdown: {
    lineNumbers: false
  },
  themeConfig: {
    repo: 'https://github.com/guojianlu/blog',
    repoLabel: 'Github',
    editLinks: true,
    editLinkText: '编辑此页',
    sidebar: 'auto',
    lastUpdated: 'Last Updated',
    nav: [
      { text: '首页', link: '/' },
      { text: 'JavaScript',link: '/javascript/'},
      { text: 'React',link: '/react/'},
      { text: '前端面试之道',link: '/interview/'},
      { text: 'JavaScript设计模式', link: '/designPattern/'},
      { text: 'CSS奇技淫巧',link: '/css/'},
      { text: 'Webpack',link: '/webpack/'},
      { text: 'Git',link: '/git/'},
      { text: 'Linux',link: '/linux/'},
    ],
    sidebar: {
      '/css/': [cssSidebar],
    }
  },
}
