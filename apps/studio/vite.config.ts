import { defineConfig } from "vite";

// Sanity Studio 的 vite preview 配置
// 允许从公网域名访问（默认 vite 5+ 严格校验 host）
//
// 预压缩：见 scripts/precompress.mjs（在 Dockerfile 里跑）
export default defineConfig({
  preview: {
    allowedHosts: true,
  },
  server: {
    allowedHosts: true,
  },
});
