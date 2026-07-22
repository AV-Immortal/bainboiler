# bainboiler

双语企业官网与内容后台单仓库，包含面向访客的 `Next.js` 网站和面向编辑的 `Strapi` CMS。

默认部署目标为 `Ubuntu` 服务器，建议使用香港的 `Ubuntu 22.04 LTS` 主机。

## 应用

- `apps/web`: 双语企业官网，使用 `Next.js App Router`
- `apps/cms`: 内容后台，使用 `Strapi`

## 环境变量

### Web

复制 `apps/web/.env.example` 到 `apps/web/.env.local`，并设置：

- `CMS_BASE_URL`: CMS API 地址，例如 `http://localhost:1337`
- `NEXT_PUBLIC_SITE_URL`: 站点对外访问地址，例如 `https://www.bainboiler.com`

## 常用命令

- 安装依赖：`npm install`
- 启动网站：`npm run dev:web`
- 启动 CMS：`npm run dev:cms`
- 运行网站测试：`npm run test:web`
- 构建网站：`npm run build:web`
- 构建 CMS：`npm run build:cms`

## 部署

部署说明见 `docs/deployment.md`。
