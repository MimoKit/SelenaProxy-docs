const $ = (id) => document.getElementById(id);

const initialDemo = {
  nodes: [
    { 地址: "192.0.2.18:31001", 剩余安全时间秒: 87.4, 活动连接: 2, 累计连接: 146, 失败次数: 0 },
    { 地址: "198.51.100.27:31002", 剩余安全时间秒: 64.8, 活动连接: 1, 累计连接: 98, 失败次数: 1 },
    { 地址: "203.0.113.42:31003", 剩余安全时间秒: 42.2, 活动连接: 0, 累计连接: 73, 失败次数: 0 },
  ],
  accounts: [
    { id: "demo-bot", name: "机器人服务", username: "demo_bot", password: "DemoOnly-2026!", enabled: true },
    { id: "demo-crawler", name: "采集任务", username: "demo_crawler", password: "StaticDemo-2026!", enabled: true },
    { id: "demo-paused", name: "停用示例", username: "demo_paused", password: "Disabled-2026!", enabled: false },
  ],
  accountUsage: [
    { id: "demo-bot", name: "机器人服务", username: "demo_bot", enabled: true, 使用统计: { 统计日期: "今日", 今日: { 代理请求: 286, 成功请求: 278, 失败请求: 8, 白名单拦截: 3, 代理轮换: 12, 上传字节: 1835008, 下载字节: 9961472, 总流量字节: 11796480, 平均流量字节: 41246, 平均耗时毫秒: 684 }, 累计: { 代理请求: 18420, 成功请求: 17953, 失败请求: 467, 白名单拦截: 91, 代理轮换: 742, 上传字节: 125829120, 下载字节: 734003200, 总流量字节: 859832320, 平均流量字节: 46679, 平均耗时毫秒: 712 } } },
    { id: "demo-crawler", name: "采集任务", username: "demo_crawler", enabled: true, 使用统计: { 统计日期: "今日", 今日: { 代理请求: 164, 成功请求: 157, 失败请求: 7, 白名单拦截: 1, 代理轮换: 8, 上传字节: 917504, 下载字节: 7340032, 总流量字节: 8257536, 平均流量字节: 50351, 平均耗时毫秒: 821 }, 累计: { 代理请求: 9218, 成功请求: 8940, 失败请求: 278, 白名单拦截: 43, 代理轮换: 391, 上传字节: 67108864, 下载字节: 503316480, 总流量字节: 570425344, 平均流量字节: 61880, 平均耗时毫秒: 846 } } },
    { id: "demo-paused", name: "停用示例", username: "demo_paused", enabled: false, 使用统计: { 统计日期: "今日", 今日: {}, 累计: { 代理请求: 132, 成功请求: 128, 失败请求: 4, 白名单拦截: 0, 代理轮换: 5, 上传字节: 524288, 下载字节: 3145728, 总流量字节: 3670016, 平均流量字节: 27803, 平均耗时毫秒: 750 } } },
  ],
  config: {
    provider: { api_url: "https://provider.example/api/proxies?token=demo", fetch_interval_seconds: 3, fetch_batch_size: 5, max_fetch_size: 20, request_timeout_seconds: 8, retry_backoff_seconds: 1 },
    pool: { minimum_ttl_seconds: 90, expire_safety_seconds: 15, max_failures: 3, max_concurrency_per_proxy: 8 },
    server: { host: "0.0.0.0", port: 17891, public_host: "proxy.example.com", connect_timeout_seconds: 10, tunnel_idle_timeout_seconds: 300, max_connect_retries: 3, allowed_ports: [80, 443, 8080], allowed_hosts: ["*.example.com", "api.example.net"] },
    status: { 只读: true },
    log_level: "INFO",
  },
  logs: [
    { id: 1, 时间: Date.now() - 150000, 类型: "提取成功", 级别: "info", 消息: "已加入 3 个短效代理节点", 详情: { 来源: "演示供应商", 耗时: "428 ms" } },
    { id: 2, 时间: Date.now() - 108000, 类型: "请求日志", 级别: "info", 消息: "代理请求已完成", 详情: { 账号: "demo_bot", 目标: "api.example.net:443", 节点: "192.0.2.18:31001" } },
    { id: 3, 时间: Date.now() - 73000, 类型: "白名单拦截", 级别: "warning", 消息: "目标地址不在允许列表中", 详情: { 账号: "demo_crawler", 目标: "blocked.example:443" } },
    { id: 4, 时间: Date.now() - 41000, 类型: "节点轮换", 级别: "warning", 消息: "节点剩余时间不足，已切换代理", 详情: { 原节点: "203.0.113.17:30998", 新节点: "198.51.100.27:31002" } },
    { id: 5, 时间: Date.now() - 17000, 类型: "请求日志", 级别: "info", 消息: "代理请求已完成", 详情: { 账号: "demo_crawler", 目标: "www.example.com:443", 节点: "198.51.100.27:31002" } },
  ],
};

const state = { toastTimer: null, timers: [], selectedAccountId: null, eventId: 5 };
const titles = { overview: "总览", nodes: "节点", accounts: "账号", links: "链接", logs: "日志", config: "设置" };

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function esc(value) { return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }
function setValue(id, value) { $(id).value = value ?? ""; }
function numberValue(id) { return Number($(id).value); }

function toast(text) {
  clearTimeout(state.toastTimer);
  $("toast").textContent = text;
  $("toast").classList.add("show");
  state.toastTimer = setTimeout(() => $("toast").classList.remove("show"), 2200);
}

function showView(name) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === `view-${name}`));
  document.querySelectorAll(".nav").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  $("view-title").textContent = titles[name];
}

function bytes(value) {
  const number = Number(value) || 0;
  if (number < 1024) return `${number} B`;
  if (number < 1048576) return `${(number / 1024).toFixed(1)} KB`;
  if (number < 1073741824) return `${(number / 1048576).toFixed(2)} MB`;
  return `${(number / 1073741824).toFixed(2)} GB`;
}

function metricsHtml(metrics = {}, finalItem = null) {
  finalItem ||= ["活跃账号", metrics["活跃账号"]];
  const items = [["代理请求", metrics["代理请求"]], ["成功请求", metrics["成功请求"]], ["失败请求", metrics["失败请求"]], ["认证失败", metrics["认证失败"]], ["白名单拦截", metrics["白名单拦截"]], ["代理轮换", metrics["代理轮换"]], ["供应商调用", metrics["供应商调用"]], ["提取 IP", metrics["提取IP数量"]], ["供应商失败", metrics["供应商失败"]], ["上传流量", bytes(metrics["上传字节"])], ["下载流量", bytes(metrics["下载字节"])], ["总流量", bytes(metrics["总流量字节"])], ["平均流量", bytes(metrics["平均流量字节"])], ["平均耗时", `${metrics["平均耗时毫秒"] || 0} ms`], finalItem];
  return items.map(([key, value]) => `<div><dt>${esc(key)}</dt><dd>${esc(value ?? 0)}</dd></div>`).join("");
}

function accountMetricsHtml(metrics = {}, enabled) {
  const total = Number(metrics["代理请求"]) || 0;
  const success = Number(metrics["成功请求"]) || 0;
  const items = [["代理请求", total], ["成功请求", success], ["失败请求", metrics["失败请求"]], ["白名单拦截", metrics["白名单拦截"]], ["代理轮换", metrics["代理轮换"]], ["成功率", total ? `${((success / total) * 100).toFixed(1)}%` : "0%"], ["上传流量", bytes(metrics["上传字节"])], ["下载流量", bytes(metrics["下载字节"])], ["总流量", bytes(metrics["总流量字节"])], ["平均流量", bytes(metrics["平均流量字节"])], ["平均耗时", `${metrics["平均耗时毫秒"] || 0} ms`], ["账号状态", enabled ? "已启用" : "已停用"]];
  return items.map(([key, value]) => `<div><dt>${esc(key)}</dt><dd>${esc(value ?? 0)}</dd></div>`).join("");
}

function remaining(node) { return Math.max(0, Number(node["剩余安全时间秒"]) - (Date.now() - state.snapshotAt) / 1000); }

function renderNodes() {
  $("node-table").innerHTML = state.nodes.map((node) => `<tr><td><code>${esc(node["地址"])}</code></td><td class="countdown" data-node="${esc(node["地址"])}">${remaining(node).toFixed(1)}s</td><td>${node["活动连接"]}</td><td>${node["累计连接"]}</td><td>${node["失败次数"]}</td><td><span class="pill">可用</span></td></tr>`).join("") || '<tr><td colspan="6" class="empty">当前没有可用节点。</td></tr>';
  $("node-count").textContent = `${state.nodes.length} 个节点`;
  $("node-preview").innerHTML = state.nodes.slice(0, 4).map((node) => `<div class="node-mini"><code>${esc(node["地址"])}</code><span class="countdown" data-node="${esc(node["地址"])}">${remaining(node).toFixed(1)}s</span></div>`).join("") || "当前没有可用节点";
}

function tickCountdowns() {
  document.querySelectorAll("[data-node]").forEach((element) => {
    const node = state.nodes.find((item) => item["地址"] === element.dataset.node);
    if (node) element.textContent = `${remaining(node).toFixed(1)}s`;
  });
}

function totals() {
  const enabled = state.accounts.filter((account) => account.enabled).length;
  return {
    今日: { 代理请求: 450, 成功请求: 435, 失败请求: 15, 认证失败: 4, 白名单拦截: 4, 代理轮换: 20, 供应商调用: 9, 提取IP数量: 27, 供应商失败: 1, 上传字节: 2752512, 下载字节: 17301504, 总流量字节: 20054016, 平均流量字节: 44564, 平均耗时毫秒: 734, 活跃账号: enabled },
    累计: { 代理请求: 27770, 成功请求: 27021, 失败请求: 749, 认证失败: 118, 白名单拦截: 134, 代理轮换: 1138, 供应商调用: 486, 提取IP数量: 1458, 供应商失败: 19, 上传字节: 193462272, 下载字节: 1240465408, 总流量字节: 1433927680, 平均流量字节: 51636, 平均耗时毫秒: 759, 活跃账号: enabled },
  };
}

function renderOverview() {
  const usage = totals();
  $("healthy").textContent = state.nodes.length;
  $("active").textContent = state.nodes.reduce((sum, node) => sum + node["活动连接"], 0);
  $("fetched").textContent = 486;
  $("success").textContent = usage.累计["成功请求"];
  $("failed").textContent = usage.累计["失败请求"];
  $("request-total").textContent = usage.累计["代理请求"];
  $("traffic-total").textContent = bytes(usage.累计["总流量字节"]);
  $("account-total").textContent = state.accounts.length;
  $("metrics-today").innerHTML = metricsHtml(usage.今日);
  $("metrics-total").innerHTML = metricsHtml(usage.累计);
  $("metrics-date").textContent = new Date().toLocaleDateString("zh-CN");
  $("updated-at").textContent = `演示数据 · ${new Date().toLocaleTimeString()}`;
  $("connection-dot").className = "ok";
  $("connection-text").textContent = "静态演示";
}

function eventHtml(event) { return `<div class="event"><time>${new Date(event["时间"]).toLocaleTimeString()}</time><div><strong>${esc(event["消息"])}</strong><small>${esc(event["类型"])}</small></div><span class="pill ${esc(event["级别"])}">${esc(event["级别"])}</span></div>`; }
function logHtml(event) {
  const details = Object.entries(event["详情"] || {}).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`).join("\n");
  return `<div class="log-row" data-level="${esc(event["级别"])}"><time>${new Date(event["时间"]).toLocaleTimeString()}</time><span class="pill ${esc(event["级别"])}">${esc(event["级别"])}</span><span>${esc(event["类型"])}</span><div class="log-message"><strong>${esc(event["消息"])}</strong><pre>${esc(details)}</pre></div></div>`;
}

function renderLogs() {
  const level = $("log-level").value;
  const list = level === "all" ? state.logs : state.logs.filter((event) => event["级别"] === level);
  $("log-list").innerHTML = list.slice().reverse().map(logHtml).join("") || '<div class="empty">暂无日志</div>';
  $("event-preview").innerHTML = state.logs.slice(-5).reverse().map(eventHtml).join("") || '<div class="empty">暂无事件</div>';
}

function addDemoEvent() {
  const templates = [
    ["请求日志", "info", "代理请求已完成", { 账号: "demo_bot", 目标: "api.example.net:443" }],
    ["节点轮换", "warning", "演示节点到期，已自动轮换", { 新节点: "192.0.2.18:31001" }],
    ["提取成功", "info", "演示供应商返回新的短效节点", { 数量: 3, 耗时: "391 ms" }],
  ];
  const [type, level, message, details] = templates[state.eventId % templates.length];
  state.logs.push({ id: ++state.eventId, 时间: Date.now(), 类型: type, 级别: level, 消息: message, 详情: details });
  if (state.logs.length > 30) state.logs.shift();
  renderLogs();
  renderOverview();
}

function validIpv6(value) {
  const candidate = value.startsWith("[") && value.endsWith("]") ? value.slice(1, -1) : value;
  if (!candidate.includes(":") || candidate.includes("%")) return false;
  try { new URL(`http://[${candidate}]/`); return true; } catch { return false; }
}

function validPublicHost(value) {
  const host = value.trim();
  if (!host) return true;
  if (host.includes("://") || host.includes("/") || /\s/u.test(host) || host.length > 253) return false;
  if (host.includes(":")) return validIpv6(host);
  return host.split(".").every((label) => label.length > 0 && label.length <= 63 && !label.startsWith("-") && !label.endsWith("-") && /^[A-Za-z0-9-]+$/.test(label));
}

function validatePublicHost() {
  const input = $("server-public-host");
  input.setCustomValidity(validPublicHost(input.value) ? "" : "对外访问地址只能填写有效的 IP 或域名，不能包含协议、路径、端口或空格");
  return input.validity.valid;
}

function parseAllowedPorts() {
  const input = $("allowed-ports");
  const parts = input.value.split(",").map((value) => value.trim());
  let message = "";
  if (!parts.length || parts.some((value) => !value)) message = "请填写至少一个端口，并用英文逗号分隔";
  else if (parts.some((value) => !/^\d+$/.test(value))) message = "允许端口只能包含数字和英文逗号";
  const ports = parts.map(Number);
  if (!message && ports.some((port) => !Number.isInteger(port) || port < 1 || port > 65535)) message = "每个允许端口都必须在 1 到 65535 之间";
  if (!message && new Set(ports).size !== ports.length) message = "允许端口不能重复";
  input.setCustomValidity(message);
  return message ? null : ports;
}

function validateConfigFields(report = false) {
  const hostValid = validatePublicHost();
  const ports = parseAllowedPorts();
  if (report && (!hostValid || !ports)) $("config-form").reportValidity();
  return hostValid && ports ? ports : null;
}

function proxyHost() {
  const host = state.config.server.public_host.trim();
  const formatted = host.includes(":") && !host.startsWith("[") ? `[${host}]` : host;
  return formatted ? `${formatted}:${state.config.server.port}` : "";
}
function encodeCredential(value) { return encodeURIComponent(value).replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`); }
function proxyUrl(account) { return account?.username && account?.password && proxyHost() ? `http://${encodeCredential(account.username)}:${encodeCredential(account.password)}@${proxyHost()}` : ""; }
function proxyDisplayUrl(account) { return account?.username && account?.password && proxyHost() ? `http://${encodeCredential(account.username)}:••••••••@${proxyHost()}` : ""; }

async function copyText(value) {
  if (!value) return;
  try { await navigator.clipboard.writeText(value); } catch {
    const input = document.createElement("textarea");
    input.value = value;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }
  toast("演示链接已复制");
}

function newAccount() {
  const id = globalThis.crypto?.randomUUID ? crypto.randomUUID() : `account-${Date.now()}`;
  return { id, name: "新账号", username: "demo_new", password: "DemoOnly-2026!", enabled: true };
}
function accountEditor(account) { return `<article class="account-card" data-account-id="${esc(account.id)}"><div class="account-card-head"><div><strong>${esc(account.name || "未命名账号")}</strong><small>${esc(account.username || "未设置用户名")}</small></div><button class="danger-link" type="button" data-delete-account>删除</button></div><div class="form-grid"><label><span>账号名称</span><input data-account-field="name" value="${esc(account.name)}" maxlength="64" required /></label><label><span>代理用户名</span><input data-account-field="username" value="${esc(account.username)}" maxlength="128" autocomplete="off" required /></label><label class="wide"><span>代理密码</span><div class="secret"><input data-account-field="password" type="password" value="${esc(account.password)}" maxlength="256" autocomplete="new-password" required /><button type="button" data-toggle-account-password>显示</button></div></label><label class="account-enabled"><input data-account-field="enabled" type="checkbox" ${account.enabled ? "checked" : ""} /><span>启用账号</span></label></div></article>`; }
function collectAccounts() { return [...document.querySelectorAll(".account-card")].map((card) => ({ id: card.dataset.accountId, name: card.querySelector('[data-account-field="name"]').value.trim(), username: card.querySelector('[data-account-field="username"]').value.trim(), password: card.querySelector('[data-account-field="password"]').value, enabled: card.querySelector('[data-account-field="enabled"]').checked })); }

function renderAccounts() {
  $("account-list").innerHTML = state.accounts.map(accountEditor).join("") || '<div class="empty account-empty">还没有账号</div>';
  $("account-total").textContent = state.accounts.length;
  $("add-account").disabled = false;
  $("accounts-form").querySelector('[type="submit"]').disabled = false;
}

function renderLinks() {
  $("link-account-count").textContent = `${state.accounts.length} 个账号`;
  $("link-list").innerHTML = state.accounts.map((account) => {
    const url = proxyUrl(account);
    const value = proxyDisplayUrl(account) || "账号信息不完整";
    return `<article class="link-card ${account.enabled ? "" : "disabled"}"><div class="link-card-meta"><div><strong>${esc(account.name)}</strong><small>${esc(account.username)}</small></div><span class="pill">${account.enabled ? "已启用" : "已停用"}</span></div><div class="copy-field"><input value="${esc(value)}" readonly /><button type="button" data-copy-account="${esc(account.id)}" ${!url || !account.enabled ? "disabled" : ""}>复制</button></div><button class="link usage-link" type="button" data-account-usage="${esc(account.id)}">查看数据</button></article>`;
  }).join("") || '<div class="empty">还没有账号</div>';
}

function syncAccountUsage() {
  state.accountUsage = state.accounts.map((account) => {
    const existing = state.accountUsage.find((item) => item.id === account.id);
    return existing ? { ...existing, name: account.name, username: account.username, enabled: account.enabled } : { ...account, 使用统计: { 统计日期: "今日", 今日: {}, 累计: {} } };
  });
}

function showAccountUsage(accountId) {
  const item = state.accountUsage.find((account) => account.id === accountId);
  if (!item) return;
  state.selectedAccountId = accountId;
  const usage = item["使用统计"] || {};
  $("account-usage-panel").hidden = false;
  $("account-usage-title").textContent = item.name;
  $("account-usage-subtitle").textContent = item.username;
  $("account-metrics-date").textContent = usage["统计日期"] || "今日";
  $("account-metrics-today").innerHTML = accountMetricsHtml(usage["今日"], item.enabled);
  $("account-metrics-total").innerHTML = accountMetricsHtml(usage["累计"], item.enabled);
}

function loadConfigForm() {
  const config = state.config;
  setValue("provider-api", config.provider.api_url);
  setValue("fetch-interval", config.provider.fetch_interval_seconds);
  setValue("fetch-batch", config.provider.fetch_batch_size);
  setValue("fetch-max", config.provider.max_fetch_size);
  setValue("provider-timeout", config.provider.request_timeout_seconds);
  setValue("config-log-level", config.log_level);
  setValue("minimum-ttl", config.pool.minimum_ttl_seconds);
  setValue("expire-safety", config.pool.expire_safety_seconds);
  setValue("max-failures", config.pool.max_failures);
  setValue("max-concurrency", config.pool.max_concurrency_per_proxy);
  setValue("server-host", config.server.host);
  setValue("server-port", config.server.port);
  setValue("server-public-host", config.server.public_host);
  setValue("connect-timeout", config.server.connect_timeout_seconds);
  setValue("idle-timeout", config.server.tunnel_idle_timeout_seconds);
  setValue("connect-retries", config.server.max_connect_retries);
  setValue("allowed-ports", config.server.allowed_ports.join(", "));
  setValue("allowed-hosts", config.server.allowed_hosts.join("\n"));
  validateConfigFields();
  $("save-state").textContent = "演示配置没有修改";
}

function resetDemo(showMessage = true) {
  state.nodes = clone(initialDemo.nodes);
  state.accounts = clone(initialDemo.accounts);
  state.accountUsage = clone(initialDemo.accountUsage);
  state.config = clone(initialDemo.config);
  state.logs = clone(initialDemo.logs);
  state.snapshotAt = Date.now();
  state.selectedAccountId = null;
  $("account-usage-panel").hidden = true;
  $("log-level").value = "all";
  loadConfigForm();
  renderNodes();
  renderAccounts();
  renderLinks();
  renderLogs();
  renderOverview();
  $("account-save-state").textContent = "演示账号没有修改";
  showView("overview");
  if (showMessage) toast("演示数据已重置");
}

document.querySelectorAll(".nav").forEach((button) => button.onclick = () => showView(button.dataset.view));
document.querySelectorAll("[data-go]").forEach((button) => button.onclick = () => showView(button.dataset.go));
$("reset-demo").onclick = () => resetDemo();
$("log-level").onchange = renderLogs;
$("clear-screen").onclick = () => { state.logs = []; renderLogs(); toast("已清空当前演示日志"); };

$("toggle-api").onclick = () => {
  const input = $("provider-api");
  input.type = input.type === "password" ? "text" : "password";
  $("toggle-api").textContent = input.type === "password" ? "显示" : "隐藏";
};
$("server-public-host").addEventListener("input", validatePublicHost);
$("allowed-ports").addEventListener("input", parseAllowedPorts);
$("config-form").addEventListener("input", () => $("save-state").textContent = "演示配置有修改");
$("config-form").onsubmit = (event) => {
  event.preventDefault();
  const allowedPorts = validateConfigFields(true);
  if (!allowedPorts || !event.currentTarget.reportValidity()) return;
  state.config = {
    provider: { ...state.config.provider, api_url: $("provider-api").value.trim(), fetch_interval_seconds: numberValue("fetch-interval"), fetch_batch_size: numberValue("fetch-batch"), max_fetch_size: numberValue("fetch-max"), request_timeout_seconds: numberValue("provider-timeout") },
    pool: { minimum_ttl_seconds: numberValue("minimum-ttl"), expire_safety_seconds: numberValue("expire-safety"), max_failures: numberValue("max-failures"), max_concurrency_per_proxy: numberValue("max-concurrency") },
    server: { host: $("server-host").value.trim(), port: numberValue("server-port"), public_host: $("server-public-host").value.trim(), connect_timeout_seconds: numberValue("connect-timeout"), tunnel_idle_timeout_seconds: numberValue("idle-timeout"), max_connect_retries: numberValue("connect-retries"), allowed_ports: allowedPorts, allowed_hosts: $("allowed-hosts").value.split(/\n|,/).map((value) => value.trim()).filter(Boolean) },
    status: state.config.status,
    log_level: $("config-log-level").value,
  };
  renderLinks();
  $("save-state").textContent = "演示配置已应用到当前页面";
  toast("演示配置已保存（不会上传）");
};

$("add-account").onclick = () => {
  state.accounts = collectAccounts();
  state.accounts.push(newAccount());
  renderAccounts();
  $("account-save-state").textContent = "演示账号有修改";
};
$("account-list").onclick = (event) => {
  const deleteButton = event.target.closest("[data-delete-account]");
  if (deleteButton) {
    deleteButton.closest(".account-card").remove();
    state.accounts = collectAccounts();
    renderAccounts();
    $("account-save-state").textContent = "演示账号有修改";
    return;
  }
  const toggle = event.target.closest("[data-toggle-account-password]");
  if (toggle) {
    const input = toggle.parentElement.querySelector("input");
    input.type = input.type === "password" ? "text" : "password";
    toggle.textContent = input.type === "password" ? "显示" : "隐藏";
  }
};
$("account-list").addEventListener("input", (event) => {
  $("account-save-state").textContent = "演示账号有修改";
  const card = event.target.closest(".account-card");
  if (!card) return;
  card.querySelector(".account-card-head strong").textContent = card.querySelector('[data-account-field="name"]').value.trim() || "未命名账号";
  card.querySelector(".account-card-head small").textContent = card.querySelector('[data-account-field="username"]').value.trim() || "未设置用户名";
});
$("accounts-form").onsubmit = (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  state.accounts = collectAccounts();
  syncAccountUsage();
  renderAccounts();
  renderLinks();
  renderOverview();
  $("account-save-state").textContent = "演示账号已应用到当前页面";
  toast("演示账号已保存（不会上传）");
};
$("link-list").onclick = (event) => {
  const copyButton = event.target.closest("[data-copy-account]");
  if (copyButton) {
    const account = state.accounts.find((item) => item.id === copyButton.dataset.copyAccount);
    copyText(proxyUrl(account));
    return;
  }
  const usageButton = event.target.closest("[data-account-usage]");
  if (usageButton) showAccountUsage(usageButton.dataset.accountUsage);
};
["server-public-host", "server-port"].forEach((id) => $(id).addEventListener("input", () => {
  state.config.server.public_host = $("server-public-host").value.trim();
  state.config.server.port = numberValue("server-port");
  renderLinks();
}));

resetDemo(false);
state.timers.push(setInterval(tickCountdowns, 100), setInterval(addDemoEvent, 12000));
