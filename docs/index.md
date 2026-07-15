---
layout: home

title: SelenaProxy Docs
titleTemplate: 安装、配置和使用 SelenaProxy

hero:
  name: SelenaProxy
  text: 短效代理池
  tagline: 按需提取、自动轮换、多账号鉴权与独立用量统计
  image:
    src: /images/logo.png
    alt: SelenaProxy
  actions:
    - theme: brand
      text: 开始部署
      link: /guide/docker
    - theme: alt
      text: 首次配置
      link: /guide/first-setup
    - theme: alt
      text: 查看源码
      link: https://github.com/MimoKit/SelenaProxy

features:
  - title: 按需提取
    details: 收到请求时才补充短效节点，没有流量时不反复消耗供应商额度。
    link: /guide/introduction
    linkText: 工作方式
  - title: 自动轮换
    details: 节点连接失败、超过安全时间或达到失败上限后自动更换。
    link: /guide/configuration
    linkText: 调整策略
  - title: 多账号管理
    details: 给不同机器人或服务器分配独立账号，分别查看请求与流量。
    link: /guide/accounts
    linkText: 管理账号
  - title: WebUI
    details: 在浏览器中管理供应商、白名单、节点策略和账号链接。
    link: /guide/webui
    linkText: 页面预览
  - title: 访问范围
    details: 使用目标域名和端口白名单限制代理用途，未启用账号拒绝访问。
    link: /guide/configuration
    linkText: 配置白名单
  - title: 多种部署方式
    details: 支持 Docker、Linux 源码服务和 Windows 本地运行。
    link: /guide/docker
    linkText: 选择部署方式
---

## WebUI 一览

![SelenaProxy WebUI 总览](/images/overview.jpg)

<div class="doc-cards">
  <div class="doc-card">
    <h3>第一次使用</h3>
    <p>先部署服务，从启动日志取得 WebUI Token，再创建管理员并填写供应商 API。</p>
    <a href="/SelenaProxy-docs/guide/first-setup">打开首次配置教程 →</a>
  </div>
  <div class="doc-card">
    <h3>接入机器人</h3>
    <p>创建代理账号，复制带鉴权信息的 HTTP 代理链接，填入调用方即可。</p>
    <a href="/SelenaProxy-docs/guide/use">打开接入教程 →</a>
  </div>
</div>
