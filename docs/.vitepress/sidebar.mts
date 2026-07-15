import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/guide/': [
    {
      text: '认识 SelenaProxy',
      items: [
        { text: '项目介绍', link: '/guide/introduction' },
        { text: 'WebUI 预览', link: '/guide/webui' },
      ],
    },
    {
      text: '安装部署',
      collapsed: false,
      items: [
        { text: 'Docker 部署', link: '/guide/docker' },
        { text: 'Linux 源码部署', link: '/guide/source-linux' },
        { text: 'Windows 源码部署', link: '/guide/source-windows' },
      ],
    },
    {
      text: '配置与使用',
      collapsed: false,
      items: [
        { text: '首次配置', link: '/guide/first-setup' },
        { text: '账号与链接', link: '/guide/accounts' },
        { text: '运行配置', link: '/guide/configuration' },
        { text: '接入程序', link: '/guide/use' },
      ],
    },
    {
      text: '排查问题',
      items: [
        { text: '常见问题', link: '/guide/faq' },
      ],
    },
  ],
}

