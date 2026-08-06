# bainboiler 编码规范

> 适用版本：当前 `main` 分支（最近一次稳定 commit `ad177d8`）。
> 本规范是阶段 0 落地产物，不强制使用。后续 PR 流程中逐步收紧。

## 1. 总体原则

1. **可读性优先** —— 代码首先是写给人看的，其次才是给机器执行的。
2. **小步提交** —— 每个 commit 只做一件事，能独立 revert。
3. **测试先行 / 测试伴随** —— 任何动到 `lib/cms/`、`lib/i18n/`、`lib/validation/`、`lib/seo/` 的代码必须附带测试。
4. **不引入新的循环依赖 / 副作用** —— 严禁在 `lib/` 下放 `import "server-only"` 之外的运行时副作用。

## 2. TypeScript

- `tsconfig.json` 已开 `strict: true`，**不允许关闭**。
- 禁止 `any`；如确实无法避免，**必须**用注释说明理由，例如 `// eslint-disable-next-line @typescript-eslint/no-explicit-any -- sanity returns untyped JSON from GROQ`。
- 优先 `type` 而非 `interface`，除非需要 declaration merging。
- 函数返回值显式标注（除 `React.FC` 风格组件外）。

## 3. 命名

| 类型 | 规范 | 示例 |
|---|---|---|
| 组件 | PascalCase | `SiteHeader`, `InquiryForm` |
| 工具函数 | camelCase，动词开头 | `getHomepage`, `pickLocale` |
| 类型 / Interface | PascalCase | `SanityHeroVideo`, `AppLocale` |
| 常量 | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| 文件名 | kebab-case，组件用 PascalCase | `site-header.tsx`, `globals.css` |
| 目录 | 单数优先 | `cms/`, `i18n/`, `seo/` |

## 4. 目录组织

```
apps/web/src/
  app/             # Next.js 路由（page.tsx, layout.tsx）
  components/      # 可复用 React 组件
    layout/        # 全局 layout 类（header, footer）
    forms/         # 表单组件
  modules/         # 业务模块，一个模块一个 section（hero-video, company-intro…）
  lib/             # 纯函数 / 工具
    cms/           # Sanity 集成（fetcher + mapper + renderer）
    i18n/          # 多语言
    seo/           # metadata
    validation/    # zod schema
  types/           # 跨模块共享类型
  i18n/            # 路由 i18n 配置（root-relative）
```

**禁止**：
- `app/` 内的文件 `import` 自 `modules/`（路由只通过 `lib/cms/sanity-block-renderer.tsx` 间接调用）
- `lib/` 内出现 JSX（lib 必须保持纯函数）

## 5. 注释

- 文件顶部加 1–2 行说明模块用途，复杂 mapper 加 30+ 行内逻辑注释。
- 公开函数用 JSDoc 简单标注 `@param` / `@returns`，不强制。
- 解释 *why*，不要解释 *what*。

## 6. 重复代码

`lib/cms/get-homepage.ts` / `get-list-page.ts` / `get-product.ts` 三个 fetcher 结构相似（try/catch + console.warn + fallback），是已知重复点。**当前不做合并**，因为：
- 各自 fallback 数据结构不同（homepage 返回 modules，list 返回 sections…）
- 强制抽象会引入泛型，反而更难读

未来如果新增第 4 个 fetcher，才考虑抽象 `safeFetch<T>` 包装函数。

## 7. 已知技术债 / 不动区

下列项**不在本次重构范围**，记录于此供未来 PR 参考：

- `app/[locale]/layout.tsx` 中 `<main className="pt-16">` 硬编码 padding，是为 header 高度 hack；后续应改为 `var(--header-height)`。
- `apps/web/public/` 缺失时 Dockerfile 兜底为 noop（`ad177d8` 行为），未来若加 favicon 需同步更新 `Dockerfile.web`。
- `next.config.mjs` 使用 `output: "standalone"`，多阶段构建依赖此配置；不可关闭。
- 2 核 4G 服务器的 5 分钟构建上限要求所有 `next build` 必须命中缓存层，**禁止** 在 Dockerfile 中加入会破坏层缓存的命令（如 `RUN find / -delete`）。

## 8. 提交规范

- 一个 commit 一件事（feat / fix / docs / refactor / chore）。
- Commit message 形如：
  ```
  type(scope): 一句话说明

  - 详细 1
  - 详细 2
  ```
- 每次 commit 前跑 `pnpm --filter web test` 与 `pnpm --filter web typecheck`。

## 9. 禁止引入

- `any` 类型
- `console.log`（仅允许 `console.warn` / `console.error` 且必须带上下文前缀，如 `[getHomepage]`）
- `dangerouslySetInnerHTML`（如确需，必须 sanitize + comment）
- 客户端直接 import Sanity client（必须经 `lib/cms/` 代理）

## 10. 测试

- `lib/` 下任何文件必须有对应 `__tests__/*.test.ts(x)`。
- 组件层测试是 nice-to-have，**不强制**。
- 跑测试命令：
  ```bash
  pnpm --filter web test
  ```
