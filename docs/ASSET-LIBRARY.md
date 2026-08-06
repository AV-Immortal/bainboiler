# 素材库指南

本目录是 `bainboiler` 项目的前端素材参考库，收录了 4 个常用网站供开发时复制/借鉴素材与调用方式。

> **使用原则**：所有外部素材仅作为设计参考和代码实现启发，**不得直接商用** 受版权保护的资产；下载使用前需确认各网站的具体许可协议。

---

## 目录

1. [Motion Sites](#1-motion-sites)
2. [Motion (motion.dev)](#2-motion-motiondev)
3. [Uiverse](#3-uiverse)
4. [Anime.js](#4-animejs)
5. [Aceternity UI](#5-aceternity-ui)
6. [调用工作流](#6-调用工作流)

---

## 1. Motion Sites

- **网址**：[https://motionsites.ai](https://motionsites.ai)
- **类型**：动效 / 3D 特效 AI 提示词素材库
- **核心用途**：拿到想要的视觉特效 → 复制 AI 提示词 → 喂给 Claude / Codex 等代码生成器 → 得到 React/Vue/原生 JS 实现

### 收录的素材类别

| 类别 | 典型特效 |
|------|---------|
| 粒子 | 粒子流动 / 粒子爆炸 / 粒子汇聚 |
| 3D 场景 | 3D 文字、3D 物体、3D 背景 |
| 流体 | 液态效果、波浪动画 |
| 光效 | 光晕、光线、霓虹 |
| 交互 | 悬停、滚动动画 |

### 调用方式

```
1. 在 motionsites.ai 找到喜欢的特效
2. 复制对应的 AI 提示词
3. 喂给 Claude Code，附加："用 React + Tailwind 实现，做成可复用组件"
4. 调整颜色 / 速度 / 框架后集成到 apps/web/src/modules/
```

---

## 2. Motion (motion.dev)

- **网址**：[https://motion.dev](https://motion.dev)
- **类型**：生产级 JavaScript / React / Vue 动画库（MIT 协议，免费）
- **当前版本**：v12.42.1
- **核心用途**：替代 GSAP 的现代动画方案，bundle 体积小 90%，硬件加速

### 主要 API

| 能力 | 用法示例 |
|------|---------|
| 独立 transform | `animate(el, { x: 100, y: 50, rotate: 15, scale: 1.2 })` |
| 滚动动画 | `useScroll()` + `scroll-linked` |
| 手势 | `whileHover`, `whileTap`, `drag` |
| Layout 动画 | `<motion.div layout />` |
| 物理弹簧 | `transition: { type: 'spring' }` |
| 退出动画 | `<AnimatePresence>{...}</AnimatePresence>` |
| 时间线 | `stagger(0.04)` 编排复杂动效 |
| 数字动画 | `<AnimateNumber value={42} />` |
| 拖拽排序 | `<Reorder.Group>` + `<Reorder.Item>` |
| 无限滚动 | `<Ticker>` 跑马灯 |
| 路径动画 | `<ScrambleText>` + SVG line draw |
| 视图切换 | `<AnimateView>` 页面过渡 |

### 安装

```bash
pnpm add motion
```

### 官方资源

- 文档索引：[motion.dev/llms.txt](https://motion.dev/llms.txt)
- 400+ 案例：[motion.dev/examples](https://motion.dev/examples)
- AI Kit：[motion.dev/docs/ai-kit](https://motion.dev/docs/ai-kit) — 让 AI 代理成为 Motion 专家
- 预制 section：[motion.dev/ui](https://motion.dev/ui)

### 推荐使用场景

- Hero 视频入场动画
- 滚动触发的元素进入
- 卡片 hover 微交互
- 模态框 / 抽屉 进出
- 数字滚动计数
- 拖拽重排列表
- 页面切换过渡

---

## 3. Uiverse

- **网址**：[https://uiverse.io](https://uiverse.io)
- **类型**：开源 UI 元素社区库（7,359+ 元素）
- **核心用途**：直接复制按钮、卡片、loader、开关、表单、checkbox 等微组件

### 资产规模

- **7,359+** 社区贡献 UI 元素
- **336,953+** 贡献者
- **100% 免费** 商用许可

### 标签分类

`button` · `card` · `loader` · `rounded` · `dark` · `minimal` · `blue` · `white` · `black` · `animated` · `switch` · `form` · `modern` · `gradient`

### 输出格式

每个元素可复制为：

- 纯 HTML + CSS
- Tailwind 类
- React 组件
- Figma

### 调用方式

```
1. uiverse.io 搜索 "loading" 或 "button" 等
2. 点击元素 → "Show code" 标签
3. 复制 HTML/CSS 或 Tailwind → 粘到 apps/web/src/components/
```

### GitHub 源码

- [github.com/uiverse-io/galaxy](https://github.com/uiverse-io/galaxy)

---

## 4. Anime.js

- **网址**：[https://animejs.com](https://animejs.com)
- **类型**：JavaScript 动画引擎
- **核心用途**：单 API 动画一切 DOM / SVG / JS 对象

### 主要模块

| 模块 | 用途 |
|------|------|
| `timer` | 时间控制 |
| `easings` | 缓动函数 |
| `draggable` | 拖拽 |
| `scroll` | 滚动触发 |
| `scope` | 作用域选择器 |
| `waapi` | Web Animations API 桥接 |
| `timeline` | 时间线编排 |
| `stagger` | 错位动画 |
| `svg` | SVG 路径动画 |
| `spring` | 物理弹簧 |
| `animation` | 核心引擎 |

### 核心 API

- 灵活的 keyframe 系统
- 独立 CSS transform 组合
- Scroll Observer 滚动同步
- Stagger 错位动画
- 函数式 value（动态值）

### 安装

```bash
pnpm add animejs
```

### 与 Motion 的取舍

| 场景 | 推荐 |
|------|------|
| React 项目、组件级 | Motion (Framer) |
| 复杂时间线编排、SVG path morphing | Anime.js |
| 轻量纯 JS | 任选 |

---

## 5. Aceternity UI

- **网址**：[https://ui.aceternity.com](https://ui.aceternity.com)
- **类型**：Tailwind + Framer Motion 高级组件库（200+ 组件/块/模板）
- **核心用途**：开箱即用的 hero、shader、背景特效、卡片、轮播

### 收录的 Block 类别

- **Hero Sections**（21+ blocks）
- **Shaders**（3+ blocks）— 可复用着色器背景
- **Features**（特性展示）
- **Testimonials**（证言）
- **Pricing**（价格表）
- **Backgrounds**（动态背景）
- **Cards**（交互卡片）
- **3D Effects**（3D 效果）

### 技术栈

- Next.js / React
- Tailwind CSS
- Framer Motion
- shadcn/ui 风格

### 调用方式

```
1. ui.aceternity.com/components 浏览
2. 选中组件 → 复制源代码（整段 .tsx + .css）
3. 粘到 apps/web/src/modules/<新模块>/index.tsx
4. 调整 brand 颜色 (#008060) 和文案
5. 在 sanity-block-renderer.tsx 注册新 _type
```

### 用户规模

120,000+ 创始人和开发者使用。

---

## 6. 调用工作流

### 标准素材引入流程

```
选择素材
   ↓
  [是否要交互 / 动效?]
   ├─ 是 → Motion (motion.dev) 或 Anime.js
   └─ 否 → Uiverse (静态组件) 或 Aceternity (组合模块)
   ↓
复制源代码（HTML/Tailwind/React）
   ↓
粘到 apps/web/src/{components,modules}/<name>/
   ↓
[若数据驱动] 在 Sanity Studio 中创建对应 schema
   ↓
在 sanity-block-renderer.tsx 注册新 _type
   ↓
[若动效] yarn add motion 或 yarn add animejs
   ↓
验证：yarn build && docker compose up -d --build web
```

### 提示词模板

在向 AI 复制素材时使用：

```
参考素材来源：[motionsites.ai / Aceternity Hero 12 / Uiverse button-99]
目标技术栈：Next.js 15 + Tailwind v4 + TypeScript
集成位置：apps/web/src/modules/<模块名>/index.tsx
品牌色：#008060 (Shopify 翡翠绿)
字体：Inter
约束：响应式、a11y、bundle < 50kb、保留 hover 微交互
```

---

## 7. 注意事项

1. **版权**：商用前查看各素材站的具体许可。
2. **性能**：粒子 / shader 类特效在移动端需做降级（`prefers-reduced-motion`）。
3. **可访问性**：所有动效必须支持 `prefers-reduced-motion`。
4. **一致性**：复制进来的素材必须改用本项目的设计令牌（`accent` / `dark` / `rounded-card` / `Inter`），不能保留原始颜色。
5. **版本管理**：如使用 `motion` / `animejs`，在 `apps/web/package.json` 锁定版本。
