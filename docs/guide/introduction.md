# 项目介绍

SelenaProxy 是一个带 WebUI 的 HTTP CONNECT 代理池。它位于调用方和短效代理之间，统一负责提取节点、分配连接、自动轮换和记录用量。

```text
机器人 / 脚本  →  SelenaProxy  →  短效代理节点  →  目标接口
                  账号鉴权
                  自动轮换
                  独立统计
```

## 适合什么场景

- 多台机器人需要共用同一个代理供应商。
- 短效代理过期快，不想在每个程序里重复实现提取和轮换。
- 希望为不同服务器分配独立凭据并查看各自用量。
- 只允许代理访问指定接口域名和端口。

## 请求是怎么走的

1. 调用方向 SelenaProxy 的代理端口发送带账号密码的 CONNECT 请求。
2. SelenaProxy 校验账号以及目标域名、端口白名单。
3. 代理池没有合适节点时，向供应商 API 按需提取。
4. SelenaProxy 通过短效节点建立隧道；失败时按设置自动轮换。
5. 请求结束后记录成功状态、耗时和上下行流量。

::: tip
SelenaProxy 是通用 HTTP CONNECT 代理池，不限于某个机器人或插件。只要调用方支持 HTTP 代理即可接入。
:::

## 默认端口

| 端口 | 用途 |
| --- | --- |
| `17891` | HTTP CONNECT 代理入口 |
| `17892` | WebUI 管理后台 |

## 相关项目

- 代理来源：[多米代理](https://www.dmdaili.com/)
- 使用场景：[XutheringWavesUID](https://github.com/Loping151/XutheringWavesUID)
- SelenaProxy 源码：[MimoKit/SelenaProxy](https://github.com/MimoKit/SelenaProxy)

