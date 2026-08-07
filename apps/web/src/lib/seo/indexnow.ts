/**
 * IndexNow 即时收录推送工具
 * 文档：https://www.bing.com/indexnow
 *
 * 用法（服务端调用，例如在 Sanity webhook / 发布新文章时触发）：
 *   await pingIndexNow([
 *     "https://www.bainboiler.com/zh/products/wns-boiler",
 *     "https://www.bainboiler.com/en/products/wns-boiler",
 *   ]);
 *
 * 也可以用 Bing Webmaster Tools 后台 → IndexNow → Submit URLs 手动提交。
 *
 * 工作流程：
 *  1. 首次使用时，在 Bing IndexNow 后台生成一个 32 位 hex key
 *  2. 把 key 作为文件名 / 文件内容托管到站点根：
 *     public/{key}.txt  →  内容就是 key 本身（一行）
 *     用于 Bing 验证这个站点确实属于 key 持有者
 *  3. 调用本函数时把 key + URL 列表 POST 给 api.indexnow.org
 *  4. Bing 几分钟内来抓新页面
 */

const INDEXNOW_KEY = "1759e2091f7a4d06ac98b15090231785";
const SITE_HOST = "www.bainboiler.com";
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`;
// 单次最多 10,000 个 URL，我们站点用不到那么多
const MAX_URLS_PER_REQUEST = 10000;

type IndexNowResponse = {
  ok: boolean;
  status: number;
  body?: string;
  submittedCount: number;
};

/**
 * 提交 URL 列表给 IndexNow。
 *  - urls 必须是绝对 URL，且 host 与 INDEXNOW_KEY 绑定的站点一致
 *  - 函数不抛异常：失败时返回 ok:false，调用方自己决定是否重试
 *  - 单次请求限制 10,000 个 URL，超出会自动分批
 */
export async function pingIndexNow(urls: string[]): Promise<IndexNowResponse> {
  const cleaned = Array.from(
    new Set(
      urls
        .map((u) => u.trim())
        .filter((u) => u.startsWith(`https://${SITE_HOST}`) || u.startsWith(`http://${SITE_HOST}`)),
    ),
  );

  if (cleaned.length === 0) {
    return { ok: false, status: 0, submittedCount: 0, body: "no valid urls" };
  }

  // 分批（保险起见，远低于官方上限）
  const batches: string[][] = [];
  for (let i = 0; i < cleaned.length; i += MAX_URLS_PER_REQUEST) {
    batches.push(cleaned.slice(i, i + MAX_URLS_PER_REQUEST));
  }

  let lastStatus = 0;
  let lastBody: string | undefined;
  let totalSubmitted = 0;

  for (const batch of batches) {
    try {
      const res = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host: SITE_HOST,
          key: INDEXNOW_KEY,
          keyLocation: KEY_LOCATION,
          urlList: batch,
        }),
        // 不缓存
        cache: "no-store",
      });
      lastStatus = res.status;
      lastBody = await res.text().catch(() => undefined);
      totalSubmitted += batch.length;
      if (!res.ok) {
        return { ok: false, status: lastStatus, body: lastBody, submittedCount: totalSubmitted };
      }
    } catch (err) {
      return {
        ok: false,
        status: lastStatus,
        body: err instanceof Error ? err.message : String(err),
        submittedCount: totalSubmitted,
      };
    }
  }

  return { ok: true, status: lastStatus, body: lastBody, submittedCount: totalSubmitted };
}

/**
 * 把 sitemap 里所有 URL 一次性推给 IndexNow。
 * 通常在以下时机调用：
 *  - 站点首次部署后
 *  - 大批内容更新后
 *  - Sanity webhook 收到 publish 事件时
 */
export async function pingIndexNowAllSitemapUrls(urls: string[]): Promise<IndexNowResponse> {
  return pingIndexNow(urls);
}
