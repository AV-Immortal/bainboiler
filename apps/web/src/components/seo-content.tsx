/**
 * SEO 内容区（炉型总览 / 应用行业 / 为什么选我们）
 *
 * 设计目标：
 * - 在产品列表页 / 详情页底部追加语义化的 h2/h3 文本块，
 *   让搜索引擎抓取到"WNS 锅炉"、"工业蒸汽锅炉"、"EPC 锅炉项目"
 *   等长尾关键词的正文。
 * - 视觉上与现有工业风保持一致：白底黑字 + 极细分隔线，
 *   不引入玻璃拟态 / 鲜艳色。
 *
 * 数据完全由调用方传入，不在组件里写死文案。
 */

export type LabelValue = { label: string; value: string };

export type BoilerTypeSection = {
  title: string;
  subtitle?: string;
  items: LabelValue[];
};

export type IndustrySection = {
  title: string;
  subtitle?: string;
  items: string[];
};

export type WhySection = {
  title: string;
  subtitle?: string;
  items: LabelValue[];
};

export function BoilerTypeGrid({ section }: { section: BoilerTypeSection }) {
  return (
    <section
      aria-label={section.title}
      className="border-t border-slate-200 bg-slate-50 px-6 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
          {section.title}
        </h2>
        {section.subtitle ? (
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            {section.subtitle}
          </p>
        ) : null}
        <dl className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {section.items.map((it) => (
            <div
              key={it.label}
              className="border-l-2 border-sky-300 pl-5"
            >
              <dt className="text-base font-semibold text-slate-950">
                {it.label}
              </dt>
              <dd className="mt-2 text-sm leading-7 text-slate-600">
                {it.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function IndustryList({ section }: { section: IndustrySection }) {
  return (
    <section
      aria-label={section.title}
      className="border-t border-slate-200 bg-white px-6 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
          {section.title}
        </h2>
        {section.subtitle ? (
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            {section.subtitle}
          </p>
        ) : null}
        <ul className="mt-10 grid gap-x-8 gap-y-3 text-sm leading-7 text-slate-700 md:grid-cols-2">
          {section.items.map((it) => (
            <li key={it} className="flex items-start gap-2">
              <span
                aria-hidden
                className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
              />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhyChooseUsGrid({ section }: { section: WhySection }) {
  return (
    <section
      aria-label={section.title}
      className="border-t border-slate-200 bg-slate-50 px-6 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
          {section.title}
        </h2>
        {section.subtitle ? (
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            {section.subtitle}
          </p>
        ) : null}
        <dl className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {section.items.map((it) => (
            <div
              key={it.label}
              className="card-hover border border-slate-200 bg-white p-6"
            >
              <dt className="text-base font-semibold text-slate-950">
                {it.label}
              </dt>
              <dd className="mt-3 text-sm leading-7 text-slate-600">
                {it.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * SEO 长尾引言段落。放在 h1 下方，给搜索引擎一段包含密集关键词的正文。
 */
export function SeoIntro({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  if (!text) return null;
  return (
    <p
      className={`mt-8 max-w-3xl text-base leading-8 text-slate-700 ${className}`}
    >
      {text}
    </p>
  );
}
