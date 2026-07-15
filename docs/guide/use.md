# 接入程序

## 通用代理地址

在 WebUI 的 **链接** 页面复制账号对应的地址：

```text
http://用户名:密码@服务器地址:17891
```

将它填入调用方的 HTTP 代理配置。目标地址必须位于 SelenaProxy 的域名和端口白名单中。

## 使用 curl 测试

```bash
curl -x "http://用户名:密码@服务器地址:17891" https://目标域名
```

常见返回：

- `200 Connection Established`：代理隧道建立成功。
- `407 Proxy Authentication Required`：用户名、密码或账号状态有问题。
- `403 Target Not Allowed`：目标域名或端口不在白名单。
- `502 All Upstream Proxies Failed`：供应商或短效节点连接失败。

## 配合 XutheringWavesUID

SelenaProxy 可以作为 [XutheringWavesUID](https://github.com/Loping151/XutheringWavesUID) 请求游戏接口时使用的 HTTP 代理。

1. 在 SelenaProxy 中允许 XutheringWavesUID 实际访问的接口域名与 `443` 端口。
2. 单独创建一个账号，方便查看插件使用量。
3. 复制完整代理链接。
4. 将链接填入 XutheringWavesUID 对应的代理配置项。

不同版本的 XutheringWavesUID 配置名称可能调整，请以它当前控制台显示的配置项为准。

## 多服务器使用

推荐每台服务器建立一个账号，例如：

```text
官服机器人 → account-official
测试机器人 → account-test
个人脚本   → account-personal
```

这样可以直接在 WebUI 中判断是哪台设备产生了失败或异常流量。

