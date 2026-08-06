import { defineConfig } from "vite";

// Sanity Studio 的 vite preview 配置
// 允许从公网域名访问（默认 vite 5+ 严格校验 host）
export default defineConfig({
  preview: {
    allowedHosts: true, // 允许所有 host（生产环境由 nginx 限制来源）
  },
  server: {
    allowedHosts: true,
  },
});
