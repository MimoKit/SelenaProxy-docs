# Windows 源码部署

## 安装环境

需要以下组件：

- [Git for Windows](https://git-scm.com/download/win)
- [Rust stable](https://rustup.rs/)
- Visual Studio Build Tools 2022 的 **使用 C++ 的桌面开发** 工作负载

::: info
VS Code 不是 C++ 链接器。出现 `link.exe not found` 时，需要安装 Visual Studio Build Tools，而不是重新安装 VS Code。
:::

## 编译运行

打开 PowerShell：

```powershell
git clone https://github.com/MimoKit/SelenaProxy.git
Set-Location SelenaProxy
cargo build --release --locked
Copy-Item config.example.yaml config.yaml
.\target\release\selena-proxy.exe --config .\config.yaml
```

控制台出现 `WebUI Token` 后，打开：

```text
http://127.0.0.1:17892
```

## 后台运行

完成首次配置后，可以关闭前台进程，再隐藏启动：

```powershell
Start-Process `
  -FilePath ".\target\release\selena-proxy.exe" `
  -ArgumentList "--config", ".\config.yaml" `
  -WindowStyle Hidden `
  -RedirectStandardOutput ".\selena-proxy.log" `
  -RedirectStandardError ".\selena-proxy-error.log"
```

停止程序：

```powershell
Get-Process selena-proxy -ErrorAction SilentlyContinue | Stop-Process
```

## 允许其他设备访问

将 `config.yaml` 中的 `server.host` 和 `status.host` 改为 `0.0.0.0`，然后在管理员 PowerShell 中放行端口：

```powershell
New-NetFirewallRule `
  -DisplayName "SelenaProxy" `
  -Direction Inbound `
  -Protocol TCP `
  -LocalPort 17891,17892 `
  -Action Allow
```

