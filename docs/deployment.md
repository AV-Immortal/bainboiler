# Deployment

## 概览

项目包含两个独立应用：

- `apps/web`: 对外官网，建议部署在 `www.bainboiler.com`
- `apps/cms`: 内容后台，建议部署在 `cms.bainboiler.com`

两者都应启用 HTTPS，并让 `apps/web` 通过 `CMS_BASE_URL` 访问 CMS。

## Web 部署

### 必需环境变量

- `CMS_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`

### 构建与启动

- 安装依赖：`npm install`
- 构建：`npm run build:web`
- 启动：`npm run start --workspace web`

## CMS 部署

### 构建与启动

- 安装依赖：`npm install`
- 构建：`npm run build:cms`
- 启动：`npm run start --workspace cms`

### 运行建议

- 将后台部署到受限子域，例如 `cms.bainboiler.com`
- 为管理后台设置强密码与 HTTPS
- 仅向可信来源开放后台入口

## 上线检查

- 确认 `NEXT_PUBLIC_SITE_URL` 指向生产域名
- 确认 `CMS_BASE_URL` 指向可访问的 CMS 域名
- 确认首页和核心栏目页可正常返回 200
- 确认中英文路径都输出正确 canonical 与 alternate metadata
