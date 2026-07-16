---
aside: false
---

# WebUI

WebUI 默认运行在 `17892` 端口。首次进入需要用启动日志里的 Token 创建管理员，之后使用管理员账号登录。

## 在线交互演示

下面是 WebUI 的纯静态交互演示。数据、账号、节点和代理地址均为虚构示例，页面不会连接 SelenaProxy 后端，也不会上传或持久化你填写的内容。

<div class="webui-demo-frame webui-guide-frame">
  <iframe
    src="/SelenaProxy-docs/webui-demo/"
    title="SelenaProxy WebUI 静态交互演示"
    loading="lazy"
    referrerpolicy="no-referrer"
  ></iframe>
</div>

<p class="webui-demo-open">
  <a href="/SelenaProxy-docs/webui-demo/" target="_blank" rel="noopener noreferrer">在新窗口打开完整演示</a>
</p>

::: warning 演示模式
演示中的“保存账号”“保存配置”和“复制链接”只用于体验界面效果。刷新页面后会恢复默认示例；真实部署后，WebUI 才会连接本机 SelenaProxy 服务并保存配置。
:::

## 总览

查看健康节点、活动连接、累计提取、请求结果和流量统计。

![运行总览](/images/overview.jpg)

## 账号

添加、编辑、停用或删除代理账号。保存期间表单会锁定，避免重复提交。

![账号管理](/images/accounts.jpg)

## 链接

一键复制各账号的完整代理地址，并打开单账号用量面板。页面上不会直接显示真实密码。

![链接与用量](/images/links.jpg)

## 节点与日志

- **节点**：查看当前短效代理、剩余安全时间、活动连接和失败次数。
- **日志**：查看认证失败、白名单拦截、供应商提取和节点轮换记录。

## 设置

修改供应商 API、代理池策略、监听地址和目标白名单。设置保存后会热更新，不需要手动重启。

![运行设置](/images/settings.jpg)

::: tip
通过 HTTPS 反向代理公开 WebUI 时，请让反向代理传递 `X-Forwarded-Proto: https`，登录 Cookie 会自动附加 Secure 属性。
:::

