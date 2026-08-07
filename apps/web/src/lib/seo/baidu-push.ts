/**
 * 百度普通收录 / 快速收录 API 推送工具
 * 文档：https://ziyuan.baidu.com/linksubmit/index
 *
 * 用法（服务端调用）：
 *   await pingBaidu([
 *     "https://www.bainboiler.com/zh/products/wns-boiler",
 *     "https://www.bainboiler.com/en/products/wns-boiler",
 *   ]);
 *
 * 工作流程：
 *  1. 登录「百度搜索资源平台」→ 站点管理 → 链接提交
 *  2. 选「API提交」标签页，会看到推送接口地址形如：
 *     普通收录: http://data.zz.baidu.com/urls?site=xxx&token=xxx
 *     快速收录: http://data.zz.baidu.com/urls?site=xxx&token=xxx （需要申请）
 *  3. 把 token 放到 .env.local（不入 git）：
 *     BAIDU_PUSH_TOKEN=lUoKWfVxbHCKVUcH
 *  4. 调用本函数即可
 *
 * 注意：
 *  - 普通收录 API 有每日配额限制（10-几千条/天，按账号等级）
 *  - 超额会返回 {"error":400,"message":"over quota"}，调用方自己处理重试
 *  - 单次请求 body 上限 ~2000 条 URL，更大需要分批
 */

const BAIDU_PUSH_ENDPOINT = "http://data.zz.baidu.com/urls";
const SITE = "https://www.bainboiler.com";
// 单次最多 2000 条（百度官方建议单次 < 1000 比较稳）
const MAX_URLS_PER_REQUEST = 1000;

type BaiduPushResponse = {
  ok: boolean;
  status: number;
  success: number;
  remain: number;
  notSameSite: string[];
  raw: string;
};

/**
 * 提交 URL 列表给百度。
 *  - urls 必须是绝对 URL，且 host 与 BAIDU_PUSH_TOKEN 绑定的站点一致
 *  - 函数不抛异常：失败时返回 ok:false，调用方自己决定是否重试
 *  - 单次请求限制 1000 条 URL，超出会自动分批
 */
export async function pingBaidu(urls: string[]): Promise<BaiduPushResponse> {
  const token = process.env.BAIDU_PUSH_TOKEN;
  if (!token) {
    return {
      ok: false,
      status: 0,
      success: 0,
      remain: 0,
      notSameSite: [],
      raw: "BAIDU_PUSH_TOKEN not set in env (.env.local)",
    };
  }

  const cleaned = Array.from(
    new Set(
      urls
        .map((u) => u.trim())
        .filter((u) => u.startsWith("https://") || u.startsWith("http://")),
    ),
  );

  if (cleaned.length === 0) {
    return {
      ok: false,
      status: 0,
      success: 0,
      remain: 0,
      notSameSite: [],
      raw: "no valid urls",
    };
  }

  const url = `${BAIDU_PUSH_ENDPOINT}?site=${encodeURIComponent(SITE)}&token=${encodeURIComponent(token)}`;

  // 分批
  const batches: string[][] = [];
  for (let i = 0; i < cleaned.length; i += MAX_URLS_PER_REQUEST) {
    batches.push(cleaned.slice(i, i + MAX_URLS_PER_REQUEST));
  }

  let totalSuccess = 0;
  let lastRemain = 0;
  let lastStatus = 0;
  let lastRaw = "";
  const allNotSameSite: string[] = [];

  for (const batch of batches) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: batch.join("\n"),
        cache: "no-store",
      });
      lastStatus = res.status;
      const text = await res.text();
      lastRaw = text;

      // 百度返回 JSON：{"success":N,"remain":M,"not_same_site":[...]}
      // 或错误：{"error":code,"message":"..."}
      try {
        const parsed = JSON.parse(text) as {
          success?: number;
          remain?: number;
          not_same_site?: string[];
          error?: number;
          message?: string;
        };
        if (typeof parsed.success === "number") totalSuccess += parsed.success;
        if (typeof parsed.remain === "number") lastRemain = parsed.remain;
        if (Array.isArray(parsed.not_same_site)) {
          allNotSameSite.push(...parsed.not_same_site);
        }
        // 配额超限或错误
        if (parsed.error) {
          return {
            ok: false,
            status: lastStatus,
            success: totalSuccess,
            remain: lastRemain,
            notSameSite: allNotSameSite,
            raw: text,
          };
        }
      } catch {
        // 解析失败，继续
      }
    } catch (err) {
      return {
        ok: false,
        status: lastStatus,
        success: totalSuccess,
        remain: lastRemain,
        notSameSite: allNotSameSite,
        raw: err instanceof Error ? err.message : String(err),
      };
    }
  }

  return {
    ok: lastStatus === 200,
    status: lastStatus,
    success: totalSuccess,
    remain: lastRemain,
    notSameSite: allNotSameSite,
    raw: lastRaw,
  };
}
