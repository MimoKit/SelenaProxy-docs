import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar.mjs'

export default defineConfig({
  base: '/SelenaProxy-docs/',
  title: 'SelenaProxy Docs',
  titleTemplate: 'SelenaProxy 使用文档',
  description: 'SelenaProxy 安装、配置、WebUI 与接入教程',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/SelenaProxy-docs/images/logo.png' }],
    ['meta', { name: 'theme-color', content: '#7766a8' }],
    ['meta', { property: 'og:title', content: 'SelenaProxy Docs' }],
    ['meta', { property: 'og:description', content: '按需提取短效代理，为不同使用方提供独立账号与用量统计。' }],
  ],
  themeConfig: {
    logo: '/images/logo.png',
    outline: [2, 3],
    outlineTitle: '本页导航',
    sidebarMenuLabel: '文档目录',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '外观',
    lastUpdatedText: '最后更新',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    editLink: {
      pattern: 'https://github.com/MimoKit/SelenaProxy-docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
    nav: [
      { text: '首页', link: '/' },
      {
        text: '快速开始',
        items: [
          { text: 'Docker 部署', link: '/guide/docker' },
          { text: 'Linux 源码部署', link: '/guide/source-linux' },
          { text: 'Windows 源码部署', link: '/guide/source-windows' },
          { text: '首次配置', link: '/guide/first-setup' },
        ],
      },
      {
        text: '使用教程',
        items: [
          { text: '账号与链接', link: '/guide/accounts' },
          { text: '运行配置', link: '/guide/configuration' },
          { text: '接入使用', link: '/guide/use' },
          { text: 'WebUI', link: '/guide/webui' },
        ],
      },
      { text: 'GitHub', link: 'https://github.com/MimoKit/SelenaProxy' },
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MimoKit/SelenaProxy' },
    ],
    footer: {
      message: 'SelenaProxy · HTTP CONNECT 短效代理池',
      copyright: 'Released under the GPL-3.0 License',
    },
    search: {
      provider: 'local',
    },
  },
})

