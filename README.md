# bainboiler

双语企业官网与内容后台单仓库，包含面向访客的 `Next.js` 网站和面向编辑的 `Sanity` Studio。

默认部署目标为 `Ubuntu` 服务器，建议使用香港的 `Ubuntu 22.04 LTS` 主机。

- **生产域名**：[https://www.bainboiler.com](https://www.bainboiler.com)
- **CMS 后台**：[https://studio.bainboiler.com/studio](https://studio.bainboiler.com/studio)（CDN 加速：腾讯云）
- **GitHub 仓库**：[AV-Immortal/bainboiler](https://github.com/AV-Immortal/bainboiler)（仅开发仓库，**未开启自动部署到 ACR**）

## 应用

- `apps/web`: 双语企业官网，使用 `Next.js App Router` + Sanity Client
- `apps/studio`: 内容后台，使用 `Sanity Studio v3`（已部署到自托管 `studio.bainboiler.com`）

## 环境变量

### Web

复制 `apps/web/.env.example` 到 `apps/web/.env.local`，并设置：

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity 项目 ID
- `NEXT_PUBLIC_SANITY_DATASET`: 默认 `production`
- `NEXT_PUBLIC_SANITY_API_VERSION`: 默认 `2025-01-01`
- `SANITY_API_READ_TOKEN`: （可选）仅服务端用
- `NEXT_PUBLIC_SITE_URL`: 站点对外访问地址，例如 `https://www.bainboiler.com`
- `BAIDU_PUSH_TOKEN`: （可选）百度普通收录 / 快速收录 API token，从百度搜索资源平台获取

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

## 关键文档索引

| 文档 | 用途 |
|---|---|
| [docs/deployment.md](docs/deployment.md) | Docker / PM2 两种部署方式 + Nginx 反代 + HTTPS + SEO 平台 |
| [docs/STYLE-GUIDE.md](docs/STYLE-GUIDE.md) | 编码规范：目录组织、TypeScript、动画、card-hover |
| [docs/SEO.md](docs/SEO.md) | SEO 基础设施：sitemap / JSON-LD / IndexNow / Baidu / sitemap.xml |
| [docs/ASSET-LIBRARY.md](docs/ASSET-LIBRARY.md) | 图片 / 视频资源清单 |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | 贡献流程与 PR 规范 |
| [SANITY_CMS_USAGE.md](SANITY_CMS_USAGE.md) | 给内容编辑看的 CMS 使用说明（不改代码） |
| [CHANGELOG.md](CHANGELOG.md) | 重要进展记录 |

## 当前状态（2026-08-07）

### ✅ 已完成

- **Footer**：4 列响应式（品牌 / 快速链接 / 资源中心 / 联系方式），联系信息从 `messages/{zh,en}.json` 读取
- **5 个高视觉低成本动画**：
  - `<CountUp>` 数字滚动（品牌数据）
  - `<TextReveal>` 文字逐字渐入（Hero 标题）
  - `<RevealOnView>` 滚动到视口触发（每个 section 进场）
  - `bain-gradient-drift` 背景流动渐变（Hero）
  - `card-hover` 卡片悬浮放大（4 个模块统一）
- **地球定位动画**：`<GlobalPresence>` 模块带 SVG 地球 + 中国定位脉冲（dark/slate 风格）
- **详情页 SEO**：`<html lang>` 跟随 locale，Organization/WebSite/Product/BreadcrumbList/FAQPage JSON-LD
- **页面 SEO**：sitemap.xml（44 条）、可见面包屑、FAQ 结构化数据、og-default 兜底图（1200×630）
- **元数据**：`buildMetadata()` 统一入口 + `buildPageTitle()` 辅助 + 63 个关键词
- **三大 SEO 平台验证**：
  - Bing Webmaster（`msvalidate.01` meta tag）
  - IndexNow（key file + API 推送 44 个 URL）
  - 百度站长平台（`baidu_verify_*.html` 文件验证）

### 🚧 已知限制

- 详情页 fallback 文案（CMS 数据缺失时显示的占位内容）
- 百度普通收录 API 配额受限（~10 条/天），需申请"快速收录"提升
- Sanity 详情页只渲染 fallback，未接真实 Sanity 详情数据（已写好 mapper 等接数据）
- GitHub → ACR 自动部署 workflow 已手动禁用（避免 OOM 重建），更新需本地构建推送

### 📊 资源占用（2 核 4G 服务器）

- Docker 镜像：`bainboiler/web` ~150MB / `bainboiler/studio` ~250MB
- 运行时内存：web ~300MB / studio ~200MB
- 磁盘：构建缓存会膨胀到 30+GB，**定期 `docker builder prune -af`** 释放（2026-08 释放 36.15GB）
- 构建时间：~3-4 分钟（受限于 5 分钟硬上限）
- Trae IDE 进程吃内存严重，**构建时建议关闭 IDE** 避免 OOM kill
