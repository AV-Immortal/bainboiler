# SEO 基础设施

> 适用于 `apps/web` 项目，配套 `apps/web/src/lib/seo/` 实现。

## 概览

SEO 体系包含 4 块：

1. **站内元数据**：`buildMetadata()` 统一入口 + `buildPageTitle()` 辅助
2. **结构化数据**：`json-ld.tsx` 输出 Organization / WebSite / Product / Breadcrumb / FAQPage
3. **搜索引擎可见**：`sitemap.xml`（44 条）+ `robots.txt`
4. **主动推送**：`IndexNow`（Bing）+ `pingBaidu()`（百度普通收录 / 快速收录）

## 文件位置

```
apps/web/src/lib/seo/
├── build-metadata.ts   # 统一 metadata 生成（title / description / canonical / og）
├── json-ld.tsx         # 结构化数据（Schema.org JSON-LD）
├── indexnow.ts         # IndexNow 推送工具（Bing 实时收录）
├── baidu-push.ts       # 百度普通收录 / 快速收录 API 推送工具
└── __tests__/          # 单元测试

apps/web/src/app/
├── sitemap.ts          # 动态生成 sitemap.xml（44 条 URL）
└── robots.ts           # 动态生成 robots.txt

apps/web/src/components/
├── breadcrumb.tsx      # 可见面包屑 + BreadcrumbList JSON-LD
├── faq-section.tsx     # 可见 FAQ + FAQPage JSON-LD
└── seo-content.tsx     # 产品中心 / 解决方案 / 工程案例的 SEO 内容区
```

## 关键 API

### `buildMetadata(input)`

统一生成 Next.js `Metadata` 对象。

```ts
import { buildMetadata, buildPageTitle } from "@/lib/seo/build-metadata";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const page = await getDetail(locale, "products", slug);
  return buildMetadata({
    locale,
    pathname: `/products/${slug}`,
    title: buildPageTitle(locale, page.title),  // 自动拼接 " | BAIN BOILER"
    description: page.summary,
    ogImage: page.heroImageUrl,                  // 可选，自动回退到 /brand/og-default.webp
    ogType: "article",                           // 详情页用 article，列表页用 website
    publishedTime: "2026-08-07T00:00:00Z",       // 可选
  });
}
```

**自动处理的字段**：

- `title` — 拼接 `pageTitle | BAIN BOILER`，避免重复拼接
- `alternates.canonical` — 完整 URL（`{siteUrl}/{locale}{pathname}`）
- `alternates.languages` — 多语言版本（`zh-CN` / `en`）
- `openGraph` — `title` / `description` / `url` / `siteName` / `locale` / `type` / `images`
- `twitter` — `card` 自动选 `summary_large_image`（有图）或 `summary`（无图）

### `buildPageTitle(locale, pageTitle)`

辅助函数，自动处理：
- 空标题 → 返回品牌名
- 标题已包含品牌名 → 不重复拼接
- 标题只有单词 → 自动拼 ` | BAIN BOILER`

### 结构化数据（JSON-LD）

5 种结构化数据，覆盖 Google 搜索富媒体结果需求：

| 类型 | 用途 | 输出位置 |
|---|---|---|
| `Organization` + `WebSite` | 站点级，每页都有 | `app/layout.tsx` |
| `BreadcrumbList` | 面包屑，详情页/分类页 | `<Breadcrumb />` 组件内 |
| `Product` + `Brand` | 产品详情页 | `app/[locale]/products/[slug]/page.tsx` |
| `FAQPage` | FAQ 富媒体 | `<FaqSection />` 组件内 |

**为什么必须有 `manufacturer.@id` 关联**：让 Google 知道 `Product.brand` 和 `Organization` 是同一个实体，搜索结果能展示品牌信息卡。

### `sitemap.xml`

`app/sitemap.ts` 动态生成，包含：

- 11 个核心页（首页 + 5 个 list + 5 个 static）× 2 语言 = 22 条
- 11 个产品详情页 × 2 语言 = 22 条
- **共 44 条**

`robots.txt` 允许所有爬虫（生产环境可考虑屏蔽 `/studio`）。

### `IndexNow` 推送

> Bing 实时收录，新内容发布后**几分钟内**被 Bing 抓取。

```ts
import { pingIndexNow } from "@/lib/seo/indexnow";

// 发布新内容后
await pingIndexNow([
  "https://www.bainboiler.com/zh/products/new-boiler",
  "https://www.bainboiler.com/en/products/new-boiler",
]);
```

**配置**：
- `apps/web/public/{INDEXNOW_KEY}.txt` 文件已部署
- `INDEXNOW_KEY` 已经在 `indexnow.ts` 里硬编码（key 必须公开，对应 URL 才是私有）

**接 Sanity webhook**：
- 在 Sanity 后台 → API → Webhooks → Create webhook
- 触发器：`_type in ["product", "solution", "project", "article"] && operation == "create" || "update"`
- URL：`/api/seo/ping-indexnow`（待建）
- Webhook handler 里调 `pingIndexNow([newDocUrl])`

### `pingBaidu()` 推送

> 百度普通收录 / 快速收录 API 推送。

```ts
import { pingBaidu } from "@/lib/seo/baidu-push";

const res = await pingBaidu([
  "https://www.bainboiler.com/zh/products/new-boiler",
]);
// res: { ok, status, success, remain, notSameSite, raw }
```

**配置**：
- `apps/web/.env.local` 里有 `BAIDU_PUSH_TOKEN`（不入 git）
- `apps/web/.env.local.example` 提供了模板

**配额限制**：

| 账号等级 | 普通收录配额 | 快速收录配额 |
|---|---|---|
| 新站 / 普通 | ~10 条/天 | 无权限（需申请）|
| 中级 | ~100 条/天 | 几千条/天（需申请）|
| 高级 | 几千条/天 | 几千条/天 |

**超额**会返回 `{error: 400, message: "over quota"}`，函数返回 `ok: false`，**不抛异常**。

**接 Sanity webhook**：
- 申请"快速收录"权限后（百度搜索资源平台 → 链接提交 → 申请），改成 `pingBaidu()` 调速：
  ```ts
  // 节流到 1 次/天，避免超额
  if (shouldPingToday) await pingBaidu(urls);
  ```

## 三大平台验证状态（2026-08-07）

| 平台 | 状态 | 凭证 |
|---|---|---|
| Bing Webmaster | ✅ 已验证 | `metadata.other.msvalidate.01` = `1269BD0D5E03E312A0ABFB4F3C305A62` |
| IndexNow | ✅ 已推送 44 URL | key `1759e2091f7a4d06ac98b15090231785`，文件 `public/{key}.txt` |
| 百度站长平台 | ✅ 文件验证通过 | `public/baidu_verify_codeva-ezFGSuNrWK.html`（**不要删**）|
| 百度普通收录 API | ⚠️ 配额用完 | `BAIDU_PUSH_TOKEN` = `lUoKWfVxbHCKVUcH` |
| Google Search Console | ⏳ 待办 | 需要时发 tag |

## 已知坑

- **Next.js middleware 把根域 307 重定向到 `/en`**，导致 HTML meta tag 验证器在 307 响应里读不到 tag → **优先用文件验证**
- **`buildPageTitle` 必须去重**：`metadata.title` 不要再手工加 `| BAIN BOILER`，否则会重复
- **`Dockerfile.web` 默认 `ARG` 会盖掉 `.env`**：`docker-compose.yml` 的 `web.build.args` 必须显式传 `NEXT_PUBLIC_*` 变量
- **百度对工业 B2B 站收录慢**：前 1-2 个月收录率 30% 算正常，靠时间 + 外链提升

## 待办

- [ ] 接 Sanity webhook → 自动 `pingIndexNow()` + `pingBaidu()`
- [ ] 申请百度"快速收录"权限
- [ ] 接 Google Search Console + 提交 sitemap
- [ ] 详情页 fallback 文案 → 接真实 Sanity 详情数据后整段替换
- [ ] sitemap 加 `<lastmod>` 字段（基于 Sanity publish 时间）
- [ ] 详情页加 `<video>` JSON-LD（如有视频）
- [ ] robots.txt 屏蔽 `/studio` 和 `/api`
