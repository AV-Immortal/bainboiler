# Deployment

## 概览

当前项目支持两种部署方式：

1. **传统 PM2 方式**（在 Ubuntu 服务器上直接跑 Node 进程）
2. **Docker 容器化方式**（推荐用于云服务器 / CI/CD / 镜像仓库分发）

CMS 数据存放在 Sanity Content Lake（云服务），不需要自托管数据库或后端进程。

### 项目结构

- `apps/web`: 对外官网，部署在 `www.bainboiler.com`
- `apps/studio`: 内容后台，可部署到 `*.sanity.studio` 或自托管

建议基础环境：

- `Ubuntu 22.04 LTS`
- `Node.js 20 LTS`（仅传统 PM2 方式需要）
- `Nginx` 作为反向代理
- `HTTPS` 证书
- **Docker 方式需要 `Docker 24+` 和 `docker compose v2`**

---

## 方式一：Docker 部署（推荐）

### 1. 准备环境

```bash
# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# 验证
docker --version
docker compose version
```

### 2. 配置环境变量

```bash
cd /var/www/bainboiler
cp .env.example .env
# 编辑 .env 填入真实 Sanity 凭据
nano .env
```

`.env` 内容示例：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=                  # 可选
NEXT_PUBLIC_SITE_URL=https://www.bainboiler.com
WEB_PORT=3000
```

### 3. 构建并启动

```bash
# 一次性构建 + 后台启动
docker compose up -d --build

# 查看状态
docker compose ps

# 跟踪日志
docker compose logs -f web
```

镜像尺寸参考：

| 镜像 | 大小 | 内容 |
|---|---|---|
| `bainboiler/web` | ~150MB | Next.js standalone + node:20-alpine |
| `bainboiler/studio` | ~250MB | Sanity Studio dist + node:20-alpine |

### 4. 日常更新

```bash
cd /var/www/bainboiler
git pull
docker compose up -d --build
```

`--build` 会重新构建改变的层；`up -d` 会平滑重启容器。

### 5. 单独操作

```bash
# 只重启 web
docker compose restart web

# 只看 studio 日志
docker compose logs -f studio

# 停止全部
docker compose down

# 清理悬空镜像
docker image prune -f
```

### 6. Nginx 反代（Docker 方式）

Nginx 跑在宿主机上，代理到 `127.0.0.1:3000`（web 容器）和 `127.0.0.1:3333`（studio 容器，如果暴露了端口）：

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

# 可选：自托管 Studio（去掉 docker-compose.yml 里 studio.ports 的注释后）
server {
    server_name studio.bainboiler.com;

    location / {
        proxy_pass http://127.0.0.1:3333;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### 7. 推送到镜像仓库（可选）

```bash
# 登录
docker login registry.example.com

# 打 tag
docker tag bainboiler/web:latest registry.example.com/bainboiler/web:v1.0.0
docker tag bainboiler/studio:latest registry.example.com/bainboiler/studio:v1.0.0

# 推送
docker push registry.example.com/bainboiler/web:v1.0.0
docker push registry.example.com/bainboiler/studio:v1.0.0
```

服务器上 `docker compose pull && docker compose up -d` 即可拉新版本。

---

## 方式二：传统 PM2 部署

### Ubuntu 基础准备

```bash
sudo apt update
sudo apt install -y curl git build-essential python3 nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

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

> 用 `--legacy-peer-deps --omit=optional` 可避免 rolldown 等原生 binding 卡死：
> `npm install --legacy-peer-deps --omit=optional`

## Web 部署

### 必需环境变量

在 `apps/web/.env.production` 中：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=<optional>
NEXT_PUBLIC_SITE_URL=https://www.bainboiler.com
```

### 构建与启动

```bash
npm run build:web
npm run start --workspace web
```

固定端口：

```bash
npm run start --workspace web -- --hostname 127.0.0.1 --port 3000
```

## Studio 部署

### 本地启动（开发）

```bash
cd apps/studio
npx sanity dev
# → http://localhost:3333
```

### 部署到 Sanity 官方托管（推荐）

```bash
cd apps/studio
npx sanity deploy
# → https://<project>.sanity.studio
```

### PM2 自托管（如果不想用 Sanity 官方）

```bash
cd apps/studio
npm run build
pm2 start "npx sanity start --port 3333 --host 0.0.0.0" --name bainboiler-studio
```

## 自动化部署（PM2 方式）

`deploy.sh` 和 `ecosystem.config.js` 用于传统方式。

### 初始化服务器

```bash
npm install -g pm2
chmod +x deploy.sh
./deploy.sh
pm2 startup
pm2 save
```

### 日常更新

```bash
cd /var/www/bainboiler
./deploy.sh
```

## HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d bainboiler.com -d www.bainboiler.com
```

## 上线检查

- 确认 `NEXT_PUBLIC_SANITY_PROJECT_ID` 已配置（未配置也能跑，但首页用 fallback）
- 确认 `NEXT_PUBLIC_SITE_URL` 指向生产域名
- 确认首页和核心栏目页可正常返回 `200`
- 确认中英文路径都输出正确 `canonical` 与 `alternate metadata`
- Docker 方式：`docker compose ps` 显示两个服务都是 `healthy`
- 传统方式：`pm2 list` 显示 web 进程 `online`

---

## 上线后 SEO 平台验证（生产环境一次性配置）

详见 [docs/SEO.md](./SEO.md)，此处只列关键节点：

| 平台 | 验证方式 | 提交入口 |
|---|---|---|
| Bing Webmaster | HTML meta tag（`msvalidate.01`）| 自动通过 tag 验证，无需手动 |
| IndexNow | key file + API | 发布后调 `pingIndexNow()` 推送新 URL |
| 百度站长平台 | HTML 文件（`baidu_verify_*.html`）| 文件验证通过后，提交 sitemap / 用 API 推 URL |
| Google Search Console | HTML meta tag（`google-site-verification`）| 同 Bing 流程 |

> **已知坑**：Next.js middleware 把根域 307 重定向到 `/en`，**百度 / Bing 的 HTML meta tag 验证可能失败**（307 响应 body 为空）。SEO 平台验证优先选**文件验证**或**CNAME 验证**，最稳。

### Docker 部署常见坑

- **构建超时（5min 硬上限）**：服务器 2 核 4G 限制，必须命中缓存层。`Dockerfile.web` 不可加 `RUN find / -delete` 等破坏缓存命令。
- **canonical URL 指向 localhost**：默认 `Dockerfile.web` 里 `NEXT_PUBLIC_SITE_URL` 的 `ARG` 默认值是 `http://localhost:3000`，如果 `docker-compose.yml` 的 `web.build.args` 没显式传，会盖掉 `.env` 里的值。**必须**在 `docker-compose.yml` 的 `web.build.args` 里显式传：

  ```yaml
  web:
    build:
      context: .
      dockerfile: Dockerfile.web
      args:
        NEXT_PUBLIC_SITE_URL: ${NEXT_PUBLIC_SITE_URL:-https://www.bainboiler.com}
        NEXT_PUBLIC_SANITY_PROJECT_ID: ${NEXT_PUBLIC_SANITY_PROJECT_ID}
        NEXT_PUBLIC_SANITY_DATASET: ${NEXT_PUBLIC_SANITY_DATASET:-production}
        NEXT_PUBLIC_SANITY_API_VERSION: ${NEXT_PUBLIC_SANITY_API_VERSION:-2025-01-01}
  ```

  不传会导致 `canonical` / `og:url` / `<html lang>` 等 SEO 关键字段全部指向本地。
- **磁盘空间**：Docker 构建缓存会膨胀到 30+GB，**定期 `docker builder prune -af`** 释放。
- **Trae IDE 吃内存**：构建时建议关闭 IDE，否则 Docker 构建可能 OOM kill。
