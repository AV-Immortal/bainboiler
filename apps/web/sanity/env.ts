/**
 * 集中读取 Sanity 相关的环境变量。
 *
 * - projectId / dataset / apiVersion：构建时注入，前端可见（NEXT_PUBLIC_*）
 * - readToken：仅服务端用，用于读草稿或绕过 CDN；绝不放进 NEXT_PUBLIC_*
 *
 * 通过 `getSanityEnv()` 懒加载——允许 projectId 缺失时不立即报错，
 * 让 getHomepage / getListPage 等上层函数走 fallback 路径。
 */
export type SanityEnv = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  readToken: string | undefined;
};

export function getSanityEnv(): SanityEnv {
  return {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
    readToken: process.env.SANITY_API_READ_TOKEN || undefined,
  };
}
