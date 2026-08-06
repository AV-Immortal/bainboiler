# 贡献指南

> 本文档说明如何为 `bainboiler` 提交代码。请先阅读 [STYLE_GUIDE.md](./STYLE_GUIDE.md)。

## 快速开始

```bash
# 1. 拉代码
git clone https://github.com/AV-Immortal/bainboiler
cd bainboiler

# 2. 装依赖
pnpm install

# 3. 跑测试
pnpm --filter web test

# 4. 本地起 web
pnpm --filter web dev

# 5. 本地起 studio
pnpm --filter studio dev
```

## 提交流程

1. 从 `main` checkout 新分支：`git checkout -b feat/xxx`
2. 编码 → 跑测试 → 跑 typecheck：
   ```bash
   pnpm --filter web test
   pnpm --filter web typecheck
   ```
3. Commit message 遵循 [STYLE_GUIDE.md §8](./STYLE_GUIDE.md#8-提交规范)。
4. 推送到 fork / 提 PR。
5. PR 标题形如：`feat(web): 新增产品对比模块`。
6. 等待 CI（如已配置）/ 人工 review。

## 部署

- 项目通过 Docker Compose 部署在 2 核 4G 服务器上。
- **不要** 改 Dockerfile 顶层 `COPY . .` 的拆分顺序 —— 当前分层为最优缓存顺序。
- **不要** 在 Dockerfile 中执行耗时的 `RUN find ...` / `RUN du ...` —— 5 分钟硬上限会杀进程。
- 任何改 Dockerfile 的 PR 必须附：`time docker compose build web` 输出。

## Sanity 内容

- 生产项目 ID：`r68ydhu8`（公开），写在本仓库 .env 中。
- 修改 schema 后必须 `pnpm --filter studio build` 验证。
- 任何写 seed 脚本的操作必须先与项目 owner 确认（参见 `project_memory` 教训）。

## 文档维护

- 设计规范 → [STYLE_GUIDE.md](./STYLE_GUIDE.md)
- 素材库 → [ASSET-LIBRARY.md](./ASSET-LIBRARY.md)
- 部署 / 运维见根目录 `README.md` 与 `docker-compose.yml`。

## 反馈

- 提 issue：用 GitHub issue 跟踪。
- 紧急事故：直接联系项目 owner 沟通。
