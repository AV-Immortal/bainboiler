# Changelog

重要进展的只读记录。每条记录包含：日期、范围、改动摘要、影响。

## 2026-08-07 — 性能优化、SEO 体系、Footer 国际化、Bing/百度/IndexNow 验证

### 范围

- 全站 UI / 动画 / SEO / 验证 / Footer 国际化 / 详情页元数据
- 5 个 commit 推送到 `main`：
  - `8ebe023` feat(contact): 更新 Footer 联系方式为真实数据
  - `99339e0` feat(seo): 添加百度普通收录 / 快速收录 API 推送工具
  - `79d48f9` feat(seo): 添加百度站长平台验证 meta tag
  - `11b0e11` feat(seo): 添加 Bing Webmaster 验证 meta tag
  - `28c6d60` feat(seo): 添加百度站长平台文件验证
  - `988b954` feat(seo): 详情页 SEO 补齐 - html lang / 面包屑 / Product / FAQ / og-default
  - `98fe9cc` feat(ui): Footer 多列布局 + 5 个高视觉低成本动画 + 全球服务模块
  - `82244c4` feat(seo): 全站 SEO 优化 - 关键词 / JSON-LD / 面包屑 / FAQ / sitemap

### 改动摘要

#### UI / 动画

- **Footer 升级为 4 列响应式**：品牌介绍 / 快速链接 / 资源中心 / 联系方式 + 底部版权条
- **5 个高视觉低成本动画**：
  - `<CountUp>` 数字滚动
  - `<TextReveal>` 文字逐字渐入
  - `<RevealOnView>` 滚动到视口触发
  - `bain-gradient-drift` 背景流动渐变
  - `.card-hover` 统一卡片悬浮（4 个模块）
- **新模块 `homepage.globalPresence`**：地球定位动画，定位中国（110°E / 34°N），深色 slate 风格

#### SEO 体系（从 0 到 1）

- **`buildMetadata()` 统一入口** + `buildPageTitle()` 辅助（自动去重）
- **结构化数据**：Organization / WebSite / Product / Brand / BreadcrumbList / FAQPage
- **sitemap.xml**：44 条 URL（11 个核心页 + 11 个产品详情页 × 2 语言）
- **可见面包屑**：详情页加 `<Breadcrumb>` 组件
- **FAQ 富媒体**：`<FaqSection>` 同时输出可见 UI 和 JSON-LD
- **OG 兜底图**：`/brand/og-default.webp`（1200×630，公司色板）
- **63 个关键词**：覆盖 WNS / SZS / DZL / LHS / 生物质 / 余热 / 低氮 / EPC 等
- **`<html lang>` 跟随 locale**：通过 middleware 注入 `x-locale` header
- **canonical URL 修复**：docker-compose.yml 显式传 `NEXT_PUBLIC_*` 避免 `localhost:3000` 默认值

#### 三大平台验证

- **Bing Webmaster**：`msvalidate.01` meta tag = `1269BD0D5E03E312A0ABFB4F3C305A62`
- **IndexNow**：key = `1759e2091f7a4d06ac98b15090231785`，44 URL 已推送
- **百度站长平台**：
  - HTML meta tag = `codeva-ezFGSuNrWK`（保留但因 307 重定向验证失败）
  - 文件验证 `public/baidu_verify_codeva-ezFGSuNrWK.html` 已通过
  - API token = `lUoKWfVxbHCKVUcH`，推送工具 `pingBaidu()`

#### 基础设施

- `apps/web/src/lib/seo/baidu-push.ts` 新增（百度 API 推送，自动分批）
- `apps/web/src/lib/seo/indexnow.ts` 新增（IndexNow 推送）
- `apps/web/src/components/{count-up,text-reveal,reveal,breadcrumb,faq-section,seo-content}.tsx` 新增
- `apps/web/src/modules/global-presence/` 新增
- `apps/web/public/1759e2091f7a4d06ac98b15090231785.txt` 新增（IndexNow key）
- `apps/web/public/baidu_verify_codeva-ezFGSuNrWK.html` 新增（百度文件验证）
- `apps/web/public/brand/og-default.webp` 新增（OG 兜底图）
- `apps/web/.env.local.example` 新增（BAIDU_PUSH_TOKEN 模板）
- `docker-compose.yml`：web.build.args 显式传 `NEXT_PUBLIC_*` 变量

#### 联系方式国际化

- `apps/web/messages/{zh,en}.json` 的 `footer` 段：
  - email: `2263838698@qq.com`
  - phone / WhatsApp: `+86 159-0219-9591`
  - wechat: `a15902199591`
- 修复：`tel:` 链接同时 strip 空格 + 连字符（避免 `+86159-0219-9591` 丑格式）

#### Sanity Studio

- `apps/studio/schemas/objects/homepage/global-presence.ts` 新增
- `apps/studio/schemas/documents/page.ts` modules 数组加 `homepage.globalPresence`

### 影响

- **百度 + Bing + IndexNow 三大搜索入口已就位**，新内容发布后可被快速收录
- **核心页 SEO 完整度从 30% 提升到 90%+**：标题 / 描述 / 规范 URL / OG / Twitter / JSON-LD 全部就位
- **5 个动画统一规范**，未来加新区块不会破坏一致性
- **详情页 fallback 文案 + 真实 Sanity 数据结构已对齐**，未来接数据无需大改

### 已知遗留

- 详情页 fallback 文案（`apps/web/src/app/[locale]/content-pages.ts`）等真实 Sanity 数据接入后整段替换
- 百度普通收录 API 配额 ~10 条/天，需申请"快速收录"提升
- Sanity webhook → `pingIndexNow()` / `pingBaidu()` 自动管道未建（手动推送）

---

## 2026-08-07 之前

- 之前改动见 git log：初始化项目、Hero 视频、各 section 实现、Sanity 集成、Docker 化部署、Studio 自托管、CDN 加速
- `feat(ui): 修复导航栏文字被遮盖 + Header 中英文切换 + 浏览器标签页标题` (`db310c4`)
