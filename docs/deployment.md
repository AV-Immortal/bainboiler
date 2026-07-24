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
