# 首次配置

## 1. 获取 WebUI Token

Token 只用于首次初始化管理员账号，可以从启动日志取得。

```bash
# Docker
docker compose logs selena-proxy

# Linux systemd
journalctl -u selena-proxy -n 50 --no-pager
```

Windows 直接查看正在运行 SelenaProxy 的 PowerShell 窗口。

## 2. 创建管理员

打开 `http://服务器IP:17892`，输入日志中的 WebUI Token。验证通过后设置管理员账号和强密码。

密码需要：

- 至少 8 位；
- 包含大写字母；
- 包含数字；
- 包含特殊符号，例如 `@`。

## 3. 填写供应商 API

登录[多米代理](https://www.dmdaili.com/)，创建代理提取链接。进入 SelenaProxy 的 **设置** 页面，将完整链接填入“多米 API 地址”。

如果原链接带有 `getnum`，SelenaProxy 会根据“单次提取数量”自动替换，不需要手动修改链接。

## 4. 设置访问范围

至少确认以下内容：

1. **对外访问地址**：填写调用方可以访问到的服务器 IP 或域名，不带协议和端口。
2. **允许端口**：HTTPS 接口通常使用 `443`。
3. **允许域名**：每行一个，支持 `*.example.com` 形式的子域名通配。
4. 点击页面底部的 **保存配置**。

## 5. 创建代理账号

进入 **账号** 页面，添加名称、代理用户名和代理密码。保存后前往 **链接** 页面复制地址。

::: warning
没有任何启用账号时，代理入口会返回 `407`，不会自动开放匿名访问。
:::

