# Deployment

## 概览

当前项目目标部署环境为 `Ubuntu` 服务器，推荐放在香港机房或香港云主机上。

项目包含两个独立应用：

- `apps/web`: 对外官网，建议部署在 `www.bainboiler.com`
- `apps/cms`: 内容后台，建议部署在 `cms.bainboiler.com`

建议采用以下部署结构：

- `Ubuntu 22.04 LTS`
- `Node.js 20 LTS`
- `Nginx` 作为反向代理
- `PM2` 或 `systemd` 作为 Node 进程守护
- `HTTPS` 证书用于主站和 CMS 子域名

两者都应启用 HTTPS，并让 `apps/web` 通过 `CMS_BASE_URL` 访问 CMS。

## Ubuntu 基础准备

### 系统依赖

推荐先安装：

- `curl`
- `git`
- `build-essential`
- `python3`
- `nginx`

示例命令：

```bash
sudo apt update
sudo apt install -y curl git build-essential python3 nginx
```

### Node.js

推荐使用 `Node.js 20 LTS`。

示例命令：

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

## 代码部署

### 拉取项目

```bash
cd /var/www
sudo git clone <your-repository-url> bainboiler
sudo chown -R $USER:$USER /var/www/bainboiler
cd /var/www/bainboiler
```

### 安装依赖

```bash
npm install
```

如果后续 `Strapi` 的 `better-sqlite3` 或其他原生依赖编译失败，优先检查 `build-essential`、`python3`、Node 版本是否完整。

## Web 部署

### 必需环境变量

在 `apps/web/.env.production` 中至少配置：

```env
CMS_BASE_URL=https://cms.bainboiler.com
NEXT_PUBLIC_SITE_URL=https://www.bainboiler.com
```

### 构建与启动

```bash
npm run build:web
npm run start --workspace web
```

如果需要固定端口启动，建议后续补充 `start` 命令参数，例如：

```bash
npm run start --workspace web -- --hostname 127.0.0.1 --port 3000
```

## CMS 部署

### 必需环境变量

建议在 `apps/cms/.env` 中至少配置数据库、密钥与后台地址。首期如果使用 SQLite，也建议先把关键密钥固定下来，不要用临时值。

### 构建与启动

```bash
npm run build:cms
npm run start --workspace cms
```

建议让 CMS 仅监听内网地址或本机地址，再由 `Nginx` 反代出去。

## 自动化部署与更新

为了让你以后每次更新代码都能“一键极速部署”，我们已经在项目根目录配置了 `deploy.sh` 脚本和 `ecosystem.config.js` 文件。

### 初始化服务器

在 Ubuntu 服务器上首次拉取代码并安装好 Node.js 和 PM2 后：

```bash
# 全局安装 pm2
npm install -g pm2

# 给脚本增加执行权限
chmod +x deploy.sh

# 执行首次部署
./deploy.sh

# 让 PM2 开机自启
pm2 startup
pm2 save
```

### 日常更新流程

以后你在本地写好代码并 `git push` 之后，只需要在服务器上运行：

```bash
cd /var/www/bainboiler
./deploy.sh
```

这个脚本会自动完成：
1. `git pull` 拉取最新代码
2. `npm ci` 全新安装依赖
3. 重新构建 Web 前端和 CMS 后台
4. 使用 `pm2 reload` 实现 0 宕机时间平滑重启

如果你希望完全自动化，可以在 GitHub 仓库里配置 Webhook 或者 GitHub Actions，在每次 push main 分支时通过 SSH 自动执行服务器上的 `./deploy.sh`。

## Nginx 反向代理

建议：

- `www.bainboiler.com` -> `127.0.0.1:3000`
- `cms.bainboiler.com` -> CMS 监听端口

主站示例：

```nginx
server {
    server_name www.bainboiler.com bainboiler.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## HTTPS

推荐使用 `Certbot` 签发证书。

示例：

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d bainboiler.com -d www.bainboiler.com -d cms.bainboiler.com
```

## 上线检查

- 确认服务器为 `Ubuntu 22.04` 或兼容版本
- 确认 `Node.js 20 LTS` 已安装
- 确认 `NEXT_PUBLIC_SITE_URL` 指向生产域名
- 确认 `CMS_BASE_URL` 指向可访问的 CMS 域名
- 确认首页和核心栏目页可正常返回 `200`
- 确认中英文路径都输出正确 `canonical` 与 `alternate metadata`
- 确认 `Nginx`、`PM2/systemd`、HTTPS 证书都已生效
