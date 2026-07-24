#!/bin/bash
# 遇到错误立即退出
set -e

echo "🚀 ========================================="
echo "🚀 开始部署 Bain Boiler 项目..."
echo "🚀 ========================================="

echo "📦 1. 拉取最新代码..."
git fetch --all
git reset --hard origin/main # 强制同步为远端 main 分支最新代码
git pull origin main

echo "🔧 2. 安装项目依赖 (Clean Install)..."
npm ci

echo "🏗️ 3. 编译前端应用 (Next.js)..."
npm run build:web

echo "🔄 4. 重启 PM2 守护进程 (平滑重启)..."
# 使用 reload 可以实现 0 宕机时间平滑重启
pm2 reload ecosystem.config.js --env production --update-env

echo "✅ ========================================="
echo "✅ 部署完成！网站已更新。"
echo "✅ ========================================="
