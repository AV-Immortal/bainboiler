import { createClient, type SanityClient } from "@sanity/client";
import { getSanityEnv } from "./env";

let cachedClient: SanityClient | null = null;

/**
 * 拿到只读 Sanity client。所有 server 端 fetch 都通过它。
 * 启用 CDN（useCdn: true）→ Sanity 在边缘缓存 60s 读，与 Next.js ISR 60s 一起
 * 达到 "管理员发布后最迟 60s 生效"。
 */
export function getSanityClient(): SanityClient {
  if (cachedClient) return cachedClient;

  const env = getSanityEnv();
  cachedClient = createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    useCdn: true,
    perspective: "published",
    token: env.readToken,
  });
  return cachedClient;
}

/**
 * 在没有 NEXT_PUBLIC_SANITY_PROJECT_ID 的情况下返回 null，让上层走 fallback。
 * 用于 build 阶段无法访问 env 的场景。
 */
export function tryGetSanityClient(): SanityClient | null {
  const env = getSanityEnv();
  if (!env.projectId) return null;
  return getSanityClient();
}
