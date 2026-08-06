# Sanity Studio 使用说明

> **CMS 入口**：<https://studio.bainboiler.com/studio>
>
> 用创建 Sanity project 时那个账号登录。改完点右上角 **「Publish」**，**等 60 秒**，前端自动刷新。

---

## 🚨 重要前提

**改任何东西之前，先看**：

| 问题 | 答案 |
|---|---|
| 我要改的内容，**前端有显示吗**？ | **查下表**（下面 7 个 Content 入口） |
| 我改后**没看到前端变化**？ | 大概率是该字段前端**没接**（schema 配了但 React 组件不用）—— 看下面"⚠️ 注意" |
| 想改 logo/电话/邮箱/公司名？ | **CMS 改不了**——这些是硬编码，要改代码 |
| 我想看现在的内容？ | 改完后**等 60 秒** + 浏览器**强刷**（Ctrl+Shift+R）|

---

## 📋 Content 7 个类型 → 前端对应关系

### 1. 📄 **Page**（最重要）
- **导航位置**：Content → Page
- **当前有 1 个文档**：`home`（slug = `home`，对应**首页 `/`**）
- **前端对应**：整张首页（`bainboiler.com/zh`）
- **打开后**：
  - `title` / `slug` / `seo` 三个字段
  - **`modules` 数组**（**核心**）：拖拽决定首页 10 个区块的**顺序**
  - 点 `+ Add item` 加新模块（9 种类型，下面会讲）
- **SEO**：`seo.title.zh` = 浏览器标签标题，`seo.description.zh` = 搜索结果描述
- **改完注意**：modules 数组里**展开每个 module 才能改字段**

---

### 2. 🛒 **Product**（产品）
- **导航位置**：Content → Product
- **前端对应**：`bainboiler.com/zh/products`（产品**列表**）
- **每个文档**：一个产品
- **list 卡片显示**：`title.zh` + `summary.zh`
- **不显示但 schema 有**：`specs` / `highlights` / `gallery` / `videoUrl` / `heroImage` / `seo`（**前端 list 页不用**）
- **详情页**：`/products/[slug]` 走硬编码文案（**不查 CMS**），改详情页要改代码

---

### 3. 🏭 **Project**（项目案例）
- **导航位置**：Content → Project
- **前端对应**：`bainboiler.com/zh/projects`（项目**列表**）
- **每个文档**：一个项目案例
- **list 卡片显示**：`title.zh` + `summary.zh`
- **不显示**：`country` / `industry` / `boilerType` / `resultHighlights` / `heroImage` / `gallery` / `seo`
- **⚠️ 没有详情页**（`/projects/[slug]` 不存在），点列表卡片**会 404**

---

### 4. 💡 **Solution**（行业方案）
- **导航位置**：Content → Solution
- **前端对应**：`bainboiler.com/zh/solutions`
- **list 卡片显示**：`title.zh` + `summary.zh`
- **不显示**：`painPoints` / `recommendedProducts` / `caseStudySummary` / `heroImage` / `gallery` / `seo`
- **⚠️ 没有详情页**

---

### 5. 📰 **Article**（新闻/洞察）
- **导航位置**：Content → Article
- **前端对应**：`bainboiler.com/zh/news`
- **list 卡片显示**：`title.zh` + `summary.zh`
- **不显示**：`category` / `excerpt` / `content`（**PortableText 还没渲染器**） / `heroImage` / `gallery`
- **⚠️ 没有详情页**

---

### 6. 📥 **Download**（下载资料）
- **导航位置**：Content → Download
- **前端对应**：`bainboiler.com/zh/downloads`
- **list 卡片显示**：`title.zh` + `summary.zh`
- **不显示**：`file`（**下载链接没有！**） / `category` / `seo`
- **⚠️ 现在 list 卡片没下载按钮**——加了文档后只是显示标题+描述

---

### 7. 🎬 **Video**（视频）
- **导航位置**：Content → Video
- **前端对应**：`bainboiler.com/zh/videos`
- **list 卡片显示**：`title.zh` + `summary.zh`
- **不显示**：`coverImage` / `videoUrl` / `category` / `featuredOnHomepage`（**首页 featured video 不查这个**）
- **⚠️ 没有详情页**

---

### 8. ⚙️ **Site Setting**（全站配置）
- **导航位置**：Content → Site Setting
- **字段**：`siteName` / `defaultLocale` / `contactEmail` / `contactPhone` / `whatsApp` / `wechat`
- **⚠️ 全站不用**——Header / Footer / Contact 页都是硬编码 "BAIN BOILER" 和写死的电话邮箱
- **改这里不会变**！要改联系信息要找开发者改代码

---

## 🧩 Page 文档的 9 个 Module（首页区块）

> **位置**：打开 `Page` 文档 → `home` → 展开 `modules` 数组
> **加新区块**：`modules` 数组点 `+ Add item` → 选 9 种之一

### 1. `homepage.heroVideo`（首页最上面那个大图区）
- **对应前端**：首页第一屏
- **字段**：
  - `eyebrow` — 小字（**前端不用**，写死 "BAIN BOILER"）
  - `headline.zh/en` — **主标题**（大标题）
  - `subheadline.zh/en` — **副标题**
  - `primaryCta.zh/en` — 第一个按钮文字
  - `primaryCtaHref` — 第一个按钮链接（**前端不用**，写死跳 contact）
  - `secondaryCta.zh/en` — 第二个按钮文字
  - `secondaryCtaHref` — 第二个按钮链接（**前端不用**，写死跳 #featured-video）
  - `videoUrl` — 背景视频 URL（留空就用纯色背景）
  - `poster` — 视频封面
  - `backgroundType` — **`color` / `gradient` / `image` 三选一**（控制背景）
  - `backgroundColor` — 纯色背景（如 `#0F3460`）
  - `backgroundGradient` — 渐变（`from` + `to` 两个颜色）
  - `backgroundImage` — 图片背景
  - `backgroundOverlayOpacity` — 0-100（图片背景上加黑色遮罩的透明度）
- **怎么改 hero 背景**：
  1. 找到 `backgroundType` 字段
  2. 选 `image`
  3. `backgroundImage` 点上传图片
  4. 改 `backgroundOverlayOpacity` 调遮罩深度
  5. Publish → 60 秒后生效

### 2. `homepage.brandStats`（数字区：30+ / 12 / 24H / 100%）
- **字段**：`items[]`（`label` + `value`），每个数字一对
- **改数字**：直接改 `items` 数组里每项的 `value`（数字）和 `label`（说明文字）

### 3. `homepage.companyIntro`（"以制造能力为基础" 那一块）
- **字段**：`eyebrow` / `title` / `description` / `highlights[]`（带数字的小块）

### 4. `homepage.productCategories`（"一体化" 那一块）
- 4 个分类卡片

### 5. `homepage.industrySolutions`（行业方案区）

### 6. `homepage.projectShowcase`（项目展示）

### 7. `homepage.certificatesExport`（"证书与出口"）

### 8. `homepage.featuredVideo`（首页中段的视频块）

### 9. `homepage.contactCta`（"立即询盘" 那一块）

---

## 🔧 怎么改首页某个模块

**示例**：把 hero 区的"30+ 出口市场"改成"50+ 出口市场"

1. 打开 <https://studio.bainboiler.com/studio>
2. 左导航点 **「Page」**
3. 打开 **`home`** 文档
4. 找到 **`modules` 数组** → **展开**
5. 找到 `homepage.brandStats`（第 2 个）
6. 展开 → 找到 `items` 数组
7. 改第一项的 `value`：`"30+"` → `"50+"`
8. 右上角 **「Publish」**
9. **等 60 秒** → 浏览器**强刷**（Ctrl+Shift+R）看效果

---

## ⚠️ 重要注意

### ❌ 改了没看到效果
1. **没点 Publish**（只是 Save Draft）
2. **没等 60 秒**（CDN 缓存 + Next.js 缓存）
3. **浏览器缓存**（强刷 Ctrl+Shift+R）
4. **改的字段前端没接**（看上面每个 schema 的"不显示"列表）

### ❌ 看不到某个字段
- 大概率是**该字段前端没接**
- 改后**不报错**（只是没生效）

### ❌ 改 hero 背景图不生效
- 检查 `backgroundType` **必须** 选 `image`（不是 `color`）
- 检查 `backgroundImage` **上传完成**（不是选错图）

### ⚠️ 改完页面白屏
- 立刻**改回去** + Publish
- 如果是**字段类型错**（比如给数字字段填了文字），Sanity 不会警告，但前端会爆错
- 紧急联系开发者

---

## 📞 联系开发者改的事

以下内容**CMS 改不了**，需要开发者改代码：

| 想改 | 谁改 |
|---|---|
| 网站名字（BAIN BOILER）| 开发者 |
| 公司 Logo | 开发者 |
| 联系电话 / 邮箱 / 微信 | 开发者（+ Site Setting 同步）|
| 导航栏（5 个菜单）| 开发者 |
| Footer 链接 | 开发者 |
| 产品 / 案例 / 方案 / 新闻 **详情页** | 开发者（详情页都是硬编码文案）|
| 整体配色（主色 / 辅色）| 开发者 |
| 字体 | 开发者 |
| 多语言翻译（除 CMS 字段）| 开发者 |

---

## 📍 文件位置速查

**Studio（CMS 端）**：
- `apps/studio/schemas/documents/` — 8 个文档类型
- `apps/studio/schemas/objects/` — 共享字段 + 10 个首页模块

**Web 端（前端）**：
- `apps/web/sanity/queries.ts` — GROQ 查询
- `apps/web/src/lib/cms/get-homepage.ts` — 首页数据获取
- `apps/web/src/lib/cms/get-list-page.ts` — 列表数据获取
- `apps/web/src/lib/cms/sanity-block-renderer.tsx` — 10 个 module 路由
- `apps/web/src/lib/cms/homepage-fallback.ts` — 兜底数据（CMS 断线时用）
- `apps/web/src/modules/` — 10 个首页组件
