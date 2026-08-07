/**
 * 可见 FAQ + FAQPage JSON-LD。
 *
 * 把传入的问答对同时渲染成可见的 <details> 折叠列表，
 * 以及一个 schema.org FAQPage 结构化数据节点。
 * 搜索结果可直接展示问答富媒体卡片。
 */
import { JsonLd, faqJsonLd, type FaqItem } from "@/lib/seo/json-ld";

export function FaqSection({
  title,
  items,
}: {
  title: string;
  items: FaqItem[];
}) {
  const ld = faqJsonLd(items);

  return (
    <section
      aria-label={title}
      className="border-t border-slate-200 bg-white px-6 py-16 md:py-20"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
          {title}
        </h2>
        <div className="mt-8 divide-y divide-slate-200 border-t border-slate-200">
          {items.map((it, i) => (
            <details
              key={`${it.question}-${i}`}
              className="group py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-4 text-left text-base font-semibold text-slate-950">
                <span>{it.question}</span>
                <span
                  aria-hidden
                  className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center text-slate-400 transition group-open:rotate-45"
                >
                  {/* + icon */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <path d="M7 1.5v11M1.5 7h11" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {it.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
      {ld ? <JsonLd data={ld} /> : null}
    </section>
  );
}
