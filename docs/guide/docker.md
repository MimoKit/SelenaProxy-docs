# Docker 部署

Docker 部署适合 Linux 服务器。项目使用宿主机网络，因此代理端口和 WebUI 端口会直接监听在服务器上。

## 准备环境

确认已经安装 Git、Docker 和 Docker Compose：

```bash
git --version
docker --version
docker compose version
```

## 下载并启动

```bash
git clone https://github.com/MimoKit/SelenaProxy.git
cd SelenaProxy
cp config.example.yaml config.yaml
```

如果需要从其他设备访问，首次启动前把 `config.yaml` 中 `server.host` 和 `status.host` 的 `127.0.0.1` 改为 `0.0.0.0`：

```bash
sed -i 's/host: "127.0.0.1"/host: "0.0.0.0"/g' config.yaml
```

构建并启动：

```bash
docker compose up -d --build
```

## 查看状态和 Token

```bash
docker compose ps
docker compose logs -f selena-proxy
```

首次运行日志会显示 `WebUI Token`。复制后打开：

```text
http://服务器IP:17892
```

## 更新

```bash
git pull --ff-only
docker compose up -d --build
```

## 停止

```bash
docker compose down
```

运行数据保存在 Docker 卷 `selena-proxy-data` 中，执行普通的 `docker compose down` 不会删除该卷。

::: warning
不要使用 `docker compose down -v`，除非确定要同时删除管理员账号、配置、统计和日志数据。
:::

