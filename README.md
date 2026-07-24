# bainboiler

双语企业官网与内容后台单仓库，包含面向访客的 `Next.js` 网站和面向编辑的 `Sanity` Studio。

默认部署目标为 `Ubuntu` 服务器，建议使用香港的 `Ubuntu 22.04 LTS` 主机。

## 应用

- `apps/web`: 双语企业官网，使用 `Next.js App Router` + Sanity Client
- `apps/studio`: 内容后台，使用 `Sanity Studio v3`（可在本地 `npx sanity dev` 启动，或部署到 `*.sanity.studio`）

## 环境变量

### Web

复制 `apps/web/.env.example` 到 `apps/web/.env.local`，并设置：

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity 项目 ID
- `NEXT_PUBLIC_SANITY_DATASET`: 默认 `production`
- `NEXT_PUBLIC_SANITY_API_VERSION`: 默认 `2025-01-01`
- `SANITY_API_READ_TOKEN`: （可选）仅服务端用
- `NEXT_PUBLIC_SITE_URL`: 站点对外访问地址，例如 `https://www.bainboiler.com`

### Studio

复制 `apps/studio/.env.example` 到 `apps/studio/.env`，并设置：

- `SANITY_STUDIO_PROJECT_ID`: 同 Web 的 Project ID
- `SANITY_STUDIO_DATASET`: 默认 `production`

## 常用命令

### 本地开发
- 安装依赖：`npm install`
- 启动网站：`npm run dev:web`
- 启动 Studio：`npm run dev:studio`
- 运行网站测试：`npm run test:web`
- 构建网站：`npm run build:web`
- 构建 Studio：`npm run build:studio`

### Docker 镜像
- 一次性构建两个镜像：`npm run docker:build`
- 只构建 web：`npm run docker:build:web`
- 只构建 studio：`npm run docker:build:studio`
- 启动（后台）：`npm run docker:up`
- 查看日志：`npm run docker:logs`
- 停止：`npm run docker:down`

## 部署

部署说明见 `docs/deployment.md`。
