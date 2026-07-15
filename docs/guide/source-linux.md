# Linux 源码部署

安装脚本支持使用 `apt`、`dnf`、`yum` 或 `pacman` 的发行版。脚本会准备编译环境、安装 Rust、构建 Release 程序并注册 systemd 服务。

## 一键安装

```bash
git clone https://github.com/MimoKit/SelenaProxy.git
cd SelenaProxy
sudo bash scripts/install-source.sh
```

安装完成后，脚本会显示 WebUI 地址、代理入口和首次初始化所需的 Token。

## 查看服务

```bash
systemctl status selena-proxy
journalctl -u selena-proxy -f
```

## 更新

进入原来的项目目录执行：

```bash
sudo bash scripts/update-source.sh
```

更新脚本会检查工作区、拉取最新源码、重新编译并重启服务。如果仓库中存在未提交修改，脚本会停止，避免覆盖本地文件。

## 常用命令

```bash
sudo systemctl restart selena-proxy
sudo systemctl stop selena-proxy
sudo systemctl start selena-proxy
```

::: tip
源码安装脚本默认把代理入口和 WebUI 监听地址改为 `0.0.0.0`。请配合服务器防火墙限制 `17891` 和 `17892` 的访问来源。
:::

