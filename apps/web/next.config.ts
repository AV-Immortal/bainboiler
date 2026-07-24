import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // standalone 输出：只把运行时需要的文件打到镜像里（约 100MB 而非 1GB+）
  // 需要外部传入 .next/static 和 public 进镜像，详见根目录 Dockerfile.web
  output: "standalone",
  turbopack: {
    root: path.join(__dirname, "..", ".."),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
