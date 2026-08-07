/**
 * 可见面包屑 + JSON-LD BreadcrumbList 结构化数据
 *
 * - 可见部分：工业风格的简洁链式面包屑，每级之间用箭头 / 斜线分隔。
 * - 不可见部分：同时输出 schema.org BreadcrumbList，让搜索引擎和
 *   富媒体结果（搜索结果下方的小链）能正确识别页面层级。
 *
 * 用法：
 *   <Breadcrumb
 *     items={[
 *       { name: "首页", href: "/zh" },
 *       { name: "产品中心", href: "/zh/products" },
 *       { name: "WNS 锅炉", href: "/zh/products/wns-boiler" },
 *     ]}
 *   />
 */
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd, type Crumb } from "@/lib/seo/json-ld";

export type BreadcrumbItem = Crumb;

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.href}-${i}`} className="flex items-center gap-1.5">
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-medium text-slate-700"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition hover:text-sky-600"
                >
                  {item.name}
                </Link>
              )}
              {!isLast ? (
                <span aria-hidden className="text-slate-400">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </nav>
  );
}
