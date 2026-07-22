type LatestNewsProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{
    title: string;
    description: string;
    href?: string | null;
    meta?: string | null;
  }>;
  locale: "zh" | "en";
};

export function LatestNews(props: LatestNewsProps) {
  const defaultHref = `/${props.locale}/news`;
  const actionLabel = props.locale === "zh" ? "阅读更多" : "Read More";

  return (
    <section className="bg-white px-6 py-24 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.34em] text-sky-700">
              {props.eyebrow}
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
              {props.title}
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            {props.description}
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {props.items.map((item) => (
            <a
              key={item.title}
              href={item.href ?? defaultHref}
              className="block border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-sky-700">
                {item.meta ?? "News"}
              </p>
              <h3 className="mt-5 text-2xl font-semibold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {item.description}
              </p>
              <p className="mt-8 text-sm font-semibold tracking-[0.12em] text-slate-950">
                {actionLabel}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
